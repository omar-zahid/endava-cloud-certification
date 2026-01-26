import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "../components/Nav";

import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  shell: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    height: "100vh",
  },
  content: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
});

export const Route = createRootRoute({
  component: () => <Shell />,
});

const Shell = () => {
  const styles = useStyles();
  return (
    <div className={styles.shell}>
      <Nav />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
