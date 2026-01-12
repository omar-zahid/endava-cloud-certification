import {
  AppItem,
  makeStyles,
  NavDrawer,
  NavDrawerBody,
  NavItem,
} from "@fluentui/react-components";
import { Certificate20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  brandIcon: {
    width: "20x",
    height: "20px",
  },
});

export function Nav() {
  const styles = useStyles();
  const linkDestination = "/";
  return (
    <NavDrawer
      open={true}
      defaultSelectedValue="1"
      defaultSelectedCategoryValue=""
      type="inline"
    >
      <NavDrawerBody>
        <AppItem
          icon={
            <img src="../public/favicon.ico" className={styles.brandIcon} />
          }
          href={linkDestination}
        >
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
