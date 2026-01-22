import { useOidc, enforceLogin, getOidc } from "../oidc";
import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { decodeJwt } from "oidc-spa/tools/decodeJwt";
import { isKeycloak, createKeycloakUtils } from "oidc-spa/keycloak";
import {
  Button,
  Link,
  Text,
  makeStyles,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";

export const Route = createFileRoute("/protected")({
  component: ProtectedPage,
  beforeLoad: async (params) => {
    await enforceLogin(params);
    // If this line is reached, the user is logged in.
  },
});

const useStyles = makeStyles({
  page: {
    paddingTop: tokens.spacingVerticalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
  },
  title: {
    ...typographyStyles.subtitle1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: tokens.spacingVerticalM,
    marginLeft: 0,
  },
  codeTitle: {
    ...typographyStyles.body1Strong,
    marginTop: tokens.spacingVerticalL,
    marginRight: 0,
    marginBottom: tokens.spacingVerticalS,
    marginLeft: 0,
  },
  pre: {
    textAlign: "left",
    paddingTop: tokens.spacingVerticalS,
    paddingRight: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    overflowX: "auto",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
});

function ProtectedPage() {
  // Here we can safely assume that the user is logged in.
  const {
    decodedIdToken,
    goToAuthServer,
    backFromAuthServer,
    renewTokens,
    params: { issuerUri, clientId },
  } = useOidc({
    assert: "user logged in",
  });

  const keycloakUtils = isKeycloak({ issuerUri })
    ? createKeycloakUtils({ issuerUri })
    : undefined;

  const { decodedAccessToken } = useDecodedAccessToken_DIAGNOSTIC_ONLY();
  const styles = useStyles();

  if (decodedAccessToken === undefined) {
    // Loading...
    return null;
  }

  return (
    <div className={styles.page}>
      <Text as="h2" className={styles.title}>
        Hello {decodedIdToken.name}
      </Text>

      <div className={styles.stack}>
        {decodedAccessToken !== null ? (
          <>
            <Text className={styles.codeTitle}>Decoded Access Token</Text>
            <pre className={styles.pre}>
              {JSON.stringify(decodedAccessToken, null, 2)}
            </pre>
          </>
        ) : (
          <Text>The Access Token issued by the IDP is opaque (Not a JWT).</Text>
        )}

        <div className={styles.actions}>
          <Button appearance="primary" onClick={() => renewTokens()}>
            Renew tokens
          </Button>

          {keycloakUtils !== undefined && (
            <>
              <Button
                appearance="secondary"
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: { kc_action: "UPDATE_PASSWORD" },
                  })
                }
              >
                Change password
              </Button>

              <Button
                appearance="secondary"
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: { kc_action: "UPDATE_PROFILE" },
                  })
                }
              >
                Update profile
              </Button>

              <Button
                appearance="secondary"
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: { kc_action: "delete_account" },
                  })
                }
              >
                Delete account
              </Button>
            </>
          )}
        </div>

        {keycloakUtils !== undefined &&
          backFromAuthServer?.extraQueryParams.kc_action ===
            "UPDATE_PASSWORD" && (
            <Text>Result: {backFromAuthServer.result.kc_action_status}</Text>
          )}

        {keycloakUtils !== undefined &&
          backFromAuthServer?.extraQueryParams.kc_action ===
            "UPDATE_PROFILE" && (
            <Text>Result: {backFromAuthServer.result.kc_action_status}</Text>
          )}

        {keycloakUtils !== undefined && (
          <Link
            href={keycloakUtils.getAccountUrl({
              clientId,
              backToAppFromAccountUrl: import.meta.env.BASE_URL,
            })}
          >
            Go to Keycloak Account Management Console
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * DIAGNOSTIC ONLY
 *
 * In real applications you should not read, display, or depend on any fields
 * from the access token. Treat it as an opaque string and use it only as:
 *
 *   Authorization: Bearer <token>
 *
 * If you need user information, use decodedIdToken or fetch it from your backend.
 * Please read the documentation or ask on our Discord if you are unsure.
 * Do not copy this pattern into production code.
 */
function useDecodedAccessToken_DIAGNOSTIC_ONLY() {
  const [decodedAccessToken, setDecodedAccessToken] = useState<
    | Record<string, unknown>
    | null /* Opaque, not a JWT */
    | undefined /* Loading */
  >(undefined);

  useEffect(() => {
    let cleanup: (() => void) | undefined = undefined;
    let isActive = true;

    (async () => {
      const oidc = await getOidc();

      if (!isActive) {
        return;
      }

      if (!oidc.isUserLoggedIn) {
        throw new Error("Assertion error");
      }

      const update = (accessToken: string) => {
        let decodedAccessToken: Record<string, unknown> | null;

        try {
          decodedAccessToken = decodeJwt(accessToken);
        } catch {
          decodedAccessToken = null;
        }

        setDecodedAccessToken(decodedAccessToken);
      };

      const { unsubscribe } = oidc.subscribeToTokensChange((tokens) =>
        update(tokens.accessToken),
      );

      cleanup = () => {
        unsubscribe();
      };

      {
        const { accessToken } = await oidc.getTokens();

        if (!isActive) {
          return;
        }

        update(accessToken);
      }
    })();

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, []);

  return { decodedAccessToken };
}
