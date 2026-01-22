import { useQuery } from "@tanstack/react-query";
import { fetchGraphWithAuth } from "../oidc";

async function fetchUserAvatar(): Promise<string | null> {
  const res = await fetchGraphWithAuth(
    "https://graph.microsoft.com/v1.0/me/photo/$value",
  );

  if (res.ok) {
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  if (res.status === 404) {
    return null;
  }

  throw new Error(`Failed to fetch photo: ${res.status} ${res.statusText}`);
}

export function useUserAvatar() {
  return useQuery({
    queryKey: ["user-avatar"],
    queryFn: async () => {
      return fetchUserAvatar();
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}
