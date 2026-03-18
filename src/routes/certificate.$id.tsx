import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
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
            <form>
              <DialogBody>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogContent className={styles.content}>
                  <Field label="Link" required>
                    <Input placeholder="Eg. https://www.credly.com/..." type="url" />
                  </Field>
                  <Field label="Expiry Date" required>
                    <DatePicker placeholder="Select a date..." />
                  </Field>
                </DialogContent>
                <DialogActions className={styles.actionsContainer}>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary" className={styles.triggerButton}>
                      Add
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary" className={styles.triggerButton}>
                      Cancel
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </form>
          </DialogSurface>
        </Dialog>
      }
    />
  );
}

const useStyles = makeStyles({
  actionsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: tokens.spacingVerticalS,
    gridColumnStart: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalMNudge,
  },
  header: {
    marginBottom: tokens.spacingVerticalM,
  },
  triggerButton: {
    flexGrow: 1,
  },
});
