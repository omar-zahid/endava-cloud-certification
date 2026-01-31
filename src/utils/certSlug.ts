import type { Certification } from "../types/Certification";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function certToSlug(cert: Certification): string {
  return slugify(`${cert.vendor}-${cert.name}`);
}
