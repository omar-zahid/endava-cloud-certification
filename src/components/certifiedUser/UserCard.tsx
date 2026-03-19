import { Item } from "@/routes/certificate.$id";
import {
  Button,
  Card,
  Persona,
  Text,
  Tooltip,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { CheckmarkStarburstFilled } from "@fluentui/react-icons";
import { OpenFilled } from "node_modules/@fluentui/react-icons/lib/fonts/icons/chunk-6";

const validityIcon = (isExpired: boolean) => {
  return (
    <Tooltip content={isExpired ? "Expired Certificate" : "Active Certificate"} relationship="label">
      <CheckmarkStarburstFilled
        style={isExpired ? { color: "#A3AAAF" } : { color: "#2D9C5B" }}
      />
    </Tooltip>
  );
};

export function UserCard({ items }: { items: Item[] }) {
  const styles = useStyles();

  return (
    <div className={styles.cardRoot}>
      <div className={styles.cardWrapper}>
        {(items || []).map((item, index) => (
          <Card key={index} className={styles.card}>
            <Persona
              key={item.name}
              textPosition="below"
              textAlignment="center"
              name={item.name}
              presence={{
                status: item.certificateValidity.isExpired ? "offline" : "available",
                icon: validityIcon(item.certificateValidity.isExpired),
                size: "large",
              }}
              size="huge"
            />
            <Text align="center" className={styles.cardText}>{item.role}</Text>
            <Text align="center" className={styles.cardText}>{item.email}</Text>
            <Button
              as="a"
              href={item.certificateValidity.url}
              target="_blank"
              rel="noreferrer"
              appearance="primary"
              icon={<OpenFilled />}
              className={styles.buttonLink}
            >
              View Certificate
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// TODO: Check hardcoded colors or vars
const useStyles = makeStyles({
  cardRoot: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  cardWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    columnGap: "36px",
    rowGap: "36px",
    maxWidth: "82rem",
  },
  card: {
    display: "flex",
    padding: "20px",
    rowGap: "2px",
  },
  cardText: {
    fontSize: "12px",
  },
  buttonLink: {
    backgroundColor: "#FF5640",
    fontWeight: "var(--fontWeightRegular)",
    marginTop: "12px",
  },
});
