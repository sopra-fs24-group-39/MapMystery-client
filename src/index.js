import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { GoogleMapsProvider } from './components/views/GoogleMapsContext.tsx';

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleMapsProvider>
        <App tab="home" />
    </GoogleMapsProvider>
  </React.StrictMode>
);
