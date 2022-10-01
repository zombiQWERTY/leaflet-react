import { Marker, Popup } from "react-leaflet";
import { PointItem, PointType } from "../../../services/PointsService";

export interface MapMarkerProps {
  point: PointItem;
  pointType: PointType;
}

export const MapMarker = (props: MapMarkerProps) => {
  return (
    <Marker position={props.point.latLng}>
      <Popup>
        {props.pointType === "load" ? "Load" : "Unload"} Point:{" "}
        {props.point.title}
      </Popup>
    </Marker>
  );
};
