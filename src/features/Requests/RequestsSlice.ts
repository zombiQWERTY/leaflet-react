import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PointItem } from "../../services/PointsService";
import {
  RequestItemRaw,
  RequestsService,
} from "../../services/RequestsService";
import { AppThunk, RootState } from "../../store";
import { LatLng, Loading } from "../../types/common";
import { getPoints } from "./PointsSlice";
import { getPaths } from "./PathsSlice";

export type RequestItem = Omit<RequestItemRaw, "loadPoint" | "unloadPoint"> & {
  loadPoint: PointItem;
  unloadPoint: PointItem;
};

export const fetchRequests = createAsyncThunk<
  RequestItem[],
  any,
  {
    state: RootState;
  }
>("requests/fetchAll", async (_: any, { getState, dispatch }) => {
  await dispatch(getPoints()).unwrap();
  const state = getState();
  const points = state.points.entities;

  const requests = await RequestsService.getAll();

  const result = requests.reduce<RequestItem[]>(
    (acc, r) => [
      ...acc,
      {
        ...r,
        loadPoint: points[r.loadPoint],
        unloadPoint: points[r.unloadPoint],
      },
    ],
    []
  );

  const firstRequest = result[0];

  const start = [...firstRequest.loadPoint.latLng].reverse() as LatLng;
  const end = [...firstRequest.unloadPoint.latLng].reverse() as LatLng;

  dispatch(getPaths({ start, end }));

  return result;
});

export const updateRequestPoint =
  (payload: {
    requestId: number;
    pointType: "load" | "unload";
    newPointId: number;
  }): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const points = state.points.entities;
    const requests = state.requests.entities;
    const selected = state.requests.selected;

    const { requestId, pointType, newPointId } = payload;

    dispatch(
      requestsSlice.actions.rewriteRequest({
        ...requests[requestId],
        [pointType === "load" ? "loadPoint" : "unloadPoint"]:
          points[newPointId],
      })
    );

    if (selected === String(requestId)) {
      let start: LatLng;
      let end: LatLng;
      if (pointType === "load") {
        start = [...points[newPointId].latLng].reverse() as LatLng;
        end = [...requests[selected].unloadPoint.latLng].reverse() as LatLng;
      } else {
        start = [...requests[selected].loadPoint.latLng].reverse() as LatLng;
        end = [...points[newPointId].latLng].reverse() as LatLng;
      }

      dispatch(getPaths({ start, end }));
    }
  };

export interface RequestsState {
  loading: Loading;
  error: string | null;
  ids: string[];
  entities: { [k: string]: RequestItem };
  selected: string | null;
}

const initialState: RequestsState = {
  loading: "idle",
  error: null,
  ids: [],
  entities: {},
  selected: null,
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    rewriteRequest(state, action: PayloadAction<RequestItem>) {
      state.entities[action.payload.id] = action.payload;
    },
    selectRequest(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRequests.pending, (state, action) => {
      return {
        loading: "pending",
        error: null,
        ids: [],
        entities: {},
        selected: null,
      };
    });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      const byId = action.payload.reduce<{ [k: string]: RequestItem }>(
        (acc, p) => ({ ...acc, [p.id]: p }),
        {}
      );

      const ids = Object.keys(byId);

      return {
        loading: "succeeded",
        error: null,
        ids,
        entities: byId,
        selected: ids.length ? ids[0] : null,
      };
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      return {
        loading: "failed",
        error: action.error.message || "Errored 'requests' for some reason",
        ids: [],
        entities: {},
        selected: null,
      };
    });
  },
});

export const { reducer, actions } = requestsSlice;
