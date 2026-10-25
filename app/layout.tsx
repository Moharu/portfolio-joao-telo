import type { Metadata } from "next";
import "./globals.css";
const origin = process.env.SITE_URL;
if (origin && (!/^https:\/\//.test(origin) || new URL(origin).pathname !== "/"))
  throw new Error("SITE_URL must be an HTTPS production origin");
export const metadata: Metadata = {
  title: "João Teló | React & TypeScript Developer",
  description:
    "Front-end developer with a full-stack JavaScript background. Explore João Teló's React, TypeScript, and testing projects, professional experience, and contact details.",
  ...(origin
    ? { metadataBase: new URL(origin), alternates: { canonical: "/" } }
    : {}),
  robots:
    process.env.SITE_INDEXABLE === "true" && !!origin
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    title: "João Teló | React & TypeScript Developer",
    description: "Thoughtful interfaces. Reliable implementation.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/social.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/social.png"] },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
