import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PointItem, PointType } from "../../../services/PointsService";
import { RootState, useAppDispatch } from "../../../store";
import { fetchRequests, RequestItem } from "../RequestsSlice";
import { ChangePoint } from "./ChangePoint";
import { useOnRequestSelectionChange } from "./hooks/onRequestSelectionChange";

export const RequestsTable = () => {
  const dispatch = useAppDispatch();
  const { selected, entities, loading } = useSelector(
    (state: RootState) => state.requests
  );

  useEffect(() => {
    dispatch(fetchRequests({}));
  }, [dispatch]);

  const renderPoint =
    (pointType: PointType) => (point: PointItem, request: RequestItem) =>
      <ChangePoint request={request} point={point} pointType={pointType} />;

  const columns: ColumnsType<RequestItem> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "LoadPoint",
      dataIndex: "loadPoint",
      key: "loadPoint",
      render: renderPoint("load"),
    },
    {
      title: "UnloadPoint",
      dataIndex: "unloadPoint",
      key: "unloadPoint",
      render: renderPoint("unload"),
    },
  ];

  const dataSource = Object.values(entities);

  const { onChange } = useOnRequestSelectionChange();

  return (
    <Table
      style={{ width: "100%" }}
      dataSource={dataSource}
      columns={columns}
      rowKey={"id"}
      loading={loading === "pending"}
      rowSelection={{
        hideSelectAll: true,
        type: "radio",
        selectedRowKeys: selected ? [parseInt(selected)] : [],
        onChange,
      }}
      scroll={{ scrollToFirstRowOnChange: true, x: true }}
    />
  );
};
