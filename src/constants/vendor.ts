export const VENDOR = {
  AZURE: "Azure",
  AWS: "AWS",
} as const;

export type Vendor = (typeof VENDOR)[keyof typeof VENDOR];
