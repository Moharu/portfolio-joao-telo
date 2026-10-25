import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const origin = process.env.SITE_URL;
  const live = !!origin && process.env.SITE_INDEXABLE === "true";
  return {
    rules: { userAgent: "*", ...(live ? { allow: "/" } : { disallow: "/" }) },
    ...(live ? { sitemap: `${origin}sitemap.xml` } : {}),
  };
}
