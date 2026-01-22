import { useOidc } from "../oidc";
import {
  Avatar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  NavItem,
  tokens,
} from "@fluentui/react-components";
import { useUserAvatar } from "../api/useUserAvatar";
import { PersonKey20Color } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  displayName: {
    textAlign: "left",
  },
});

export function Profile() {
  const { isUserLoggedIn } = useOidc();

  return (
    <>{isUserLoggedIn ? <LoggedInAuthButton /> : <NotLoggedInAuthButton />}</>
  );
}

function LoggedInAuthButton() {
  const { decodedIdToken, logout } = useOidc({ assert: "user logged in" });
  const { data: avatar } = useUserAvatar();
  const styles = useStyles();

  return (
    <Menu positioning={{ autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <Button appearance="transparent" className={styles.container}>
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
  );
}

function NotLoggedInAuthButton() {
  const { login } = useOidc({ assert: "user not logged in" });

  return (
    <NavItem
      value=""
      as="button"
      onClick={() => login()}
      icon={<PersonKey20Color />}
    >
      Login
    </NavItem>
  );
}
