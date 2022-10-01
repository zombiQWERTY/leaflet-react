import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { reducer as requestsReducer } from "./features/Requests/RequestsSlice";
import { reducer as pointsReducer } from "./features/Requests/PointsSlice";
import { reducer as pathsReducer } from "./features/Requests/PathsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    points: pointsReducer,
    paths: pathsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
