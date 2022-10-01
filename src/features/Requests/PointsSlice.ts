import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PointItem, PointsService } from "../../services/PointsService";
import { Loading } from "../../types/common";

export const getPoints = createAsyncThunk("points/getAll", async () => {
  const res = await PointsService.getAll();
  return res;
});

export interface PointsState {
  loading: Loading;
  error: string | null;
  ids: string[];
  entities: { [k: string]: PointItem };
}

const initialState: PointsState = {
  loading: "idle",
  error: null,
  ids: [],
  entities: {},
};

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPoints.pending, (state, action) => {
      return {
        loading: "pending",
        error: null,
        ids: [],
        entities: {},
      };
    });
    builder.addCase(getPoints.fulfilled, (state, action) => {
      const byId = action.payload.reduce<{ [k: string]: PointItem }>(
        (acc, p) => ({ ...acc, [p.id]: p }),
        {}
      );

      return {
        loading: "succeeded",
        error: null,
        ids: Object.keys(byId),
        entities: byId,
      };
    });
    builder.addCase(getPoints.rejected, (state, action) => {
      return {
        loading: "failed",
        error: action.error.message || "Errored 'points' for some reason",
        ids: [],
        entities: {},
      };
    });
  },
});

export const { reducer } = pointsSlice;
