import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BACKEND_URL } from "../config/config"

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:`${BACKEND_URL}`}),
    endpoints:(builder)=>({

    })
})

export const {} = userApi;