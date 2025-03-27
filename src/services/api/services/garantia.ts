import { useCallback } from "react";
import useFetch from "../use-fetch";
import useFetchBase from "../use-fetch-base";
import {
  API_URL,
  GARANTIA_CODE_LENGTH,
  GARANTIA_CODE_TYPE,
  GARANTIA_CODE_PREFIX,
} from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Garantia } from "../types/garantia";
// import { CheckPhoneNumber } from "../types/checkPhoneNumber";
import { InfinityPaginationType } from "../types/infinity-pagination";
// import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import { Tokens } from "@/services/api/types/tokens";
import { User } from "@/services/api/types/user";
import HTTP_CODES_ENUM from "../types/http-codes";
import { Status } from "../types/status";

// CheckPhoneNumber
// this will send the phone number to the messaging service on the back-end, which will send a code to the phone number.
export type CheckPhoneNumberRequest = {
  phoneNumber: string;
};

export type CheckPhoneNumberResponse = {
  data: object;
  status: HTTP_CODES_ENUM;
};

export function useCheckPhoneNumberService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: CheckPhoneNumberRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/messaging/sendCode`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CheckPhoneNumberResponse>);
    },
    [fetchBase]
  );
}
// CheckPhoneNumber reponse should be a 200 status code, but the response is void.

// CheckPhoneNumberLogin
// this will send the phone number to the messaging service on the back-end, which will send a code to the phone number.
export type CheckPhoneNumberLoginRequest = {
  phoneNumber: string;
};

export type CheckPhoneNumberLoginResponse = {
  data: object;
  status: HTTP_CODES_ENUM;
};

export function useCheckPhoneNumberLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: CheckPhoneNumberLoginRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/messaging/codeLogin`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CheckPhoneNumberLoginResponse>);
    },
    [fetchBase]
  );
}
// CheckPhoneNumber reponse should be a 200 status code, but the response is void.

// CheckCode
// this will send the a code to the server to check if it is the same as the one sent via WhatsApp.
export type CheckCodeRequest = {
  phoneNumber: string;
  code: string;
};

export type CheckCodeResponse = {
  user: User;
  token: Tokens["token"];
  refreshToken: Tokens["refreshToken"];
  tokenExpires: Tokens["tokenExpires"];
  status: HTTP_CODES_ENUM;
};

export function useCheckCodeService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: CheckCodeRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/messaging/confirmCode`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CheckCodeResponse>);
    },
    [fetchBase]
  );
}
// CheckCode reponse should be a 200 status code, but the response is void.

// GetUserByGarantiaId
// this will send the garantiaId to the server to check if there is a User linked to the phone number on the garantia.
export type GetUserByGarantiaIdRequest = {
  garantiaId: string;
};

type TPolicy = {
  id?: string;
  name?: string;
};

type RegisterFormData = {
  id?: string;
  phoneNumber?: string;
  garantiaId?: string;
  userId?: string;
  number: number;
  address: string;
  email?: string;
  firstName: string;
  lastName: string;
  city: string;
  zipcode: string;
  policy: TPolicy[];
  isEmailVerified?: boolean;
};

export type GetUserByGarantiaIdResponse = {
  data: RegisterFormData;
  status: HTTP_CODES_ENUM;
};

export function useGetUserByGarantiaIdService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetUserByGarantiaIdRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/garantia/getUser/${data.garantiaId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetUserByGarantiaIdResponse>);
    },
    [fetchBase]
  );
}
// GetUserByGarantiaId reponse should be a 200 status code with the User's details.

// RegisterGarantia
// this will send the details to register the actual garantia.
export type RegisterGarantiaRequest = {
  firstName: string;
  lastName: string;
  address: string;
  number: number;
  city: string;
  zipcode: string;
  email: string;
  policy: TPolicy[];
  garantiaId?: string;
  userId?: string;
  phoneNumber?: string;
};

export type RegisterGarantiaResponse = void;

export function useRegisterGarantiaService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: RegisterGarantiaRequest, requestConfig?: RequestConfigType) => {
      // console.log({ garantiaData: data });
      return fetchBase(`${API_URL}/v1/garantia/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<RegisterGarantiaResponse>);
    },
    [fetchBase]
  );
}
// RegisterGarantia reponse should be a 200 status code

// GetListingByGarantiaId
// this will send the garantiaId to the server to get a list of the User's garantias.
export type GetListingByGarantiaIdRequest = {
  garantiaId: string;
};

export type GetListingByGarantiaIdResponse = void;

export function useGetListingByGarantiaIdService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (
      data: GetListingByGarantiaIdRequest,
      requestConfig?: RequestConfigType
    ) => {
      return fetchBase(`${API_URL}/v1/garantia/getList/${data.garantiaId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetListingByGarantiaIdResponse>);
    },
    [fetchBase]
  );
}
// GetUserByGarantiaId reponse should be a 200 status code with the User's details.

// GetListingByUser
// this will send the user info to the server to get a list of the User's garantias.
export type GetListingByUserRequest = {
  userId: string;
};

export type GetListingByUserResponse = object;

export function useGetListingByUserService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetListingByUserRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/garantia/getList/${data.userId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetListingByUserResponse>);
    },
    [fetchBase]
  );
}
// GetUserByUserreponse should be a 200 status code with the User's details.

// GetGarantia
// this will check if the garantia exists and return the details.
export type GetGarantiaRequest = {
  garantiaId: string;
  userId: string | number | undefined;
};

export type GetGarantiaResponse = {
  garantia: Garantia;
  status: HTTP_CODES_ENUM;
};

export function useGetGarantiaService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetGarantiaRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(
        `${API_URL}/v1/garantia/${data.garantiaId}${data.userId ? "/" + data.userId : ""}`,
        {
          method: "GET",
          ...requestConfig,
        }
      )
        .then(wrapperFetchJsonResponse<GetGarantiaResponse>)
        .then((response) => {
          if (
            response.status === HTTP_CODES_ENUM.OK &&
            (data.userId === response.data.garantia.userId ||
              response.data.garantia.userId === undefined)
          ) {
            return {
              data: {
                garantia: response.data.garantia,
              },
              status: response.status,
            };
          } else {
            return {
              data: {
                garantia: { status: "undefined" } as Garantia,
              },
              status: response.status,
            };
          }
        });
    },
    [fetchBase]
  );
}
// GetGarantia should be a 200 status code with the Garantia's details.

export type GarantiasRequest = {
  page: number;
  limit: number;
  filters?: {
    status?: Status[];
  };
  sort?: Array<{
    order: SortEnum;
  }>;
};

export type GarantiasResponse = InfinityPaginationType<Garantia>;

export function useGetGarantiasService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiasRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/garantia/getAll`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiasResponse>);
    },
    [fetch]
  );
}

export type CreateGarantiaRequest = {
  quantity: number;
  length?: number;
  type?: string;
  prefix?: string;
};

export type CreateGarantiasResponse = {
  printId: string;
};

export function CreateGarantiasService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateGarantiaRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/garantia/create`);

      data.quantity = data.quantity;
      data.length = Number(GARANTIA_CODE_LENGTH);
      data.type = GARANTIA_CODE_TYPE;
      data.prefix = GARANTIA_CODE_PREFIX;

      return fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateGarantiasResponse>);
    },
    [fetch]
  );
}

export type GarantiaPostRequest = Pick<
  Garantia,
  | "garantiaId"
  | "brand"
  | "builtAt" // Changed from builtOn
  | "description"
  | "sku"
  | "reseller"
  | "shippedAt" // Changed from shippedDate
  | "soldTo"
> & {
  password: string;
};

export type GarantiaPostResponse = Garantia;

export function usePostGarantiaService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiaPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiaPostResponse>);
    },
    [fetch]
  );
}

export type GarantiaPatchRequest = {
  garantiaId: Garantia["garantiaId"];
  data: Partial<Pick<Garantia, "brand">>;
};

export type GarantiaPatchResponse = Garantia;

export function usePatchGarantiaService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiaPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia/${data.garantiaId}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiaPatchResponse>);
    },
    [fetch]
  );
}

// Assign a garantia to the SKU
export type GarantiaAssignRequest = {
  garantiaId: Garantia["garantiaId"];
  data: Partial<Pick<Garantia, "brand">>;
};

export type GarantiaAssignResponse = Garantia;

export function useAssignGarantiaService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiaAssignRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia/assign/${data.garantiaId}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiaAssignResponse>);
    },
    [fetch]
  );
}

// QualityCheck items to the Garantia
export type GarantiaQualityCheckRequest = {
  garantiaId: Garantia["garantiaId"];
  data: Partial<Pick<Garantia, "qualityCheck">>;
};

export type GarantiaQualityCheckResponse = Garantia;

export function useQualityCheckGarantiaService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiaQualityCheckRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia/qualityCheck/${data.garantiaId}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiaQualityCheckResponse>);
    },
    [fetch]
  );
}

export type GarantiasDeleteRequest = {
  id: Garantia["garantiaId"];
};

export type GarantiasDeleteResponse = undefined;

export function useDeleteGarantiasService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiasDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiasDeleteResponse>);
    },
    [fetch]
  );
}

// GetListingByUser
// this will get a list of the available garantias PDF files.
export type GetListingPdfsRequest = {
  status: string;
};

export type GetListingPdfsResponse = object;

export function useGetListingPdfsService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetListingPdfsRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(
        `${API_URL}/v1/garantia/getPdfs/${data.status || "pending"}`,
        {
          method: "GET",
          ...requestConfig,
        }
      ).then(wrapperFetchJsonResponse<GetListingByUserResponse>);
    },
    [fetchBase]
  );
}
// GetUserByUserreponse should be a 200 status code with the PDFs' details.

// GetPdfFile
// this will get a list of the available garantias PDF files.
export type GetPdfRequest = string;

export type GetLPdfResponse = object;

export function useGetPdfService() {
  const fetchBase = useFetchBase();
  return useCallback(
    (printId: GetPdfRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/garantia/getPdfFile/${printId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetLPdfResponse>);
    },
    [fetchBase]
  );
}
// GetUserByUserreponse should be a 200 status code with the PDFs' details.

/*
 * Garantia
 * Server-side calls
 * ### THIS WHOLE SHIT NEEDS REFACTORING ###
 */
export type GarantiaRequest = {
  garantiaId: Garantia["garantiaId"];
};

export type GarantiaResponse = Garantia;

export async function getGarantiaService(garantiaId: string) {
  const requestUrl = new URL(
    `${process.env.GARANTIA_API_URL}/v1/garantia/${garantiaId}`
  );

  try {
    const response = await fetch(requestUrl);

    const data = (await response.json()) || {};
    if (response.status !== 404) {
      data.exists = typeof data.id === "string";
      return data.garantia;
    } else {
      data.exists = false;
      return data;
    }
  } catch (error) {
    console.error("Error checking ID:", error);
    return { exists: false };
  }
}
