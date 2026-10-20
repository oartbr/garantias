import { test, expect } from '@playwright/test';

test('real API login, protected admin access and profile persistence', async ({ page }) => {
  await page.route('**/*', route => {
    const host = new URL(route.request().url()).hostname;
    return ['127.0.0.1', 'localhost'].includes(host) ? route.continue() : route.abort();
  });
  await page.goto('/es/sign-in');
  await page.getByTestId('email').locator('input').fill('browser@example.test');
  await page.getByTestId('password').locator('input').fill('password1');
  const response = page.waitForResponse(r => r.url().endsWith('/v1/auth/login'));
  await page.locator('button[type="submit"]').click();
  expect((await response).status()).toBe(200);
  await expect.poll(async () => (await page.context().cookies()).some(c => c.name === 'auth-token-data')).toBe(true);
  const users = page.waitForResponse(r => r.url().includes('/v1/users?'));
  await page.goto('/es/admin-panel/users');
  expect((await users).status()).toBe(200);
  await page.goto('/es/profile/edit');
  await page.getByTestId('first-name').locator('input').fill('Persisted');
  const updated = page.waitForResponse(r => r.url().endsWith('/v1/auth/me') && r.request().method() === 'PATCH');
  await page.getByTestId('save-profile').click();
  expect((await updated).status()).toBe(200);
  await page.goto('/es/profile/edit');
  await expect(page.getByTestId('first-name').locator('input')).toHaveValue('Persisted');
});
