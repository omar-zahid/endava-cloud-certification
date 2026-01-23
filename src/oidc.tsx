import { oidcSpa } from "oidc-spa/react-spa";
import { createOidc } from "oidc-spa/core";
import { z } from "zod";

export const {
  bootstrapOidc,
  useOidc,
  getOidc,
  enforceLogin,
  OidcInitializationGate,
} = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: z.object({
      sub: z.string(),
      name: z.string(),
      preferred_username: z.string(),
    }),
    decodedIdToken_mock: {
      sub: "endava-cloud-certification",
      name: "Cloud Certification",
      preferred_username: "cloud.endava.com",
    },
  })
  .createUtils();

bootstrapOidc(
  import.meta.env.VITE_OIDC_USE_MOCK === "true"
    ? {
        implementation: "mock",
        isUserInitiallyLoggedIn: true,
      }
    : {
        implementation: "real",
        issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        scopes: (import.meta.env.VITE_OIDC_SCOPE || undefined)?.split(" "),
        debugLogs: true,
      },
);

export const fetchWithAuth: typeof fetch = async (input, init) => {
  const oidc = await getOidc();

  if (oidc.isUserLoggedIn) {
    const accessToken = await oidc.getAccessToken();
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    (init ??= {}).headers = headers;
  }

  return fetch(input, init);
};

export const fetchGraphWithAuth: typeof fetch = async (input, init) => {
  const oidc = await getOidc();

  if (oidc.isUserLoggedIn) {
    const { getTokens: getGraphToken } = await createOidc({
      issuerUri: oidc.issuerUri,
      clientId: import.meta.env.VITE_OIDC_GRAPH_CLIENT_ID,
      scopes: ["User.Read", "User.ReadBasic.All", "profile", "openid", "email"],
      autoLogin: true,
    });
    const headers = new Headers(init?.headers);
    headers.set(
      "Authorization",
      `Bearer ${(await getGraphToken()).accessToken}`,
    );
    (init ??= {}).headers = headers;
  }

  return fetch(input, init);
};
