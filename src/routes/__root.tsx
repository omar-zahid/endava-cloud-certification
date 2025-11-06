import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import "./root.css";
import { Header } from "../components/Header";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  shell: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    height: "100vh",
  },
  contnet: {
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
      <div className={styles.contnet}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
