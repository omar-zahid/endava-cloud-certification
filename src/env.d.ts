/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OIDC_ISSUER_URI: string;
  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_OIDC_GRAPH_CLIENT_ID: string;
  readonly VITE_OIDC_SCOPE: string;
  readonly VITE_API_URL: string;
  readonly VITE_OIDC_USE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
