import { useState, useEffect, useRef } from "react";
import mapboxGl from "mapbox-gl";

mapboxGl.accessToken = process.env.REACT_APP_MAPBOX;
console.log(mapboxGl.accessToken);

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <div className="App">
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
}

export default App;
