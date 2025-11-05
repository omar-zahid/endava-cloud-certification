import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import "./root.css";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="shell">
      <Nav />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  ),
});
