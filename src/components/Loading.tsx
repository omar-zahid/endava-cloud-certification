import { Spinner, Text, makeStyles, tokens } from "@fluentui/react-components";
import type { SpinnerProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
  },
  message: {
    color: tokens.colorNeutralForegroundInverted,
    textAlign: "center",
    maxWidth: "420px",
  },
});

export function Loading({
  active,
  message,
  spinnerSize = "large",
}: {
  active: boolean;
  message?: string;
  spinnerSize?: SpinnerProps["size"];
}) {
  const styles = useStyles();

  if (!active) return null;

  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.content}>
        <Spinner size={spinnerSize} />
        {message ? (
          <Text size={300} className={styles.message}>
            {message}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
