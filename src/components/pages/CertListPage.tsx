import {
  Button,
  Card,
  CardFooter,
  Text,
  ToggleButton,
  makeStyles,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";
import { azureCertifications } from "../../temporary-static-data/azure-certifications";
import { awsCertifications } from "../../temporary-static-data/aws-certifications";
import { useState } from "react";
import { Certification } from "../../types/Certification";
import { VENDOR, Vendor } from "../../constants/vendor";
import { vendorConfig } from "../../constants/vendorConfig";

const useStyles = makeStyles({
  page: {
    paddingTop: tokens.spacingVerticalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    maxWidth: "1100px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    ...typographyStyles.title2,
    marginTop: 0,
    marginRight: 0,
    marginBottom: tokens.spacingVerticalXL,
    marginLeft: 0,
  },

  certMenu: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },

  certCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalL,
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingVerticalS,
  },
  badgeImg: {
    width: "32px",
    height: "32px",
    objectFit: "contain",
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  },

  vendorText: {
    color: tokens.colorNeutralForeground3,
  },

  truncate: {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  descriptionBox: {
    height: "60px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  },
  descriptionText: {
    ...typographyStyles.caption1,
    color: tokens.colorNeutralForeground3,
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  cardHeaderWrap: {
    minWidth: 0,
    flex: 1,
  },
});

function CertCard({ cert }: { cert: Certification }) {
  const styles = useStyles();

  const vendor = vendorConfig[cert.vendor];

  return (
    <Card className={styles.card}>
      <div className={styles.cardTopRow}>
        <img
          src={vendor?.logo}
          alt={`${cert.name} badge`}
          className={styles.badgeImg}
          loading="lazy"
        />
        <div className={styles.cardHeaderWrap}>
          <Text
            weight="semibold"
            size={300}
            className={styles.truncate}
            title={cert.name}
          >
            {cert.name}
          </Text>
          <Text size={200} className={styles.vendorText}>
            {cert.vendor}
          </Text>
        </div>
      </div>

      <div className={styles.descriptionBox}>
        <Text
          size={200}
          className={styles.descriptionText}
          title={cert.description}
        >
          {cert.description}
        </Text>
      </div>
      <CardFooter className={styles.footer}>
        <Button appearance="primary">View Certificate</Button>
        <Button appearance="secondary">Apply</Button>
      </CardFooter>
    </Card>
  );
}

export function CertListPage() {
  const styles = useStyles();

  const [vendor, setVendor] = useState<Vendor | "ALL">("ALL");
  const certifications =
    vendor === "ALL"
      ? [...azureCertifications, ...awsCertifications]
      : vendor === VENDOR.AZURE
        ? azureCertifications
        : awsCertifications;
  return (
    <div className={styles.page}>
      <Text as="h1" className={styles.title}>
        Browse certifications
      </Text>
      <div className={styles.certMenu}>
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
          <CertCard key={cert.externalLink || cert.name} cert={cert} />
        ))}
      </div>
    </div>
  );
}
