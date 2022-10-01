import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CoordQuery,
  DirectionsService,
} from "../../services/DirectionsService";
import { Loading } from "../../types/common";

export const getPaths = createAsyncThunk(
  "paths/getDirections",
  async (coords: CoordQuery) => {
    const res = await DirectionsService.getDirections(coords);
    return res;
  }
);

export interface PathsState {
  loading: Loading;
  error: string | null;
  geojson: GeoJSON.GeoJSON | null;
}

const initialState: PathsState = {
  loading: "idle",
  error: null,
  geojson: null,
};

const pathsSlice = createSlice({
  name: "paths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaths.pending, (state, action) => {
      return {
        loading: "pending",
        error: null,
        geojson: null,
      };
    });
    builder.addCase(getPaths.fulfilled, (state, action) => {
      return {
        loading: "succeeded",
        error: null,
        geojson: action.payload,
      };
    });
    builder.addCase(getPaths.rejected, (state, action) => {
      return {
        loading: "failed",
        error: action.error.message || "Errored directions for some reason",
        geojson: null,
      };
    });
  },
});

export const { reducer, actions } = pathsSlice;
