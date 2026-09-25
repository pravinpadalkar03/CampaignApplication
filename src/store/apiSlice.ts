import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Campaign } from "../types";

const baseUrl = "http://localhost:3000";
export const api = createApi({
    reducerPath: 'campaignApi',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getCampaign: builder.query<Campaign[], void>({
            query: () => '/campaigns'
        })

    })

})

export const { useGetCampaignQuery } = api