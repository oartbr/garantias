import { test, expect, type Page } from "@playwright/test";

const user = {
  id: "507f1f77bcf86cd799439011",
  firstName: "Maria",
  lastName: "Silva",
  email: "maria@example.com",
  phoneNumber: "5511999999999",
  role: { id: 1, name: "ADMIN" },
};
const tokens = {
  token: "test-access",
  refreshToken: "test-refresh",
  tokenExpires: Date.now() + 3600000,
};

async function mockApi(page: Page, authenticated = false) {
  // Block every external HTTP request. API responses are deterministic, no live credentials.
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.host === "127.0.0.1:3100") return route.continue();
    if (url.host !== "127.0.0.1:4010") return route.abort();
    const path = url.pathname;
    let body: unknown = {};
    if (path === "/v1/auth/login") body = { ...tokens, user };
    else if (path === "/v1/auth/me") body = user;
    else if (path.startsWith("/v1/users/") && !path.endsWith("/getAll"))
      body = user;
    else if (path.includes("/getList")) body = { garantias: [] };
    else if (path.includes("/getPdfs")) body = [];
    else if (
      path.includes("/garantia/") &&
      !path.includes("/getAll") &&
      !path.includes("/getAvailable")
    )
      body = {
        garantia: {
          garantiaId: "TEST123",
          status: "created",
          brand: "WSE",
          description: "Tank",
          sku: "SKU-1",
        },
      };
    else if (path.startsWith("/v1/sku/"))
      body = {
        sku: {
          id: user.id,
          skuId: "SKU-1",
          description: "Tank",
          category: "Tank",
          brand: "WSE",
        },
      };
    else
      body = {
        results: [],
        page: 1,
        limit: 10,
        totalPages: 0,
        totalResults: 0,
        hasNextPage: false,
      };
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  });
  if (authenticated)
    await page.context().addCookies([
      {
        name: "auth-token-data",
        value: JSON.stringify(tokens),
        domain: "127.0.0.1",
        path: "/",
      },
    ]);
}

test("redirects the language while preserving the query string", async ({
  page,
}) => {
  await mockApi(page);
  await page.goto("/sign-in?returnTo=%2Fes%2Fprofile");
  await expect(page).toHaveURL(/\/es\/sign-in\?returnTo=/);
  await expect(page.getByTestId("email").locator("input")).toBeVisible();
});

test("signs in with the API contract and persists the session", async ({
  page,
}) => {
  await mockApi(page);
  await page.goto("/es/sign-in");
  await page.getByTestId("email").locator("input").fill(user.email);
  await page.getByTestId("password").locator("input").fill("password1");
  const login = page.waitForRequest((r) => r.url().endsWith("/v1/auth/login"));
  await page.locator('button[type="submit"]').click();
  expect((await login).postDataJSON()).toEqual({
    email: user.email,
    password: "password1",
  });
  await expect
    .poll(
      async () =>
        (await page.context().cookies()).find(
          (c) => c.name === "auth-token-data"
        )?.value
    )
    .toContain("test-refresh");
});

test("profile edit sends the edited names", async ({ page }) => {
  await mockApi(page, true);
  await page.goto("/es/profile/edit");
  await page.getByTestId("first-name").locator("input").fill("Ana");
  const update = page.waitForRequest(
    (r) => r.url().endsWith("/v1/auth/me") && r.method() === "PATCH"
  );
  await page.getByTestId("save-profile").click();
  expect((await update).postDataJSON()).toMatchObject({ firstName: "Ana" });
});

for (const path of [
  "sign-in",
  "sign-up",
  "forgot-password",
  "privacy-policy",
  "check-phone-number",
  "confirm-code",
  "scan",
]) {
  test(`renders public page ${path} without runtime exceptions`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await mockApi(page);
    const response = await page.goto("/es/" + path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).not.toContainText("Application error");
    await expect(page.locator("body")).not.toBeEmpty();
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

for (const path of [
  "profile",
  "admin-panel",
  "admin-panel/users",
  "admin-panel/users/create",
  "admin-panel/users/edit/" + user.id,
  "admin-panel/skus",
  "admin-panel/skus/create",
  "admin-panel/skus/edit/" + user.id,
  "admin-panel/garantias",
  "admin-panel/garantias/create",
  "admin-panel/garantias/print",
  "admin-panel/garantias/assign/TEST123",
  "admin-panel/garantias/check/TEST123",
  "admin-panel/garantias/edit/TEST123",
]) {
  test(`renders authenticated page ${path} without runtime exceptions`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await mockApi(page, true);
    const response = await page.goto("/es/" + path);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(new RegExp("/es/" + path));
    await expect(page.locator("body")).not.toContainText("Application error");
    expect(errors).toEqual([]);
  });
}

test("serves the production PWA manifest and worker", async ({ request }) => {
  const manifest = await request.get("/manifest.json");
  expect(manifest.ok()).toBe(true);
  expect((await manifest.json()).icons.length).toBeGreaterThan(0);
  const worker = await request.get("/sw.js");
  expect(worker.ok()).toBe(true);
  expect(await worker.text()).toContain("workbox");
});
