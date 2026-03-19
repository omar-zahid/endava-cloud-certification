import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  JSXElement,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { AddStarburstFilled, CheckmarkStarburstFilled } from "@fluentui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { enforceLogin } from "@/oidc";
import { createFileRoute } from "@tanstack/react-router";
import { certificateByIdQueryOptions } from "@/api/useCertificate";
import { Header } from "@/components/header/Header";
import { UserDataGrid } from "@/components/certifiedUser/UserDataGrid";
import { Grid20Regular } from "node_modules/@fluentui/react-icons/lib/fonts/sizedIcons/chunk-20";
import { ListBar20Regular } from "node_modules/@fluentui/react-icons/lib/fonts/sizedIcons/chunk-32";
import { UserCard } from "@/components/certifiedUser/UserCard";
import { useState } from "react";

/* ==== Dummy data - to be replaced when BE is ready ==== */
export type Item = {
  name: string;
  role: string;
  email: string;
  certificateValidity: {
    isExpired: boolean;
    icon: JSXElement;
    url: string;
  };
};

const items: Item[] = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    email: "alice.johnson@endava.com",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Bob Smith",
    role: "Backend Developer",
    email: "bob.smith@endava.com",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer",
    email: "charlie.brown@endava.com",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "David Wilson",
    role: "DevOps Engineer",
    email: "david.wilson@endava.com",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Eve Adams",
    role: "AI Engineer",
    email: "eve.adams@endava.com",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Frank Miller",
    role: "Solutions Architect",
    email: "frank.miller@endava.com",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Grace Lee",
    role: "Machine Learning Engineer",
    email: "grace.lee@endava.com",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Henry Thompson",
    role: "Senior Developer",
    email: "henry.thompson@endava.com",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-developer-associate/" },
  },
];
/* ==== End of dummy data ==== */

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
  const [isCardMode, setIsCardMode] = useState(true);

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

      <div>
        <div className={styles.viewModeRoot}>
          <div className={styles.viewModeTitle}>
            <Text size={600} weight="semibold">
              Certified Users
            </Text>
          </div>
          <div className={styles.viewModeToggle}>
            <Button icon={<Grid20Regular />} onClick={() => setIsCardMode(true)} className={isCardMode ? styles.activeViewModeButton : undefined} />
            <Button icon={<ListBar20Regular />} onClick={() => setIsCardMode(false)} className={!isCardMode ? styles.activeViewModeButton : undefined} />
          </div>
        </div>
        {isCardMode ? <UserCard items={items} /> : <UserDataGrid items={items} />}
      </div>
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
  viewModeRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  viewModeTitle: {
    flex: 1,
  },
  viewModeToggle: {
    display: "flex",
    flex: 0,
    columnGap: tokens.spacingVerticalS,
    "& Button": {
      fontWeight: "var(--fontWeightRegular)",
    },
  },
  activeViewModeButton: {
    color: tokens.colorBrandForeground2,
    backgroundColor: "rgba(255, 86, 64, 0.15)",
    border: `1px solid ${tokens.colorBrandForeground2}`,
    "&:hover": {
      color: tokens.colorBrandForeground2,
      backgroundColor: "rgba(255, 86, 64, 0.15)",
      border: `1px solid ${tokens.colorBrandForeground2}`,
    },
  },
});
