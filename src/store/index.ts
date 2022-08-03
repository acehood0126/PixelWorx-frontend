import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./reducers/authSlice";
import jobReducer from "./reducers/jobSlice";
import WalletWrapper from "./providers/WalletWrapper";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { WalletWrapper };
