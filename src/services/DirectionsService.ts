import axios from "axios";
import { LatLng } from "../types/common";

const TOKEN = process.env.REACT_APP_MAP_SERVICE_TOKEN;
const URL = "https://api.openrouteservice.org/v2/directions";
const TYPE = "driving-car";

interface ApiResponse {
  features: Array<GeoJSON.GeoJSON>;
}

export interface CoordQuery {
  start: LatLng;
  end: LatLng;
}

const getDirections = async (coords: CoordQuery): Promise<GeoJSON.GeoJSON> => {
  const response = await axios.get<ApiResponse>(`${URL}/${TYPE}`, {
    params: {
      api_key: TOKEN,
      start: coords.start.join(","),
      end: coords.end.join(","),
    },
  });

  return response.data.features[0];
};

export const DirectionsService = {
  getDirections,
};
