import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/axios/token";
import { GetPaginatedResponseInterface, userType } from "../../utils/Types";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import { BASE_URL } from "../../utils/axios";

export const stateQueryApi = createApi({
  reducerPath: "stateQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaginatedUsers: builder.query<
      GetPaginatedResponseInterface<userType[]>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: `${API_ENDPOINTS.USER}?page=${page}&limit=${limit}`,
      }),
      transformResponse: (res: {
        data: GetPaginatedResponseInterface<userType[]>;
      }) => res.data! ?? res,
    }),
  }),
});

export const { useGetPaginatedUsersQuery } = stateQueryApi;
