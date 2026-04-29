import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
if (location.hostname === "localhost") {
  import("eruda").then((eruda) => eruda.default.init());
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
