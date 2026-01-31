import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/oidc";
import { Certificate } from "@/models/CertificationModel";

async function fetchCertificates(): Promise<Certificate[]> {
  const res = await fetchWithAuth("certificates");
  if (!res.ok) {
    throw new Error("Failed to fetch certificates");
  }
  return res.json();
}

export const certificatesQueryOptions = queryOptions({
  queryKey: ["certificates"],
  queryFn: () => fetchCertificates(),
});

export function useCertificate() {
  return useQuery(certificatesQueryOptions);
}
