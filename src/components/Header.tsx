import { useOidc } from "../oidc";
import { isKeycloak, createKeycloakUtils } from "oidc-spa/keycloak";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";

export function Header() {
  const { isUserLoggedIn, initializationError } = useOidc();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      {/* You do not have to display an error here, it's just to show that if you want you can
                But it's best to enable the user to navigate unauthenticated and to display an error
                only if he attempt to login (by default it display an alert) */}
      {initializationError !== undefined && (
        <div style={{ color: "red" }}>
          {initializationError.isAuthServerLikelyDown
            ? "Sorry our Auth server is down"
            : `Initialization error: ${initializationError.message}`}
        </div>
      )}

      <div></div>

      {isUserLoggedIn ? <LoggedInAuthButton /> : <NotLoggedInAuthButton />}
    </div>
  );
}

function LoggedInAuthButton() {
  const { decodedIdToken, logout } = useOidc({ assert: "user logged in" });

  return (
    <div>
      <Menu>
        <MenuTrigger>
          <Button appearance="transparent">
            <Avatar
              image={{ src: "/profile.jpg" }}
              name={decodedIdToken.name}
            />
            <span>{decodedIdToken.name}</span>
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
      {/* <span>Hello {decodedIdToken.name}</span>
      &nbsp; &nbsp;
      <button onClick={() => logout({ redirectTo: "home" })}>Logout</button> */}
    </div>
  );
}

function NotLoggedInAuthButton() {
  const {
    login,
    params: { issuerUri },
  } = useOidc({ assert: "user not logged in" });

  const keycloakUtils = isKeycloak({ issuerUri })
    ? createKeycloakUtils({ issuerUri })
    : undefined;

  const isAuth0 = issuerUri.includes("auth0");

  return (
    <div>
      <button onClick={() => login()}>Login</button>{" "}
      {keycloakUtils !== undefined && (
        <button
          onClick={() =>
            login({
              transformUrlBeforeRedirect:
                keycloakUtils.transformUrlBeforeRedirectForRegister,
            })
          }
        >
          Register
        </button>
      )}
      {isAuth0 && (
        <button
          onClick={() =>
            login({
              extraQueryParams: {
                screen_hint: "signup",
              },
            })
          }
        >
          Register
        </button>
      )}
    </div>
  );
}
