import { ErrorDialog } from "./shared/ErrorDialog";

export function CertErrorDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <ErrorDialog
      open={open}
      title="Certificate not found"
      message={
        <>
          Certificate not found or link may be outdated, please contact
          administrater if issue persists.
        </>
      }
      primaryActionLabel="Okay"
      onClose={onClose}
    />
  );
}
