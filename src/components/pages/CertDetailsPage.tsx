import {
  Button,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { Certification } from "../../types/Certification";
import { vendorConfig } from "../../constants/vendorConfig";
import { useOidc } from "../../oidc";
import { useMemo, useState } from "react";
import { Loading } from "../Loading";
import bannerBg from "../../assets/cert_details_page_background.svg";

const useStyles = makeStyles({
  page: {
    paddingBottom: tokens.spacingVerticalXL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    alignItems: "center",
  },
  contentWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    boxSizing: "border-box",
    "@media (max-width: 640px)": {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
    },
  },
  bannerWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    maxWidth: "100%",
    minHeight: "300px",
    height: "auto",
    backgroundImage: `url(${bannerBg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
    display: "flex",
    alignItems: "stretch",
  },
  bannerContent: {
    width: "50%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    "@media (max-width: 640px)": {
      width: "100%",
      paddingTop: tokens.spacingVerticalL,
      paddingBottom: tokens.spacingVerticalL,
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
      rowGap: tokens.spacingVerticalXXS,
    },
  },
  bannerBadge: {
    width: "56px",
    height: "56px",
    objectFit: "contain",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.10))",
  },
  bannerKicker: {
    marginTop: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  bannerTitle: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
    lineHeight: tokens.lineHeightBase600,
  },
  bannerDescription: {
    color: tokens.colorNeutralForeground2,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    "@media (max-width: 640px)": {
      WebkitLineClamp: 5,
    },
  },
  detailsSection: {
    width: "100%",
    maxWidth: "1252px",
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
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
    "@media (max-width: 640px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
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
    flexWrap: "wrap",
    rowGap: tokens.spacingVerticalS,
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

      <div className={styles.bannerWrap}>
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <img
              src={cert.badgeUrl}
              alt={`${cert.name} badge`}
              className={styles.bannerBadge}
              loading="lazy"
              onLoad={markImageDone}
              onError={markImageDone}
            />

            <Text size={200} weight="semibold" className={styles.bannerKicker}>
              Certification
            </Text>

            <Text as="h2" size={600} weight="semibold" className={styles.bannerTitle}>
              {cert.name}
            </Text>

            <Text size={300} className={styles.bannerDescription}>
              {cert.description}
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.contentWrap}>
        <div className={styles.detailsSection}>

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
        </div>
      </div>
    </div>
  );
}
