import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./www/dist/css/main.min.css?";
import reportWebVitals from "./reportWebVitals";
import { Homepage } from "./pages/homepage";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove this part if the script is at the end of <body>
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.getElementById('root2') as HTMLElement).render(
      <React.StrictMode>
          <Homepage />
      </React.StrictMode>
  );
});


reportWebVitals();
