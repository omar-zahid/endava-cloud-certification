import { makeStyles, tokens } from "@fluentui/react-components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: CertListPage,
});

export function CertListPage() {
  const styles = useStyles();

  return (
    <>
      <div className={styles.container}>Certificates:::</div>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalXL,
  },
});
