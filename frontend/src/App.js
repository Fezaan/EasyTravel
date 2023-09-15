import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 17,
    longitude: 46,
    zoom: 8,
  });
  return (
    <>
      <Map
        {...viewport}
        // initialViewState={{
        //   latitude: 46,
        //   longitude: 17,
        //   zoom: 8,
        // }}
        onMove={(evt) => {
          setViewport((prevViewport) => evt.viewState);
        }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker latitude={25.17} longitude={75.58}>
          <RoomIcon style={{ fontSize: viewport.zoom * 10 }} />
        </Marker>
      </Map>
    </>
  );
}

export default App;
