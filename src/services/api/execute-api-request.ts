import type { Tokens } from "./types/tokens";

type RequestTokens = Tokens & {
  setTokensInfo?: (value: Tokens | null) => void;
};

/** Keeps the API's raw refresh-token header contract, including after renewal. */
export async function executeApiRequest(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  tokens: RequestTokens | undefined,
  language: string,
  refreshUrl: string,
  transport: typeof fetch = fetch
) {
  const headers = new Headers(init?.headers);
  if (!headers.has("x-custom-lang")) headers.set("x-custom-lang", language);
  if (!(init?.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  let refreshToken = tokens?.refreshToken;
  const expires =
    typeof tokens?.tokenExpires === "string"
      ? Date.parse(tokens.tokenExpires)
      : tokens?.tokenExpires;
  if (tokens?.token && expires && expires <= Date.now()) {
    const response = await transport(refreshUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const renewed = response.ok ? await response.json() : null;
    if (!renewed?.token || !renewed?.refreshToken) {
      tokens.setTokensInfo?.(null);
      throw new Error("Refresh token expired");
    }
    tokens.setTokensInfo?.(renewed);
    refreshToken = renewed.refreshToken;
    // Callers may have supplied the same old raw header explicitly.
    if (headers.get("Authorization") === tokens.refreshToken)
      headers.delete("Authorization");
  }
  if (tokens?.token && refreshToken && !headers.has("Authorization")) {
    headers.set("Authorization", refreshToken);
  }
  return transport(input, { ...init, headers });
}
