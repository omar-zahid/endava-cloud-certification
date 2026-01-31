export type CertificateVendor = "Azure" | "AWS";

export type CertificateLevel = "Associate" | "Professional";

export type Certificate = {
  id: string;
  name: string;
  description: string;
  badgeUrl: string;
  vendor: CertificateVendor;
  level: CertificateLevel;
  role: string;
  subject: string;
  externalLink: string;
};
