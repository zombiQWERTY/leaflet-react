import { useCallback } from "react";
import { PointType } from "../../../../services/PointsService";
import { useAppDispatch } from "../../../../store";
import { updateRequestPoint } from "../../RequestsSlice";

export interface OnPointChange {
  requestId: number;
  pointType: PointType;
}

export const useOnPointChange = (props: OnPointChange) => {
  const { requestId, pointType } = props;
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (value: number) => {
      dispatch(updateRequestPoint({ requestId, pointType, newPointId: value }));
    },
    [dispatch, requestId, pointType]
  );

  return { onChange };
};
