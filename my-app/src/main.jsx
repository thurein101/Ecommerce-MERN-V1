import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AppRouter from "./Routing/Route";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/searchContext";

import "antd/dist/reset.css";
import { CartProvider } from "./context/cartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Toaster />
          <AppRouter />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </StrictMode>,
);
