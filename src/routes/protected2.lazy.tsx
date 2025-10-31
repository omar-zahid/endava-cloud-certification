import { createLazyFileRoute } from "@tanstack/react-router";
import { useOidc } from "../oidc";
import { useUserAvatar } from "../api/useUserAvatar";

export const Route = createLazyFileRoute("/protected2")({
  component: Page,
});

function Page() {
  const { decodedIdToken } = useOidc({ assert: "user logged in" });

  const { data: photoUri, isLoading, isError } = useUserAvatar();

  return (
    <>
      <h3>
        Hello {decodedIdToken.name}, this is a lazy route where authentication
        is enforced (in ./protected.tsx)
      </h3>
      {isLoading && <div>Loading...</div>}
      {!isError && photoUri && (
        <img
          src={photoUri}
          alt="User avatar"
          style={{ width: 200, height: 200, borderRadius: "50%" }}
        />
      )}
    </>
  );
}
