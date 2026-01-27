import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CertDetailsPage } from "../components/pages/CertDetailsPage";
import { awsCertifications } from "../temporary-static-data/aws-certifications";
import { azureCertifications } from "../temporary-static-data/azure-certifications";
import { certToSlug } from "../utils/certSlug";
import { useEffect, useMemo } from "react";

export const Route = createFileRoute("/certificate/$id")({
  component: CertDetailsRoute,
});

function CertDetailsRoute() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const allCerts = useMemo(
    () => [...azureCertifications, ...awsCertifications],
    [],
  );

  const cert = useMemo(
    () => allCerts.find((c) => certToSlug(c) === id),
    [allCerts, id],
  );

  useEffect(() => {
    if (cert) return;
    navigate({
      to: "/",
      search: { notFound: true },
      replace: true,
    });
  }, [cert, navigate]);

  if (!cert) return null;

  return <CertDetailsPage cert={cert} />;
}
