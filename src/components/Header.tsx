import { useOidc } from "../oidc";
import { isKeycloak, createKeycloakUtils } from "oidc-spa/keycloak";
import {
  Avatar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  tokens,
} from "@fluentui/react-components";
import { useUserAvatar } from "../api/useUserAvatar";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: tokens.spacingVerticalM,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
  },
  authButtons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
  },
  displayName: {
    paddingLeft: tokens.spacingHorizontalL,
  },
});

export function Header() {
  const { isUserLoggedIn, initializationError } = useOidc();
  const styles = useStyles();

  return (
    <div className={styles.header}>
      {/* You do not have to display an error here, it's just to show that if you want you can
                But it's best to enable the user to navigate unauthenticated and to display an error
                only if he attempt to login (by default it display an alert) */}
      {initializationError !== undefined && (
        <Text className={styles.errorText}>
          {initializationError.isAuthServerLikelyDown
            ? "Sorry our Auth server is down"
            : `Initialization error: ${initializationError.message}`}
        </Text>
      )}

      <div></div>

      {isUserLoggedIn ? <LoggedInAuthButton /> : <NotLoggedInAuthButton />}
    </div>
  );
}

function LoggedInAuthButton() {
  const { decodedIdToken, logout } = useOidc({ assert: "user logged in" });
  const { data: avatar } = useUserAvatar();
  const styles = useStyles();

  return (
    <div>
      <Menu>
        <MenuTrigger>
          <Button appearance="transparent">
            {typeof avatar === "string" ? (
              <Avatar image={{ src: avatar }} name={decodedIdToken.name} />
            ) : (
              <Avatar name={decodedIdToken.name} />
            )}
            <span className={styles.displayName}>{decodedIdToken.name}</span>
          </Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => logout({ redirectTo: "home" })}>
              Logout
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
}

function NotLoggedInAuthButton() {
  const { login, issuerUri } = useOidc({ assert: "user not logged in" });
  const styles = useStyles();

  const keycloakUtils = isKeycloak({ issuerUri })
    ? createKeycloakUtils({ issuerUri })
    : undefined;

  const isAuth0 = issuerUri.includes("auth0");

  return (
    <div className={styles.authButtons}>
      <Button appearance="primary" onClick={() => login()}>
        Login
      </Button>
      {keycloakUtils !== undefined && (
        <Button
          appearance="secondary"
          onClick={() =>
            login({
              transformUrlBeforeRedirect:
                keycloakUtils.transformUrlBeforeRedirectForRegister,
            })
          }
        >
          Register
        </Button>
      )}
      {isAuth0 && (
        <Button
          appearance="secondary"
          onClick={() =>
            login({
              extraQueryParams: {
                screen_hint: "signup",
              },
            })
          }
        >
          Register
        </Button>
      )}
    </div>
  );
}
