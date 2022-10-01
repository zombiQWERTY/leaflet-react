import requests from "../data/requests.json";

export interface RequestItemRaw {
  id: number;
  title: string;
  loadPoint: number;
  unloadPoint: number;
}

const getAll = (): Promise<RequestItemRaw[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(requests), 300);
  });
};

export const RequestsService = {
  getAll,
};
