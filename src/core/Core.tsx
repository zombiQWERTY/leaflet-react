import { Resizable } from "re-resizable";
import { RequestsScreen } from "../features/Requests";
import { MapScreen } from "../features/Map";

const style = {
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

export const Core = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Resizable
        style={style}
        enable={{ left: true, right: true }}
        defaultSize={{
          width: "50%",
          height: "100vh",
        }}
        maxWidth="70%"
        minWidth="30%"
      >
        <RequestsScreen />
      </Resizable>
      <div
        style={{ ...style, width: "100%", minWidth: "30%", height: "100vh" }}
      >
        <MapScreen />
      </div>
    </div>
  );
};
