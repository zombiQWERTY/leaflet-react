import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { MapMarker } from "./MapMarker";

// https://github.com/Leaflet/Leaflet/issues/4968
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const CENTER_COORDS: L.LatLngExpression = [55.751244, 37.618423];
const ZOOM = 11;

export const MapScreen = () => {
  const { selected, entities } = useSelector(
    (state: RootState) => state.requests
  );

  const { geojson } = useSelector((state: RootState) => state.paths);
  const selectedRequest = selected ? entities[selected] : null;

  return (
    <MapContainer
      center={CENTER_COORDS}
      zoom={ZOOM}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedRequest && geojson && (
        <>
          <MapMarker point={selectedRequest.loadPoint} pointType={"load"} />
          <MapMarker point={selectedRequest.unloadPoint} pointType={"unload"} />
          <GeoJSON data={geojson} />
        </>
      )}
    </MapContainer>
  );
};
