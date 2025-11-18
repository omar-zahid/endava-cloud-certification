import {
  AppItem,
  Avatar,
  Body1,
  makeStyles,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavItem,
  tokens,
} from "@fluentui/react-components";
import {
  Certificate24Color,
  Certificate20Regular
} from "@fluentui/react-icons";

import { useUserAvatar } from "../api/useUserAvatar";
import { useOidc } from "../oidc";

const useStyles = makeStyles({
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: tokens.spacingVerticalL,
  },
});

export function Nav() {
  const { decodedIdToken } = useOidc();
  const { data: photoUri, isError } = useUserAvatar();
  const styles = useStyles();
  const linkDestination = "";
  return (
    <NavDrawer
      open={true}
      defaultSelectedValue="1"
      defaultSelectedCategoryValue=""
      type="inline"
    >
      <NavDrawerBody>
        <AppItem icon={<Certificate24Color />} as="a" href={linkDestination}>
          Endava Cloud Certification
        </AppItem>
        <NavItem href={linkDestination} icon={<Certificate20Regular />} value="1">
          Certifications
        </NavItem>
    

      </NavDrawerBody>
      {decodedIdToken && (
        <NavDrawerFooter>
          <div className={styles.userInfo}>
            <Avatar
              name={decodedIdToken.name}
              image={{
                src: !isError && photoUri ? photoUri : undefined,
              }}
              size={40}
            />
            <Body1>{decodedIdToken.name}</Body1>
          </div>
        </NavDrawerFooter>
      )}
    </NavDrawer>
  );
}
