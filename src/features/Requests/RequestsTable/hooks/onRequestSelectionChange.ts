import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store";
import { LatLng } from "../../../../types/common";
import { getPaths } from "../../PathsSlice";
import { actions as requestsActions } from "../../RequestsSlice";

export const useOnRequestSelectionChange = () => {
  const dispatch = useAppDispatch();
  const { entities } = useSelector((state: RootState) => state.requests);

  const onChange = useCallback(
    (selectedKeys: React.Key[]) => {
      dispatch(requestsActions.selectRequest(String(selectedKeys[0])));

      const start = [
        ...entities[selectedKeys[0]].loadPoint.latLng,
      ].reverse() as LatLng;

      const end = [
        ...entities[selectedKeys[0]].unloadPoint.latLng,
      ].reverse() as LatLng;

      dispatch(
        getPaths({
          start,
          end,
        })
      );
    },
    [dispatch, entities]
  );

  return { onChange };
};
