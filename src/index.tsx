import App from "./App";
import React from "react";
import "./www/dist/css/main.min.css?";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
