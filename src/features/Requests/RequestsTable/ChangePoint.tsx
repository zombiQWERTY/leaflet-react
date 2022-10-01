import { Select } from "antd";
import { PointItem, PointType } from "../../../services/PointsService";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useOnPointChange } from "./hooks/onPointChange";
import { RequestItem } from "../RequestsSlice";

export interface ChangePointProps {
  point: PointItem;
  request: RequestItem;
  pointType: PointType;
}

export const ChangePoint = (props: ChangePointProps) => {
  const { point, request, pointType } = props;

  const { onChange } = useOnPointChange({
    requestId: request.id,
    pointType,
  });

  const { entities, loading } = useSelector((state: RootState) => state.points);

  const options = Object.values(entities).map((point) =>
    point.id === request[pointType === "load" ? "unloadPoint" : "loadPoint"].id
      ? { ...point, disabled: true }
      : point
  );

  return (
    <Select
      loading={loading === "pending"}
      defaultValue={point.id}
      options={options}
      fieldNames={{ label: "title", value: "id" }}
      style={{ width: 120 }}
      onChange={onChange}
    />
  );
};
