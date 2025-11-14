import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Setup jQuery before anything else
import "./utils/jquery-setup";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
