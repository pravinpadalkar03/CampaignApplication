import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { campaignFilterReducer } from "./campaignFilterSlice";
import { api } from "./apiSlice";


const logger: Middleware = (store) => (next) => (action) => {
    console.log({
        store,
        action,
        next
    })
    return next(action)
}

export const store = configureStore({

    reducer: {
        [api.reducerPath]: api.reducer,
        campaignFilter: campaignFilterReducer
    },
    middleware: (getDefaultMiddleWares) => getDefaultMiddleWares().concat(logger).concat(api.middleware),
})

export const { dispatch, getState } = store
export type RootState = ReturnType<typeof getState>