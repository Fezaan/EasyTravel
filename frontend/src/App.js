// eslint-disable-next-line

import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const currentUser = "sania";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 17,
    longitude: 46,
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

  const handleMarkerClick = (id, lat, long) => {
    // console.log(currentPlaceId);
    setCurrentPlaceId((prevPlaceId) => id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
    // console.log("Clicked", id);
  };

  const handleAddClick = (evt) => {
    const long = evt.lngLat.lng;
    const lat = evt.lngLat.lat;
    console.log(lat, long);
    setNewPlace({
      lat,
      long,
    });
  };

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
        onDblClick={handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker latitude={p.lat} longitude={p.long} anchor="bottom">
              <div>
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 10,
                    color: p.username === currentUser ? "tomato" : "slateblue",
                  }}
                  cursor="pointer"
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </div>
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId((prev) => null)}
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
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setNewPlace((prev) => null)}
          >
            Hello
          </Popup>
        )}
      </Map>
    </>
  );
}

export default App;
