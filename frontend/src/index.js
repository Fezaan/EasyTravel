import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
