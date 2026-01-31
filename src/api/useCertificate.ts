import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/oidc";
import { Certificate, CertificateVendor } from "@/models/CertificationModel";

type CertificatesFilter = {
  vendor?: CertificateVendor;
  role?: string;
};

async function fetchCertificates(
  filters: CertificatesFilter = {},
): Promise<Certificate[]> {
  const params = new URLSearchParams();
  if (filters.vendor) {
    params.set("vendor", filters.vendor);
  }
  if (filters.role) {
    params.set("role", filters.role);
  }

  const route = params.size
    ? `certificates?${params.toString()}`
    : "certificates";
  const res = await fetchWithAuth(route);
  if (!res.ok) {
    throw new Error("Failed to fetch certificates");
  }
  return res.json();
}

async function fetchCertificateById(id: string): Promise<Certificate> {
  const res = await fetchWithAuth(`certificates/${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch certificate");
  }
  return res.json();
}

async function fetchCertificateRoles(): Promise<string[]> {
  const res = await fetchWithAuth("certificates/roles");
  if (!res.ok) {
    throw new Error("Failed to fetch certificate roles");
  }
  return res.json();
}

export const certificatesQueryOptions = (filters: CertificatesFilter = {}) =>
  queryOptions({
    queryKey: ["certificates", filters],
    queryFn: () => fetchCertificates(filters),
  });

export const certificateByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["certificate", id],
    queryFn: () => fetchCertificateById(id),
  });

export const certificateRolesQueryOptions = () =>
  queryOptions({
    queryKey: ["certificateRoles"],
    queryFn: () => fetchCertificateRoles(),
  });

export function useCertificates(filters: CertificatesFilter = {}) {
  return useQuery(certificatesQueryOptions(filters));
}

export function useCertificateById(id: string) {
  return useQuery(certificateByIdQueryOptions(id));
}

export function useCertificateRoles() {
  return useQuery(certificateRolesQueryOptions());
}
