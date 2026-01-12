export const VENDOR = {
  AZURE: "azure",
  AWS: "aws",
} as const;

export type Vendor = (typeof VENDOR)[keyof typeof VENDOR];
