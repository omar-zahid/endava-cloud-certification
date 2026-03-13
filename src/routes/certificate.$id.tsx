import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { AddStarburstFilled, OpenRegular } from "@fluentui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { enforceLogin } from "@/oidc";
import { createFileRoute } from "@tanstack/react-router";
import { certificateByIdQueryOptions } from "@/api/useCertificate";
import { Header } from "@/components/header/Header";

export const Route = createFileRoute("/certificate/$id")({
  component: CertificateDetail,
  beforeLoad: async (params) => {
    await enforceLogin(params);
  },
});

export function CertificateDetail() {
  const styles = useStyles();
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(certificateByIdQueryOptions(id));

  return (
    <>
      <Header
        className={styles.header}
        title={data.name}
        description={data.description}
        action={
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" icon={<AddStarburstFilled />}>
                I have this certificate
              </Button>
            </DialogTrigger>

            <DialogSurface>
              <DialogBody>
                <DialogTitle>Certificate Dialog (Dummy)</DialogTitle>
                <DialogContent>
                  This is a placeholder dialog. Ihsan can take over this piece of development.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        }
      />

      <section className={styles.infoContainer}>
        <div className={styles.fieldsWrapper}>
          <div className={styles.fieldsGrid}>
            <div className={styles.fieldItem}>
              <Text weight="semibold" size={200} className={styles.fieldLabel}>
                Category
              </Text>
              <Text size={400} weight="medium" className={styles.fieldValueWrap}>
                Certificate
              </Text>
            </div>

            <div className={styles.fieldItem}>
              <Text weight="semibold" size={200} className={styles.fieldLabel}>
                Vendor
              </Text>
              <Text size={400} weight="medium" className={styles.fieldValueWrap}>
                {data.vendor}
              </Text>
            </div>

            <div className={styles.fieldItem}>
              <Text weight="semibold" size={200} className={styles.fieldLabel}>
                Subject
              </Text>
              <Text size={400} weight="medium" className={styles.fieldValueWrap}>
                {data.subject}
              </Text>
            </div>

            <div className={styles.fieldItem}>
              <Text weight="semibold" size={200} className={styles.fieldLabel}>
                Level
              </Text>
              <Text size={400} weight="medium" className={styles.fieldValueWrap}>
                {data.level}
              </Text>
            </div>

            <div className={styles.fieldItem}>
              <Text weight="semibold" size={200} className={styles.fieldLabel}>
                Role
              </Text>
              <Text size={400} weight="medium" className={styles.fieldValueWrap}>
                {data.role}
              </Text>
            </div>
          </div>

          <div className={styles.separator} />

          <div className={styles.badgeFieldItem}>
            <Text weight="semibold" size={200} className={styles.fieldLabel}>
              Badge
            </Text>
            <div className={styles.badgeImageFrame}>
              <img
                src={data.badgeUrl}
                alt={`${data.name} badge`}
                className={styles.badgeImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <Button
            as="a"
            href={data.externalLink}
            target="_blank"
            rel="noreferrer"
            appearance="primary"
            icon={<OpenRegular />}
            className={styles.externalLinkButton}
          >
            View Certificate
          </Button>
        </div>
      </section>
    </>
  );
}

const useStyles = makeStyles({
  header: {
    marginBottom: tokens.spacingVerticalM,
  },
  infoContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "min(1100px, 100%)",
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    boxSizing: "border-box",
    "@media (max-width: 920px)": {
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    },
  },
  fieldsWrapper: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow: tokens.shadow2,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXL,
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(240px, 1fr))",
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalXL,
    "@media (max-width: 920px)": {
      gridTemplateColumns: "1fr",
    },
  },
  separator: {
    width: "100%",
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  badgeFieldItem: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
    alignItems: "flex-start",
  },
  badgeImageFrame: {
    width: "80px",
    height: "80px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  fieldItem: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalXS,
  },
  fieldLabel: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  fieldValueWrap: {
    wordBreak: "break-word",
    color: tokens.colorNeutralForeground1,
  },
  actionsRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  externalLinkButton: {
    minWidth: "180px",
  },
});
