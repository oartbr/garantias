import { useCallback } from "react";
import useFetch from "../use-fetch";
import useFetchBase from "../use-fetch-base";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { SKU } from "../types/sku";
// import { CheckPhoneNumber } from "../types/checkPhoneNumber";
import { InfinityPaginationType } from "../types/infinity-pagination";
// import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import { Tokens } from "@/services/api/types/tokens";
import { User } from "@/services/api/types/user";
import HTTP_CODES_ENUM from "../types/http-codes";
// import { Status } from "../types/status";

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

// GetUserBySKUId
// this will send the skuId to the server to check if there is a User linked to the phone number on the sku.
export type GetUserBySKUIdRequest = {
  skuId: string;
};

type TPolicy = {
  id?: string;
  name?: string;
};

type RegisterFormData = {
  skuId: string;
  name: string;
  description?: number;
  category?: string;
  capacity?: number;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  material?: string;
};

export type GetUserBySKUIdResponse = {
  data: RegisterFormData;
  status: HTTP_CODES_ENUM;
};

export function useGetUserBySKUIdService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetUserBySKUIdRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/sku/getUser/${data.skuId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetUserBySKUIdResponse>);
    },
    [fetchBase]
  );
}
// GetUserBySKUId reponse should be a 200 status code with the User's details.

// RegisterSKU
// this will send the details to register the actual sku.
export type RegisterSKURequest = {
  firstName: string;
  lastName: string;
  address: string;
  number: number;
  city: string;
  zipcode: string;
  email: string;
  policy: TPolicy[];
  skuId?: string;
  userId?: string;
  phoneNumber?: string;
};

export type RegisterSKUResponse = void;

export function useRegisterSKUService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: RegisterSKURequest, requestConfig?: RequestConfigType) => {
      // console.log({ skuData: data });
      return fetchBase(`${API_URL}/v1/sku/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<RegisterSKUResponse>);
    },
    [fetchBase]
  );
}
// RegisterSKU reponse should be a 200 status code

// GetListingBySKUId
// this will send the skuId to the server to get a list of the User's skus.
export type GetListingBySKUIdRequest = {
  skuId: string;
};

export type GetListingBySKUIdResponse = void;

export function useGetListingBySKUIdService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetListingBySKUIdRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/sku/getList/${data.skuId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetListingBySKUIdResponse>);
    },
    [fetchBase]
  );
}
// GetUserBySKUId reponse should be a 200 status code with the User's details.

// GetListingByUser
// this will send the user info to the server to get a list of the User's skus.
export type GetListingByUserRequest = {
  userId: string;
};

export type GetListingByUserResponse = object;

export function useGetListingByUserService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetListingByUserRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/sku/getList/${data.userId}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetListingByUserResponse>);
    },
    [fetchBase]
  );
}
// GetUserByUserreponse should be a 200 status code with the User's details.

// GetSKU
// this will check if the sku exists and return the details.
export type GetSKURequest = {
  id: string;
};

export type GetSKUResponse = {
  sku: SKU;
  status: HTTP_CODES_ENUM;
};

export function useGetSKUService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: GetSKURequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/sku/${data.id}`, {
        method: "GET",
        ...requestConfig,
      })
        .then(wrapperFetchJsonResponse<GetSKUResponse>)
        .then((response) => {
          if (response.status === HTTP_CODES_ENUM.OK) {
            return response;
          } else {
            return response;
          }
        });
    },
    [fetchBase]
  );
}
// GetSKU should be a 200 status code with the SKU's details.

export type SKUsRequest = {
  page: number;
  limit: number;
  filters?: {
    category?: String[];
  };
  sort?: Array<{
    order: SortEnum;
  }>;
};

export type SKUsResponse = InfinityPaginationType<SKU>;

export function useGetSKUsService() {
  const fetch = useFetch();

  return useCallback(
    (data: SKUsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/sku/getAll`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        // console.log({ filtersSKU: data.filters });
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SKUsResponse>);
    },
    [fetch]
  );
}

export type CreateSKURequest = {
  skuId: string;
  name: string;
  description: string;
  category: string;
  capacity: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  material: string;
  cost: string;
  price: string;
  brand: string;
};

export function CreateSKUsService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateSKURequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/sku/create`);

      return fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SKUsResponse>);
    },
    [fetch]
  );
}

export type SKUPostRequest = Pick<
  SKU,
  | "skuId"
  | "description"
  | "category"
  | "capacity"
  | "length"
  | "width"
  | "height"
  | "weight"
  | "material"
  | "cost"
  | "price"
  | "brand"
  | "madeOn"
  | "madeIn"
  | "createdAt"
  | "updatedAt"
> & {
  password: string;
};

export type SKUPostResponse = SKU;

export function usePostSKUService() {
  const fetch = useFetch();

  return useCallback(
    (data: SKUPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/sku`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SKUPostResponse>);
    },
    [fetch]
  );
}

export type SKUPatchRequest = {
  skuId: SKU["skuId"];
  data: Partial<Pick<SKU, "brand">>;
};

export type SKUPatchResponse = SKU;

export function usePatchSKUService() {
  const fetch = useFetch();

  return useCallback(
    (data: SKUPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/sku/${data.skuId}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SKUPatchResponse>);
    },
    [fetch]
  );
}

export type SKUsDeleteRequest = {
  id: SKU["skuId"];
};

export type SKUsDeleteResponse = undefined;

export function useDeleteSKUsService() {
  const fetch = useFetch();

  return useCallback(
    (data: SKUsDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/sku/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<SKUsDeleteResponse>);
    },
    [fetch]
  );
}

/*
 * SKU
 * Server-side calls
 * ### THIS WHOLE SHIT NEEDS REFACTORING ###
 */
export type SKURequest = {
  skuId: SKU["skuId"];
};

export type SKUResponse = SKU;

export async function getSKUService(skuId: string) {
  const requestUrl = new URL(`${process.env.SKU_API_URL}/v1/sku/${skuId}`);

  try {
    const response = await fetch(requestUrl);

    const data = (await response.json()) || {};
    // console.log({ data });
    if (response.status !== 404) {
      data.exists = typeof data.id === "string";
      return data.sku;
    } else {
      data.exists = false;
      return data;
    }
  } catch (error) {
    console.error("Error checking ID:", error);
    return { exists: false };
  }
}
