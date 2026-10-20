"use client";
import { useCallback } from "react";
import { Tokens } from "./types/tokens";
import { TokensInfo } from "../auth/auth-context";
import { AUTH_REFRESH_URL } from "./config";
import { FetchInputType, FetchInitType } from "./types/fetch-params";
import useLanguage from "../i18n/use-language";
import { executeApiRequest } from "./execute-api-request";

function useFetchBase() {
  const language = useLanguage();
  return useCallback(
    (
      input: FetchInputType,
      init?: FetchInitType,
      tokens?: Tokens & { setTokensInfo?: (tokensInfo: TokensInfo) => void }
    ) => executeApiRequest(input, init, tokens, language, AUTH_REFRESH_URL),
    [language]
  );
}
export default useFetchBase;
