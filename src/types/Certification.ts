import { Vendor } from "../constants/vendor";

export type Certification = {
  name: string;
  description: string;
  badgeUrl: string;
  vendor: Vendor;
  level: string;
  role: string;
  subject: string;
  externalLink: string;
};
