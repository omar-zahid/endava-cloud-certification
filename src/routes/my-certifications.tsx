import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import {
  Button,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  JSXElement,
  makeStyles,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  Text,
  tokens,
} from "@fluentui/react-components";
import { CheckmarkStarburstFilled, OpenFilled } from "@fluentui/react-icons";
import { CertificateLevel, CertificateVendor } from "@/models/CertificationModel";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/my-certifications")({
  component: RouteComponent,
})

type Expiry = {
  isExpired: boolean;
  icon: JSXElement;
}

type Item = {
  name: string;
  vendor: CertificateVendor;
  description: string;
  level: CertificateLevel;
  certificateValidity: Expiry & { url: string };
};

// TODO: Replace this when BE ready
const items: Item[] = [
  {
    name: "Microsoft Certified: Azure AI Engineer",
    vendor: "Azure",
    description: "Design and implement an Azure AI solution using Azure AI services, Azure AI Search, and Azure Open AI.",
    level: "Professional",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    vendor: "AWS",
    description: "Focuses on the design of cost and performance optimized solutions. This is an ideal starting point for candidates with AWS Cloud or strong on-premises IT experience. This exam does not require deep hands-on coding experience, although familiarity with basic programming concepts would be an advantage.",
    level: "Associate",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "AWS Certified Machine Learning Engineer - Associate",
    vendor: "AWS",
    description: "AWS Certified Machine Learning Engineer - Associate validates technical ability in implementing ML workloads in production and operationalizing them. Boost your career profile and credibility, and position yourself for in-demand machine learning job roles.",
    level: "Associate",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Microsoft Certified: Azure Developer",
    vendor: "Azure",
    description: "Build end-to-end solutions in Microsoft Azure to create Azure Functions, implement and manage web apps, develop solutions utilizing Azure storage, and more.",
    level: "Professional",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Microsoft Certified: Azure AI Engineer",
    vendor: "Azure",
    description: "Design and implement an Azure AI solution using Azure AI services, Azure AI Search, and Azure Open AI.",
    level: "Professional",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    vendor: "AWS",
    description: "Focuses on the design of cost and performance optimized solutions. This is an ideal starting point for candidates with AWS Cloud or strong on-premises IT experience. This exam does not require deep hands-on coding experience, although familiarity with basic programming concepts would be an advantage.",
    level: "Associate",
    certificateValidity: { isExpired: true, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "AWS Certified Machine Learning Engineer - Associate",
    vendor: "AWS",
    description: "AWS Certified Machine Learning Engineer - Associate validates technical ability in implementing ML workloads in production and operationalizing them. Boost your career profile and credibility, and position yourself for in-demand machine learning job roles.",
    level: "Associate",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    vendor: "Azure",
    description: "Build end-to-end solutions in Microsoft Azure to create Azure Functions, implement and manage web apps, develop solutions utilizing Azure storage, and more.",
    level: "Associate",
    certificateValidity: { isExpired: false, icon: <CheckmarkStarburstFilled />, url: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/" },
  },
];

function RouteComponent() {
  const styles = useStyles();
  const navigate = useNavigate();

  // Use a ref to get the container width and set description column to 40% of it
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [descriptionWidth, setDescriptionWidth] = useState(550);

  useEffect(() => {
    if (gridContainerRef.current) {
      const width = gridContainerRef.current.offsetWidth;
      setDescriptionWidth(Math.max(550, Math.floor(width * 0.4)));
    }
  }, []);

  const columnSizingOptions: TableColumnSizingOptions = {
    name: {
      defaultWidth: 260,
      minWidth: 260,
      idealWidth: 260,
    },
    description: {
      defaultWidth: descriptionWidth,
      minWidth: 550,
      idealWidth: descriptionWidth,
    },
    level: {
      defaultWidth: 80,
      minWidth: 80,
      idealWidth: 80,
    },
    vendor: {
      defaultWidth: 80,
      minWidth: 80,
      idealWidth: 80,
    },
    certificateValidity: {
      defaultWidth: 280,
      minWidth: 280,
      idealWidth: 280,
    },
  };

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "name",
      renderHeaderCell: () => {
        return "Certificate Name";
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
      columnId: "description",
      renderHeaderCell: () => {
        return "Description";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout truncate className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.description}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "level",
      compare: (a, b) => a.level.localeCompare(b.level),
      renderHeaderCell: () => {
        return "Level";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.level}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "vendor",
      compare: (a, b) => a.vendor.localeCompare(b.vendor),
      renderHeaderCell: () => {
        return "Vendor";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout className={item.certificateValidity.isExpired ? styles.expiredIcon : styles.validIcon}>
            {item.vendor}
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
    <div className={styles.gridRoot}>
      <Text size={600} weight="semibold" className={styles.title}>
        My Certifications
      </Text>
      <Text className={styles.subtitle}>
        View your latest certificate collections. If any of your certificates are not listed on this page, please browse<Link className={styles.link} onClick={() => navigate({ to: "/", })} to={undefined}> here</Link>
      </Text>
      <DataGrid
        items={items}
        className={styles.dataGrid}
        columns={columns}
        columnSizingOptions={columnSizingOptions}
        focusMode="composite"
        ref={gridContainerRef}
        resizableColumns
        resizableColumnsOptions={{
          autoFitColumns: false,
        }}
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
  )
}

const useStyles = makeStyles({
  gridRoot: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  title: {
    marginBottom: tokens.spacingVerticalM,
  },
  subtitle: {
    color: "#5E6A73",
  },
  link: {
    color: "#E34230",
    cursor: "pointer",
    textDecoration: "none",
  },
  buttonLink: {
    backgroundColor: "#FF5640",
  },
  dataGrid: {
    marginTop: "56px",
    fontSize: "12px",
    "& div[role='columnheader']": {
      fontSize: "14px",
    }
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
