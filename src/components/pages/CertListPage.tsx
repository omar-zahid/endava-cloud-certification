import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Link,
  Tag,
  Text,
  ToggleButton,
  makeStyles,
} from "@fluentui/react-components";
import { azureCertifications } from "../../temporary-static-data/azure-certifications";
import { awsCertifications } from "../../temporary-static-data/aws-certifications";
import { useState } from "react";
import { Certification } from "../../types/Certification";
import { VENDOR, Vendor } from "../../constants/vendor";

const useStyles = makeStyles({
  certListPageGrid: {
    maxWidth: "1000px",
    justifyContent: "flex-start",
    margin: "auto",
    paddingTop: "40px",
  },
  certMenuGrid: {
    display: "flex",
    justifyContent: "flex-start ",
    gap: "8px",
  },

  certCardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 220px)",
    gap: "20px",
    padding: "16px",
    maxWidth: "1000px",
    justifyItems: "center",
    width: "100%",
    justifySelf: "center",
    justifyContent: "flex-start",
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "220px",

    backgroundColor: "rgba(90, 77, 77, 0.06)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",

    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",

    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
  },

  preview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
  },

  badgeImg: {
    width: "20px",
    height: "20px",
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
  footer: {
    marginTop: "auto",
    padding: "8px 16px 16px",
    display: "flex",
    justifyContent: "flex-end",
  },
});

function CertCard({ cert }: { cert: Certification }) {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardPreview className={styles.preview}>
        <img
          src={cert.badgeUrl}
          alt={`${cert.name} badge`}
          className={styles.badgeImg}
          loading="lazy"
        />
      </CardPreview>

      <Tag className={styles.levelTag} appearance="brand" color="red">
        {cert.level}
      </Tag>

      <CardHeader
        header={
          <Text weight="semibold" size={400}>
            {cert.name}
          </Text>
        }
        description={
          <Link
            className={styles.externalLink}
            href={cert.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            appearance="subtle"
          >
            Learn more
          </Link>
        }
      />
      <CardFooter className={styles.footer}>
        <Button
          appearance="primary"
          onClick={() => console.log("call form display")}
        >
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CertListPage() {
  const styles = useStyles();

  const [vendor, setVendor] = useState<Vendor>(VENDOR.AZURE);

  const certifications =
    vendor === VENDOR.AZURE ? azureCertifications : awsCertifications;

  return (
    <div className={styles.certListPageGrid}>
      <h1>Hello, Aisha.</h1>
      <h2>Let&apos;s get you certified.</h2>
      <div className={styles.certMenuGrid}>
        <div className={styles.certMenuGrid}>
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
