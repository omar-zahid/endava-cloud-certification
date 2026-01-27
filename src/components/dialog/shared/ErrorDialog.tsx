import type { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from "@fluentui/react-components";

export function ErrorDialog({
  open,
  title,
  message,
  primaryActionLabel = "Okay",
  onClose,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  primaryActionLabel?: string;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => (!data.open ? onClose() : null)}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{message}</DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={onClose}>
              {primaryActionLabel}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
