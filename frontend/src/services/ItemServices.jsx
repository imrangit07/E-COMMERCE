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

    getByCatAndShape: builder.query({
      query: ({ category, frameShape }) => {
        const params = new URLSearchParams();

        if (category) {
          params.append("category", category);
        }

        if (frameShape) {
          params.append("frameShape", frameShape);
        }

        return `api/products/glasses?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetItemsQuery, useGetByCatAndShapeQuery } = itemApi;
