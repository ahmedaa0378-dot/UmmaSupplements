import { certificate, company, home, nav, products } from "@/content/site";

/*
  Single entry point for content. Pages only call these functions, so when Supabase is
  connected the bodies change to database reads and no page needs to be touched.
*/

export async function getHome() {
  return home;
}

export async function getProducts() {
  return products;
}

export async function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCertificate() {
  return certificate;
}

export async function getCompany() {
  return company;
}

export async function getNav() {
  return nav;
}
