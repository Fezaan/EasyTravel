import * as React from "react";
import Map, { Marker } from "react-map-gl";
import RoomIcon from '@mui/icons-material/Room';

function App() {
  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 46,
        latitude: 17,
        zoom: 8,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
    >
      <Marker longitude={75.58} latitude={24.92} anchor="bottom">
        <RoomIcon className="icon" />
      </Marker>
    </Map>
  );
}

export default App;
