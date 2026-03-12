import { ReactNode } from "react";
import {
  makeStyles,
  mergeClasses,
  Text,
  tokens,
} from "@fluentui/react-components";
import headerImage from "@/assets/header_img.svg";

type HeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function Header({ title, description, action, className }: HeaderProps) {
  const styles = useStyles();

  return (
    <header className={mergeClasses(styles.root, className)}>
      <div className={styles.content}>
        <Text as="h1" size={700} weight="semibold" className={styles.title}>
          {title}
        </Text>

        {description ? (
          <Text as="p" size={400} className={styles.description}>
            {description}
          </Text>
        ) : null}

        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </header>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "325px",
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxSizing: "border-box",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  content: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "@media (max-width: 920px)": {
      width: "100%",
      alignItems: "center",
    },
  },
  title: {
    margin: 0,
    display: "block",
    width: "100%",
    textAlign: "left",
    "@media (max-width: 920px)": {
      textAlign: "center",
    },
  },
  description: {
    display: "block",
    width: "100%",
    textAlign: "left",
    marginTop: tokens.spacingVerticalM,
    "@media (max-width: 920px)": {
      textAlign: "center",
    },
  },
  action: {
    marginTop: tokens.spacingVerticalL,
    alignSelf: "flex-start",
    "@media (max-width: 920px)": {
      alignSelf: "center",
    },
  },
});
