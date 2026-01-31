import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { enforceLogin } from "@/oidc";
import { createFileRoute } from "@tanstack/react-router";
import { certificateByIdQueryOptions } from "@/api/useCertificate";

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
      <Text size={600} weight="semibold" className={styles.title}>
        {data.name}
      </Text>
      <Text size={300} className={styles.description}>
        {data.description}
      </Text>
    </>
  );
}

const useStyles = makeStyles({
  title: {
    marginBottom: tokens.spacingVerticalS,
  },
  description: {
    color: tokens.colorNeutralForeground2,
  },
});
