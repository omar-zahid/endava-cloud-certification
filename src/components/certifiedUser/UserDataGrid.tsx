import { Item } from "@/routes/certificate.$id";
import {
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { OpenFilled } from "@fluentui/react-icons";

export function UserDataGrid({ items }: { items: Item[] }) {
  const styles = useStyles();

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "name",
      renderHeaderCell: () => {
        return "Name";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.name}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "email",
      renderHeaderCell: () => {
        return "Email";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.email}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "role",
      compare: (a, b) => a.role.localeCompare(b.role),
      renderHeaderCell: () => {
        return "Role";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.role}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "certificateValidity",
      compare: (a, b) => a.certificateValidity.isExpired === b.certificateValidity.isExpired ? 0 : a.certificateValidity.isExpired ? 1 : -1,
      renderHeaderCell: () => {
        return "Certificate Validity";
      },
      renderCell: (item) => {
        return (
          <div className={styles.certificateValidityCell}>
            <TableCellLayout className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon} media={item.certificateValidity.icon}>
              {item.certificateValidity.isExpired ? "Expired" : "Valid"}
            </TableCellLayout>
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
          </div>
        );
      },
    }),
  ];

  return (
    <div className={styles.dataGridRoot}>
      <DataGrid
        items={items}
        className={styles.dataGrid}
        columns={columns}
        focusMode="composite"
        sortable
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}

// TODO: Check hardcoded colors or vars
const useStyles = makeStyles({
  dataGridRoot: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  dataGrid: {
    fontSize: "12px",
    "& div[role='columnheader']": {
      fontSize: "14px",
    }
  },
  buttonLink: {
    backgroundColor: "#FF5640",
  },
  validIcon: {
    "& > span": {
      color: "#2D9C5B",
    },
  },
  expiredIcon: {
    color: "#A3AAAF",
  },
  certificateValidityCell: {
    display: "flex",
    flexDirection: "row",
    "& > div": {
      width: "130px",
    },
  },
});
