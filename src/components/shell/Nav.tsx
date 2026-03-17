import {
  AppItem,
  makeStyles,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavDrawerFooter,
} from "@fluentui/react-components";
import { Certificate20Regular, Shield20Regular } from "@fluentui/react-icons";
import { linkOptions, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/endava_symbol_RGB.svg";
import { Profile } from "./Profile";
import { Home20Regular } from "node_modules/@fluentui/react-icons/lib/fonts/sizedIcons/chunk-20";

const useStyles = makeStyles({
  brandIcon: {
    width: "20px",
    height: "20px",
  },
});

export function Nav() {
  const navigate = useNavigate();
  const styles = useStyles();

  const routes = linkOptions([
    {
      id: "1",
      to: "/",
      label: "Home",
      icon: <Home20Regular />,
    },
    {
      id: "2",
      to: "/protected",
      label: "Protected",
      icon: <Shield20Regular />,
    },
    {
      id: "3",
      to: "/my-certifications",
      label: "My Certifications",
      icon: <Certificate20Regular />,
    },
  ]);
  return (
    <NavDrawer
      open={true}
      defaultSelectedValue="1"
      defaultSelectedCategoryValue=""
      type="inline"
    >
      <NavDrawerBody>
        <AppItem icon={<img className={styles.brandIcon} src={logo} />}>
          Endava Cloud Certification
        </AppItem>
        {routes.map((route) => {
          return (
            <NavItem
              onClick={() => navigate({ to: route.to })}
              key={route.id}
              icon={route.icon}
              value={route.id}
            >
              {route.label}
            </NavItem>
          );
        })}
      </NavDrawerBody>
      <NavDrawerFooter>
        <Profile />
      </NavDrawerFooter>
    </NavDrawer>
  );
}
