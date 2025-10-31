import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { OidcProvider } from "./oidc";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OidcProvider
    //fallback={<h1>Initializing OIDC...</h1>}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </OidcProvider>
  </React.StrictMode>,
);
