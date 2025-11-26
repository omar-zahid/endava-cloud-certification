import { createLazyFileRoute } from "@tanstack/react-router";
import { useOidc } from "../oidc";

export const Route = createLazyFileRoute("/protected2")({
  component: Page,
});

function Page() {
  const { decodedIdToken } = useOidc({ assert: "user logged in" });

  const showContent = false;

  //TODO: check if we need to display anything
  return (
    <>
      {showContent ? (
        <h3>
          Hello {decodedIdToken.name}, this is a lazy route where authentication
          is enforced (in ./protected.tsx)
        </h3>
      ) : null}
    </>
  );
}
