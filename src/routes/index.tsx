import {
  makeStyles,
  Text,
  ToggleButton,
  tokens,
} from "@fluentui/react-components";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { VENDOR, Vendor } from "../constants/vendor";
import { azureCertifications } from "../temporary-static-data/azure-certifications";
import { CertCard } from "../components/pages/Card";
import { awsCertifications } from "../temporary-static-data/aws-certifications";
import { CertErrorDialog } from "../components/dialog/CertErrorDialog";
import { useState } from "react";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    notFound: z.coerce.boolean().optional(),
  }),
  component: CertListPage,
});

const useStyles = makeStyles({
  page: {
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
  },
  certMenuGrid: {
    display: "flex",
    justifyContent: "flex-start",
    columnGap: tokens.spacingHorizontalS,
  },
  certCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalL,
    maxWidth: "1056px",
    width: "100%",
    justifyContent: "flex-start",
  },
});
export function CertListPage() {
  const styles = useStyles();

  const navigate = useNavigate();
  const search = Route.useSearch();
  const notFoundOpen = Boolean(search.notFound);
  const [vendor, setVendor] = useState<Vendor | "ALL">("ALL");
  const certifications =
    vendor === "ALL"
      ? [...azureCertifications, ...awsCertifications]
      : vendor === VENDOR.AZURE
        ? azureCertifications
        : awsCertifications;
  return (
    <div className={styles.page}>
      <CertErrorDialog
        open={notFoundOpen}
        onClose={() =>
          navigate({
            to: "/",
            search: { notFound: undefined },
            replace: true,
          })
        }
      />

      <Text as="h2" size={500} weight="semibold">
        Browse certifications
      </Text>

      <div className={styles.certMenuGrid}>
        <ToggleButton
          checked={vendor === "ALL"}
          appearance={vendor === "ALL" ? "primary" : "secondary"}
          onClick={() => setVendor("ALL")}
        >
          All
        </ToggleButton>
        <ToggleButton
          checked={vendor === VENDOR.AZURE}
          appearance={vendor === VENDOR.AZURE ? "primary" : "secondary"}
          onClick={() => setVendor(VENDOR.AZURE)}
        >
          Azure
        </ToggleButton>
        <ToggleButton
          checked={vendor === VENDOR.AWS}
          appearance={vendor === VENDOR.AWS ? "primary" : "secondary"}
          onClick={() => setVendor(VENDOR.AWS)}
        >
          AWS
        </ToggleButton>
      </div>

      <div className={styles.certCardGrid}>
        {certifications.map((cert) => (
          <CertCard
            key={cert.externalLink || cert.name}
            cert={cert}
          />
        ))}
      </div>
    </div>
  );
}
