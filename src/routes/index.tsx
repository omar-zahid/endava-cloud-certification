import {
  Button,
  makeStyles,
  Text,
  tokens,
  Select,
} from "@fluentui/react-components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import {
  certificateRolesQueryOptions,
  certificatesQueryOptions,
} from "@/api/useCertificate";
import { CertificateCard } from "@/components/certificate/CertificateCard";
import {
  CertificateVendor,
  CERTIFICATE_VENDORS,
} from "@/models/CertificationModel";
import { queryClient } from "@/queryClient";

const ALL = "All" as const;

export const Route = createFileRoute("/")({
  validateSearch: (search) =>
    z
      .object({
        vendor: z.enum(CERTIFICATE_VENDORS).optional(),
        role: z.string().optional(),
      })
      .parse(search),
  loaderDeps: ({ search }) => ({ vendor: search.vendor, role: search.role }),
  loader: ({ deps }) =>
    queryClient.ensureQueryData(
      certificatesQueryOptions({
        ...(deps.vendor ? { vendor: deps.vendor } : {}),
        ...(deps.role ? { role: deps.role } : {}),
      }),
    ),
  errorComponent: CertListError,
  component: CertListPage,
});

export function CertListPage() {
  const styles = useStyles();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const vendorFilter: CertificateVendor | undefined = search.vendor;
  const roleFilter: string | undefined = search.role;

  const filters = useMemo(
    () => ({
      ...(vendorFilter ? { vendor: vendorFilter } : {}),
      ...(roleFilter ? { role: roleFilter } : {}),
    }),
    [vendorFilter, roleFilter],
  );

  const { data } = useSuspenseQuery(certificatesQueryOptions(filters));
  const vendorOptions = [ALL, ...CERTIFICATE_VENDORS] as const;

  const { data: roles } = useSuspenseQuery(certificateRolesQueryOptions());
  const roleOptions = [ALL, ...roles];

  return (
    <>
      <Text size={600} weight="semibold" className={styles.title}>
        Certificates
      </Text>
      <div className={styles.filters}>
        {vendorOptions.map((vendor) => (
          <Button
            key={vendor}
            appearance={vendor === vendorFilter ? "primary" : "secondary"}
            onClick={() => {
              navigate({
                search: (prev: typeof search) => ({
                  ...prev,
                  vendor: vendor === ALL ? undefined : vendor,
                }),
              });
            }}
          >
            {vendor}
          </Button>
        ))}
      </div>
      <div className={styles.filters}>
        <Select
          value={search.role ?? ALL}
          onChange={(e) => {
            const role = e.target.value;
            navigate({
              search: (prev: typeof search) => ({
                ...prev,
                role: role === ALL ? undefined : role,
              }),
            });
          }}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </div>

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
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 300px))",
    gap: tokens.spacingHorizontalM,
    alignItems: "stretch",
    maxWidth: "82rem",
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
