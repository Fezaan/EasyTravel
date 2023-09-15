import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";

function App() {
  // const [showPopup, setShowPopup] = useState(true);
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
        onMove={(evt) => {
          setViewport((prevViewport) => evt.viewState);
        }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/light-v10"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Marker latitude={25.17} longitude={75.58} anchor="bottom">
          <RoomIcon style={{ fontSize: viewport.zoom * 10 }} />
        </Marker>
        {/* {showPopup && ( */}
        {/* <Popup
          longitude={46}
          latitude={17}
          anchor="bottom"
          // onClose={() => setShowPopup(false)}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">Kisi ka ghar</h4>
            <label>Review</label>
            <p className="desc">Noice Place</p>
            <label>Rating</label>
            <div className="stars">
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>Fezaan</b>
            </span>
            <span className="date">Two hours ago</span>
          </div>
        </Popup> */}
        {/* )} */}
      </Map>
    </>
  );
}

export default App;
