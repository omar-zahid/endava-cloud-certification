import {
  Button,
  Card,
  CardFooter,
  Text,
  ToggleButton,
  makeStyles,
} from "@fluentui/react-components";
import { azureCertifications } from "../../temporary-static-data/azure-certifications";
import { awsCertifications } from "../../temporary-static-data/aws-certifications";
import { useState } from "react";
import { Certification } from "../../types/Certification";
import { VENDOR, Vendor } from "../../constants/vendor";
import { vendorConfig } from "../../constants/vendorConfig";

const useStyles = makeStyles({
  certMenuGrid: {
    display: "flex",
    justifyContent: "flex-start ",
    gap: "8px",
  },

  certListPageGrid: {
    justifyContent: "flex-start",
    margin: "auto",
    paddingTop: "40px",
  },

  certCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 320px)",
    paddingTop: "16px",
    width: "1056px",
    gap: "16px",
    justifyContent: "flex-start",
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "4px",
  },
  cardHeader: {
    minWidth: 0,
    flex: 1,
  },
  badgeImg: {
    width: "32px",
    height: "32px",
    objectFit: "contain",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.10))",
  },

  body: {
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  levelTag: {
    "& *": {
      fontSize: "10px",
      lineHeight: "12px",
      padding: "-5px 2px",
    },
  },
  externalLink: {
    marginTop: "8px",
    fontSize: "12px",
  },

  vendorText: {
    color: "grey",
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
    lineHeight: "16px",
    fontSize: "12px",
    color: "grey",
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-start",
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
        <div style={{ minWidth: 0, flex: 1 }}>
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
        <Button appearance="secondary">Link to profile</Button>
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
    <div className={styles.certListPageGrid}>
      <h1>Browse certifications</h1>
      <div className={styles.certMenuGrid}>
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
      </div>
      <div className={styles.certCardGrid}>
        {certifications.map((cert) => (
          <CertCard key={cert.externalLink || cert.name} cert={cert} />
        ))}
      </div>
    </div>
  );
}
