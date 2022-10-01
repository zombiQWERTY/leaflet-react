import points from "../data/points.json";
import { LatLng } from "../types/common";

export interface PointItem {
  id: number;
  title: string;
  latLng: LatLng;
}

export type PointType = "load" | "unload";

const getAll = (): Promise<PointItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(points as PointItem[]), 300);
  });
};

export const PointsService = {
  getAll,
};
