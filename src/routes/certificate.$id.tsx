import { makeStyles, tokens } from "@fluentui/react-components";
import { enforceLogin } from "@/oidc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/certificate/$id")({
  component: CertificateDetail,
  beforeLoad: async (params) => {
    await enforceLogin(params);
  },
});

export function CertificateDetail() {
  const styles = useStyles();

  return (
    <>
      <div className={styles.container}>Certificate Detail Page</div>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalXL,
  },
});
