import { VENDOR, Vendor } from "./vendor";

export type VendorConfig = {
  label: string;
  logo: string;
};

export const vendorConfig: Record<Vendor, VendorConfig> = {
  [VENDOR.AZURE]: {
    label: "Microsoft Azure",
    logo: "azure-logo.png",
  },
  [VENDOR.AWS]: {
    label: "Amazon Web Services",
    logo: "aws-logo.svg",
  },
};
