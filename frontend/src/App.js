// eslint-disable-next-line

import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/register";

function App() {
  const [currentUser, setcurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(1);
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

  const handleSubmit = async (e) => {
    console.log("Submitted");
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("http://localhost:8800/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err.response.data);
    }
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
        // transitionDration: "200"
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
                    {Array(p.rating).fill(<StarIcon className="star" />)}
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
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout">Log out</button>
        ) : (
          <div className="buttons">
            <button className="button login">Login</button>
            <button className="button register">Register</button>
          </div>
        )}
        <Register />
      </Map>
    </>
  );
}

export default App;
