import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
} from "@fluentui/react-components";
import {
  Certificate24Color,
  Certificate20Regular,
} from "@fluentui/react-icons";

export function Nav() {
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
        <NavItem
          href={linkDestination}
          icon={<Certificate20Regular />}
          value="1"
        >
          Certifications
        </NavItem>
      </NavDrawerBody>
    </NavDrawer>
  );
}
