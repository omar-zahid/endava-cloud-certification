import { createLazyFileRoute } from "@tanstack/react-router";
import { useOidc, fetchUserAvatar } from "../oidc";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/protected2")({
  component: Page,
});

function Page() {
  const { decodedIdToken } = useOidc({ assert: "user logged in" });

  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const photoUrl = await fetchUserAvatar();
      setSrc(photoUrl);
    })();
  }, []);

  return (
    <>
      <h3>
        Hello {decodedIdToken.name}, this is a lazy route where authentication
        is enforced (in ./protected.tsx)
      </h3>
      <img
        src={src ?? "/default-avatar.png"}
        alt="User avatar"
        style={{ width: 200, height: 200, borderRadius: "50%" }}
      />
    </>
  );
}
