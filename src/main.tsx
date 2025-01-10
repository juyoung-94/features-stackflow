import { createRoot } from "react-dom/client";
import "@stackflow/plugin-basic-ui/index.css";
import "./index.css";
import App from "./App.tsx";
import StoreProvider from "./StoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
