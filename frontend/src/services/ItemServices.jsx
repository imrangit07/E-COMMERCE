import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../config/config";

export const itemApi = createApi({
  reducerPath: "itemApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
  }),

  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "api/products/",
    }),
  }),
});

export const {
  useGetItemsQuery,
} = itemApi;