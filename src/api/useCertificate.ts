import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../oidc";
import { Certificate } from "../models/CertificationModel";

async function fetchCertificates(): Promise<Certificate[]> {
  const res = await fetchWithAuth("certificate");
  if (!res.ok) {
    throw new Error("Failed to fetch certificates");
  }
  return res.json();
}

export function useCertificate() {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      return fetchCertificates();
    },
  });
}
