import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { certificatesQueryOptions } from "@/api/useCertificate";
import { CertificateCard } from "@/components/certificate/CertificateCard";
import { queryClient } from "@/queryClient";

export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(certificatesQueryOptions()),
  errorComponent: CertListError,
  component: CertListPage,
});

export function CertListPage() {
  const styles = useStyles();
  const { data } = useSuspenseQuery(certificatesQueryOptions());

  return (
    <>
      <Text size={600} weight="semibold" className={styles.title}>
        Certificates
      </Text>
      {data.length === 0 ? (
        <Text size={300} className={styles.emptyText}>
          No certificates available yet.
        </Text>
      ) : null}
      <div className={styles.grid}>
        {data.map((certificate) => (
          <CertificateCard key={certificate.id} {...certificate} />
        ))}
      </div>
    </>
  );
}

function CertListError({ error }: { error: unknown }) {
  const styles = useStyles();
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load certificates.";

  return (
    <Text role="alert" size={300} className={styles.errorText}>
      {errorMessage}
    </Text>
  );
}

const useStyles = makeStyles({
  title: {
    marginBottom: tokens.spacingVerticalM,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 300px))",
    gap: tokens.spacingHorizontalM,
    alignItems: "stretch",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  emptyText: {
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalS,
  },
});
