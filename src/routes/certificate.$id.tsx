import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CertDetailsPage } from "../components/pages/CertDetailsPage";
import { VENDOR, Vendor } from "../constants/vendor";
import { awsCertifications } from "../temporary-static-data/aws-certifications";
import { azureCertifications } from "../temporary-static-data/azure-certifications";
import { certToSlug } from "../utils/certSlug";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/certificate/$id")({
  validateSearch: z.object({
    vendor: z.enum(["ALL", VENDOR.AZURE, VENDOR.AWS]).optional(),
  }),
  component: CertDetailsRoute,
});

function normalizeVendorFilter(v: unknown): Vendor | "ALL" {
  if (v === VENDOR.AZURE || v === VENDOR.AWS || v === "ALL") return v;
  return "ALL";
}

function CertDetailsRoute() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const search = Route.useSearch();

  const vendorFilter = normalizeVendorFilter(search.vendor);

  const allCerts = useMemo(
    () => [...azureCertifications, ...awsCertifications],
    [],
  );

  const cert = useMemo(
    () => allCerts.find((c) => certToSlug(c) === id),
    [allCerts, id],
  );

  const goBack = () => navigate({ to: "/", search: { vendor: vendorFilter } });

  useEffect(() => {
    if (cert) return;
    navigate({
      to: "/",
      search: { vendor: vendorFilter, notFound: true },
      replace: true,
    });
  }, [cert, navigate, vendorFilter]);

  if (!cert) return null;

  return <CertDetailsPage cert={cert} onBack={goBack} />;
}
