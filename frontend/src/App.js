import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import axios from "axios";

function App() {
  // const [showPopup, setShowPopup] = useState(true);
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    lat: 17,
    long: 46,
    zoom: 8,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        setPins(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
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
        {pins.map((p) => (
          <>
            <Marker latitude={p.lat} longitude={p.long} anchor="bottom">
              <RoomIcon style={{ fontSize: viewport.zoom * 10 }} />
            </Marker>
            {/* {showPopup && ( */}
            <Popup
        latitude={p.lat}
        longitude={p.long}
        anchor="bottom"
        // onClose={() => setShowPopup(false)}
        >
        <div className="card">
        <label>Place</label>
        <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
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
            Created by <b>{p.username}</b>
            </span>
            <span className="date">Two hours ago</span>
            </div>
          </Popup>
          </>
        ))}
        {/* )} */}
      </Map>
    </>
  );
}

export default App;
