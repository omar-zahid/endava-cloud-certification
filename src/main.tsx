import React from "react";
import ReactDOM from "react-dom/client";
import { OidcInitializationGate } from "./oidc";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import type { BrandVariants, Theme } from "@fluentui/react-components";
import { createLightTheme } from "@fluentui/react-components";
import { useGlobalStyles } from "./styles/globalStyles";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const endavabrand: BrandVariants = {
  10: "#070200",
  20: "#271007",
  30: "#43160E",
  40: "#591B12",
  50: "#701F15",
  60: "#882419",
  70: "#9F291D",
  80: "#B63022",
  90: "#CD3829",
  100: "#E34230",
  110: "#F74F3A",
  120: "#FF6950",
  130: "#FF856D",
  140: "#FF9E88",
  150: "#FFB5A3",
  160: "#FFCABE",
};

const endavaTheme: Theme = {
  ...createLightTheme(endavabrand),
};

endavaTheme.colorBrandForeground1 = endavabrand[110];
endavaTheme.colorBrandForeground2 = endavabrand[120];

function GlobalStyles() {
  useGlobalStyles();
  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={!endavabrand ? endavaTheme : webDarkTheme}>
      <GlobalStyles />
      <OidcInitializationGate>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </OidcInitializationGate>
    </FluentProvider>
  </React.StrictMode>,
);
