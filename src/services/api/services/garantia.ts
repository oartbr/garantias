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
import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";

// CheckPhoneNumber
// this will send the phone number to the messaging service on the back-end, which will send a code to the phone number.
export type CheckPhoneNumberRequest = {
  phoneNumber: string;
  garantiaId: string;
};

export type CheckPhoneNumberResponse = void;

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

// CheckCode
// this will send the a code to the server to check if it is the same as the one sent via WhatsApp.
export type CheckCodeRequest = {
  phoneNumber: string;
  garantiaId: string;
  code: string;
};

export type CheckCodeResponse = void;

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
  confirmEmail: string;
  policy: object;
  garantiaId: string;
};

export type RegisterGarantiaResponse = void;

export function useRegisterGarantiaService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: RegisterGarantiaRequest, requestConfig?: RequestConfigType) => {
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

export type GarantiasRequest = {
  page: number;
  limit: number;
  filters?: {
    roles?: Role[];
  };
  sort?: Array<{
    orderBy: keyof User;
    order: SortEnum;
  }>;
};

export type GarantiasResponse = InfinityPaginationType<Garantia>;

export function useGetGarantiasService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiasRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/garantias/getAvailable'`);
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
  length: number;
  type: string;
  prefix: string;
};

export function CreateGarantiasService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateGarantiaRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/garantia/create`);

      data.quantity = data.quantity.id;
      data.length = GARANTIA_CODE_LENGTH;
      data.type = GARANTIA_CODE_TYPE;
      data.prefix = GARANTIA_CODE_PREFIX;

      return fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiasResponse>);
    },
    [fetch]
  );
}

export type GarantiaPostRequest = Pick<
  Garantia,
  | "garantiaId"
  | "brand"
  | "builtOn"
  | "description"
  | "sku"
  | "reseller"
  | "shippedDate"
  | "soldTo"
  | "soldDate"
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
  id: Garantia["id"];
  data: Partial<Pick<Garantia, "brand">>;
};

export type GarantiaPatchResponse = Garantia;

export function usePatchGarantiaService() {
  const fetch = useFetch();

  return useCallback(
    (data: GarantiaPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/garantia/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GarantiaPatchResponse>);
    },
    [fetch]
  );
}

export type GarantiasDeleteRequest = {
  id: Garantia["id"];
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
    const data = await response.json();
    data.exists = typeof data.id === "string";
    return data;
  } catch (error) {
    console.error("Error checking ID:", error);
    return { exists: false };
  }
}
