import { describe, expect, it, vi } from "vitest";
import { executeApiRequest } from "@/services/api/execute-api-request";
import wrapper from "@/services/api/wrapper-fetch-json-response";

describe("API request contract", () => {
  it("sends the language, JSON and the existing raw refresh header", async () => {
    const transport = vi.fn().mockResolvedValue(new Response("{}"));
    await executeApiRequest(
      "/me",
      undefined,
      {
        token: "access",
        refreshToken: "refresh",
        tokenExpires: Date.now() + 60000,
      },
      "es",
      "/refresh",
      transport
    );
    const headers = transport.mock.calls[0][1].headers as Headers;
    expect(headers.get("Authorization")).toBe("refresh");
    expect(headers.get("x-custom-lang")).toBe("es");
    expect(headers.get("Content-Type")).toBe("application/json");
  });
  it("leaves multipart boundaries to the browser", async () => {
    const transport = vi.fn().mockResolvedValue(new Response("{}"));
    await executeApiRequest(
      "/upload",
      { body: new FormData(), method: "POST" },
      undefined,
      "es",
      "/refresh",
      transport
    );
    expect(transport.mock.calls[0][1].headers.has("Content-Type")).toBe(false);
  });
  it.each([1, "2000-01-01T00:00:00.000Z"])(
    "renews expired tokens (%s) through the API's JSON body",
    async (tokenExpires) => {
      const renewed = {
        token: "new-access",
        refreshToken: "new-refresh",
        tokenExpires: "2099-01-01T00:00:00.000Z",
      };
      const transport = vi
        .fn()
        .mockResolvedValueOnce(new Response(JSON.stringify(renewed)))
        .mockResolvedValueOnce(new Response("{}"));
      const setTokensInfo = vi.fn();
      await executeApiRequest(
        "/me",
        { headers: { Authorization: "old-refresh" } },
        {
          token: "old",
          refreshToken: "old-refresh",
          tokenExpires,
          setTokensInfo,
        },
        "es",
        "/refresh-tokens",
        transport
      );
      expect(transport.mock.calls[0][0]).toBe("/refresh-tokens");
      expect(JSON.parse(transport.mock.calls[0][1].body)).toEqual({
        refreshToken: "old-refresh",
      });
      expect(setTokensInfo).toHaveBeenCalledWith(renewed);
      expect(transport.mock.calls[1][1].headers.get("Authorization")).toBe(
        "new-refresh"
      );
    }
  );
  it("clears the session and does not retry a protected call after rejected renewal", async () => {
    const transport = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 401 }));
    const setTokensInfo = vi.fn();
    await expect(
      executeApiRequest(
        "/me",
        undefined,
        { token: "old", refreshToken: "old", tokenExpires: 1, setTokensInfo },
        "es",
        "/refresh",
        transport
      )
    ).rejects.toThrow("Refresh token expired");
    expect(setTokensInfo).toHaveBeenCalledWith(null);
    expect(transport).toHaveBeenCalledTimes(1);
  });
  it.each([204, 500, 503])(
    "does not parse missing JSON for status %s",
    async (status) => {
      expect(await wrapper(new Response(null, { status }))).toEqual({
        status,
        data: undefined,
      });
    }
  );
  it("retains validation error JSON", async () => {
    expect(
      await wrapper(new Response('{"message":"invalid"}', { status: 400 }))
    ).toEqual({ status: 400, data: { message: "invalid" } });
  });
});
