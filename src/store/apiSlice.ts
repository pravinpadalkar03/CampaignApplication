import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Campaign, IcreateCampaign } from "../types";

const baseUrl = "http://localhost:3000";
export const api = createApi({
    reducerPath: 'campaign',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Campaign'],
    endpoints: (builder) => ({
        getCampaign: builder.query<Campaign[], void>({
            query: () => '/campaigns',
            providesTags: ['Campaign']
        }),
        addCampaign: builder.mutation<Campaign, IcreateCampaign>({
            query: (campaign) => ({
                url: '/campaigns',
                method: 'POST',
                body: campaign,
                invalidateTags: ['Campaign']
            })


        })
    })
})

export const { useGetCampaignQuery, useAddCampaignMutation } = api