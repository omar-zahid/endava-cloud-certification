import {
  Button,
  Card,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { Certification } from "../../types/Certification";
import { vendorConfig } from "../../constants/vendorConfig";
import { useOidc } from "../../oidc";
import { useMemo, useState } from "react";
import { Loading } from "../Loading";

const useStyles = makeStyles({
  page: {
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    maxWidth: "900px",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: tokens.spacingHorizontalM,
  },
  card: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  badgeWrap: {
    width: "72px",
    height: "72px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    flex: "0 0 auto",
  },
  badgeImg: {
    width: "56px",
    height: "56px",
    objectFit: "contain",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.10))",
  },
  titleBlock: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXXS,
  },
  subtitleText: {
    color: tokens.colorNeutralForeground3,
  },
  descriptionBlock: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXS,
  },
  sectionLabel: {
    color: tokens.colorNeutralForeground3,
  },
  vendorValue: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
  },
  vendorLogo: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
  vendorText: {
    color: tokens.colorNeutralForeground3,
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXXS,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    transitionProperty: "transform, box-shadow, border-color",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease-out",
    selectors: {
      ":hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        border: `1px solid ${tokens.colorNeutralStroke1}`,
      },
    },
  },
  metaLabel: {
    color: tokens.colorNeutralForeground3,
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-start",
    columnGap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
  },
});

export function CertDetailsPage({
  cert,
}: {
  cert: Certification;
}) {
  const styles = useStyles();
  const vendor = vendorConfig[cert.vendor];
  const { isUserLoggedIn } = useOidc();

  const requiredImages = useMemo(() => 1 + (vendor?.logo ? 1 : 0), [vendor]);
  const [loadedCount, setLoadedCount] = useState(0);
  const isLoading = loadedCount < requiredImages;

  const markImageDone = () => setLoadedCount((c) => Math.min(requiredImages, c + 1));

  return (
    <div className={styles.page}>
      <Loading active={isLoading} message="Loading certificate…" />

      <div className={styles.headerRow}>
        <Text as="h2" size={500} weight="semibold">
          Certificate details
        </Text>
      </div>

      <Card className={styles.card}>
        <div className={styles.titleRow}>
          <div className={styles.badgeWrap}>
            <img
              src={cert.badgeUrl}
              alt={`${cert.name} badge`}
              className={styles.badgeImg}
              loading="lazy"
              onLoad={markImageDone}
              onError={markImageDone}
            />
          </div>

          <div className={styles.titleBlock}>
            <Text as="h3" size={500} weight="semibold">
              {cert.name}
            </Text>
          </div>
        </div>

        <div className={styles.descriptionBlock}>
          <Text size={200} weight="bold" className={styles.sectionLabel}>
            Description
          </Text>
          <Text size={300}>{cert.description}</Text>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <Text size={200} weight="bold" className={styles.metaLabel}>
              Vendor
            </Text>
            <div className={styles.vendorValue}>
              {vendor?.logo ? (
                <img
                  src={`/${vendor.logo}`}
                  alt={`${cert.vendor} logo`}
                  className={styles.vendorLogo}
                  loading="lazy"
                  onLoad={markImageDone}
                  onError={markImageDone}
                />
              ) : null}
              <Text size={300}>{cert.vendor}</Text>
            </div>
          </div>

          <div className={styles.metaItem}>
            <Text size={200} weight="bold" className={styles.metaLabel}>
              Level
            </Text>
            <Text size={300}>{cert.level || "—"}</Text>
          </div>
          <div className={styles.metaItem}>
            <Text size={200} weight="bold" className={styles.metaLabel}>
              Role
            </Text>
            <Text size={300}>{cert.role || "—"}</Text>
          </div>
          <div className={styles.metaItem}>
            <Text size={200} weight="bold" className={styles.metaLabel}>
              Subject
            </Text>
            <Text size={300}>{cert.subject || "—"}</Text>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <Button
            appearance="primary"
            as="a"
            href={cert.externalLink}
            target="_blank"
            rel="noreferrer"
          >
            Open official page
          </Button>
          {isUserLoggedIn ? <Button appearance="secondary">Apply</Button> : null}
        </div>
      </Card>
    </div>
  );
}
