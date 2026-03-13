import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { AddStarburstFilled } from "@fluentui/react-icons";
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
  );
}

const useStyles = makeStyles({
  header: {
    marginBottom: tokens.spacingVerticalM,
  },
});
