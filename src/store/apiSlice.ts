import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Campaign, IcreateCampaign } from "../types";

const baseUrl = "http://localhost:3000";
export const api = createApi({
    reducerPath: 'campaign',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        getCampaign: builder.query<Campaign[], void>({
            query: () => '/campaigns'
        }),
        addCampaign: builder.mutation<Campaign, IcreateCampaign>({
            query: (campaign) => ({
                url: '/campaigns',
                method: 'POST',
                body: campaign
            })

        })
    })

})

export const { useGetCampaignQuery, useAddCampaignMutation } = api