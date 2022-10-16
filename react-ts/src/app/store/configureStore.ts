import { configureStore } from "@reduxjs/toolkit";
import { sampleSlice } from "../../features/sample/sampleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
    reducer:{
        sample: sampleSlice.reducer,
        account: accountSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 