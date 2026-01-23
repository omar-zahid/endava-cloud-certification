import {
  Button,
  Card,
  CardFooter,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Certification } from "../../types/Certification";
import { vendorConfig } from "../../constants/vendorConfig";

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

export function CertCard({ cert }: { cert: Certification }) {
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
        <div className={styles.cardHeader}>
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
