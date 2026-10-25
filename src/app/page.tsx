import type { Metadata } from "next";
import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Project from "@/components/project/Project";
import { SITE_LINKS } from "@/lib/links";
import { SITE } from "@/lib/site";

const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: SITE.title,
};

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [socialImage],
  },
};

const personId = `${SITE.url}#person`;
const websiteId = `${SITE.url}#website`;
const profileData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE.url,
      name: SITE.name,
      alternateName: [SITE.author, "Keem's portfolio", "heykeem.com"],
      inLanguage: "en",
      author: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}#profile`,
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: SITE.author,
      alternateName: SITE.nickname,
      url: SITE.url,
      image: new URL("/about/portrait.webp", SITE.url).href,
      jobTitle: "Software Engineer",
      sameAs: Object.values(SITE_LINKS.profiles),
    },
  ],
};

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileData).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Project />
      <About />
    </main>
  );
}
