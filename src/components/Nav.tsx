import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
} from "@fluentui/react-components";
import { Certificate20Regular, Shield20Regular } from "@fluentui/react-icons";
import { linkOptions, useNavigate } from "@tanstack/react-router";
import logo from "../../src/assets/endava_symbol_RGB.svg";

export function Nav() {
  const navigate = useNavigate();

  const routes = linkOptions([
    {
      id: "1",
      to: "/",
      label: "Certificates",
      icon: <Certificate20Regular />,
    },
    {
      id: "2",
      to: "/protected",
      label: "Protected",
      icon: <Shield20Regular />,
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
        <AppItem icon={<img style={{ width: 20, height: 20 }} src={logo} />}>
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
    </NavDrawer>
  );
}
