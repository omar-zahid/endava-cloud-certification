import {
  Button,
  Card,
  CardFooter,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { useNavigate } from "@tanstack/react-router";
import { Certificate } from "@/models/CertificationModel";

import azureLogo from "@/assets/endava_symbol_RGB.svg";
import awsLogo from "@/assets/endava_symbol_RGB.svg";
import endavaLogo from "@/assets/endava_symbol_RGB.svg";

export function CertificateCard(certificate: Certificate) {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={styles.card}>
      <div className={styles.cardTopRow}>
        <img
          src={getVendorLogo(certificate.vendor)}
          alt={`${certificate.vendor} logo`}
          className={styles.badgeImg}
          loading="lazy"
        />
        <div className={styles.cardHeader}>
          <Text
            weight="semibold"
            size={300}
            className={styles.truncate}
            title={certificate.name}
          >
            {certificate.name}
          </Text>
          <Text size={200} className={styles.vendorText}>
            {certificate.vendor}
          </Text>
        </div>
      </div>

      <div className={styles.descriptionBox}>
        <Text
          size={200}
          className={styles.descriptionText}
          title={certificate.description}
        >
          {certificate.description}
        </Text>
      </div>
      <CardFooter className={styles.footer}>
        <Button
          appearance="primary"
          onClick={() =>
            navigate({
              to: "/certificate/$id",
              params: { id: certificate.id },
            })
          }
        >
          View Certificate
        </Button>
      </CardFooter>
    </Card>
  );
}

const getVendorLogo = (vendor: string) => {
  switch (vendor) {
    case "Azure":
      return azureLogo;
    case "AWS":
      return awsLogo;
    default:
      return endavaLogo;
  }
};

const useStyles = makeStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "300px",
  },
  cardTopRow: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
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
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-start",
    columnGap: tokens.spacingHorizontalS,
  },
});
