import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../services/apiCategory";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const UseAppDisptacth: () => AddDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
