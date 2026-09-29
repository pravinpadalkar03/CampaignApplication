import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICampaignFilterState } from "../types";


const initialState: ICampaignFilterState = {
    searchText: "",
    dateRange: null
}
const campaignFilterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload
        },
        setDateRange(state, action: PayloadAction<[string | null, null | string] | null>) {
            state.dateRange = action.payload
        }
    }
});

export const { setDateRange, setSearchText } = campaignFilterSlice.actions
export const campaignFilterReducer = campaignFilterSlice.reducer