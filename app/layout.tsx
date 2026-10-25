import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "@/content/site";
const origin = process.env.SITE_URL;
if (origin && (!/^https:\/\//.test(origin) || !origin.endsWith("/")))
  throw new Error("SITE_URL must be an HTTPS site URL ending with /");
const socialImage = origin
  ? new URL("social.png", origin).href
  : assetPath("/social.png");
export const metadata: Metadata = {
  title: "João Teló | React & TypeScript Developer",
  description:
    "Front-end developer with a full-stack JavaScript background. Explore João Teló's React, TypeScript, and testing projects, professional experience, and contact details.",
  ...(origin
    ? { metadataBase: new URL(origin), alternates: { canonical: origin } }
    : {}),
  robots:
    process.env.SITE_INDEXABLE === "true" && !!origin
      ? { index: true, follow: true }
      : { index: false, follow: false },
  openGraph: {
    title: "João Teló | React & TypeScript Developer",
    description: "I build interfaces. And pay attention to the details.",
    type: "website",
    locale: "en_US",
    images: [{ url: socialImage, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch{}document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
