import HTTP_CODES_ENUM from "./http-codes";
import { ValidationErrors } from "./validation-errors";

export type FetchJsonResponse<T> =
  | { status: HTTP_CODES_ENUM.OK | HTTP_CODES_ENUM.CREATED; data: T }
  | { status: HTTP_CODES_ENUM.NO_CONTENT; data: undefined }
  | {
      status:
        | HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR
        | HTTP_CODES_ENUM.SERVICE_UNAVAILABLE
        | HTTP_CODES_ENUM.PRECONDITION_REQUIRED
        | HTTP_CODES_ENUM.TOO_MANY_REQUESTS;
      data: undefined;
    }
  | ValidationErrors;
