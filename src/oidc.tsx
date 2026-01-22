import { createReactOidc } from "oidc-spa/react";
import { z } from "zod";

export const {
  OidcProvider,
  /**
   * Note: If you have multiple OidcProvider in your app
   * you do not need to use the useClient hook that that corresponds
   * to the above OidcProvider.
   */
  useOidc,
  /**
   * This is useful to use the oidc API outside of React.
   */
  getOidc,
  enforceLogin,
} = createReactOidc(async () => ({
  // If you don't have the parameters right away, it's the case for example
  // if you get the oidc parameters from an API you can pass a promise that
  // resolves to the parameters. `createReactOidc(prParams)`.
  // You can also pass an async function that returns the parameters.
  // `createReactOidc(async () => params)`. It will be called when the <OidcProvider />
  // is first mounted or when getOidc() is called.

  // NOTE: If you are using keycloak, the issuerUri should be formatted like this:
  // issuerUri: https://<YOUR_KEYCLOAK_DOMAIN><KC_RELATIVE_PATH>/realms/<REALM_NAME>
  // KC_RELATIVE_PATH is by default "" in modern keycloak, on older keycloak it used to be "/auth" by default.
  issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  __unsafe_clientSecret: import.meta.env.VITE_OIDC_CLIENT_SECRET || undefined,
  __unsafe_useIdTokenAsAccessToken:
    import.meta.env.VITE_OIDC_USE_ID_TOKEN_AS_ACCESS_TOKEN === "true",
  idleSessionLifetimeInSeconds: (() => {
    const value_str = import.meta.env.VITE_OIDC_SSO_SESSION_IDLE_SECONDS;
    return value_str ? parseInt(value_str) : undefined;
  })(),
  scopes: (import.meta.env.VITE_OIDC_SCOPE || undefined)?.split(" "),
  homeUrl: import.meta.env.BASE_URL,
  /**
   * This is how you define the expected claims that
   * should be present on the id_token JWT.
   *
   * You can also write:
   * ```
   * const DecodedIdToken = z.object({ sub: z.string(), name: z.string() });
   *
   * decodedIdTokenSchema: { parse: decodedIdToken_original => DecodedIdToken.parse(decodedIdToken_original) }
   * ```
   */
  decodedIdTokenSchema: z.object({
    sub: z.string(),
    name: z.string(),
    email: z.string().email().optional(),
    preferred_username: z.string().optional(),
  }),

  // This parameter is optional.
  // It allows you to pass extra query params before redirecting to the OIDC server.
  extraQueryParams: ({ isSilent }) => ({
    audience: import.meta.env.VITE_OIDC_AUDIENCE || undefined,
    ui_locales: isSilent ? undefined : "en", // Here you would dynamically get the current language at the time of redirecting to the OIDC server
  }),
}));

export const fetchWithAuth: typeof fetch = async (input, init) => {
  const oidc = await getOidc();

  if (oidc.isUserLoggedIn) {
    const { accessToken } = await oidc.getTokens();

    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    (init ??= {}).headers = headers;
  }

  return fetch(input, init);
};

export const getRefreshToken = async () => {
  const oidc = await getOidc();

  if (!oidc.isUserLoggedIn) {
    throw new Error("User is not logged in");
  }

  const tokens = await oidc.getTokens();

  if (!tokens.hasRefreshToken) {
    throw new Error("No refresh token available");
  }

  return tokens.refreshToken;
};

export async function refreshGraphTokenWithRefreshToken(
  refreshToken: string,
): Promise<string> {
  const params = new URLSearchParams();
  params.append("client_id", import.meta.env.VITE_OIDC_CLIENT_ID);
  params.append("grant_type", "refresh_token");

  const scopes = [
    "https://graph.microsoft.com/User.Read",
    "https://graph.microsoft.com/User.ReadBasic.All",
    "openid",
    "profile",
    "offline_access",
  ].join(" ");

  params.append("scope", scopes);
  params.append("refresh_token", refreshToken);

  const tenantIdMatch = import.meta.env.VITE_OIDC_ISSUER_URI.match(
    /login\.microsoftonline\.com\/([a-f0-9-]+)\/v2\.0/,
  );
  if (!tenantIdMatch) {
    throw new Error("Invalid VITE_OIDC_ISSUER_URI format");
  }
  const tenantId = tenantIdMatch[1];

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to refresh token: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("No access_token in response");
  }

  return data.access_token;
}

export const fetchGraphWithAuth: typeof fetch = async (input, init) => {
  const oidc = await getOidc();

  if (oidc.isUserLoggedIn) {
    const accessToken = await refreshGraphTokenWithRefreshToken(
      await getRefreshToken(),
    );

    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    (init ??= {}).headers = headers;
  }

  return fetch(input, init);
};
