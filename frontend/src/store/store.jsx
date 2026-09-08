import { configureStore } from "@reduxjs/toolkit";
import { itemApi } from "../services/ItemServices";

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});
