/** @type {import('next-seo').DefaultSeoProps} */
import { DefaultSeoProps, BreadCrumbJsonLdProps, SocialProfileJsonLdProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  title: "NoAIGPT - Transform AI Text into Human Text",
  description:
    "Use NoAIGPT to transform AI-generated text into human-like text with natural flow and no AI detection. Perfect for bloggers, marketers, and professionals.",
  canonical: "https://noaigpt.com/",  // Use https for better SEO
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noaigpt.com/",  // Use https for better SEO
    siteName: "NoAIGPT",
    title: "NoAIGPT - Transform AI Text into Human Text",
    description:
      "Use NoAIGPT to transform AI-generated text into human-like text with natural flow and no AI detection.",
    images: [
      {
        url: "https://noaigpt.com/assets/og-image.png",  // Use https for better SEO
        width: 1200,
        height: 630,
        alt: "NoAIGPT - AI Content Humanization",
      },
    ],
  },
  twitter: {
    handle: "@yourhandle",  // Replace with your actual Twitter handle
    site: "@yoursite",      // Replace with your site's Twitter handle
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      property: "dc:creator",
      content: "NoAIGPT Team",
    },
    {
      name: "application-name",
      content: "NoAIGPT",
    },
    {
      name: "keywords",
      content:
        "AI, Human Text, AI Detection, Content Creation, SEO Optimization, Blogging, Copywriting, NoAIGPT",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "googlebot",
      content: "index, follow",
    },
    {
      name: "bingbot",
      content: "index, follow",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "author",
      content: "NoAIGPT Team",
    },
    {
      name: "rating",
      content: "General",
    },
    {
      httpEquiv: "x-ua-compatible",
      content: "IE=edge",
    },
    {
      httpEquiv: "content-type",
      content: "text/html; charset=UTF-8",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/assets/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

const socialProfileJsonLd: SocialProfileJsonLdProps = {
  type: "Organization",
  name: "NoAIGPT",
  url: "https://noaigpt.com/",  // Use https for better SEO
  sameAs: [
    "https://www.facebook.com/yourprofile",  // Replace with your actual social profile links
    "https://twitter.com/yourhandle",       // Replace with your actual Twitter handle
    "https://linkedin.com/company/yourcompany", // Replace with your LinkedIn profile link
    "https://instagram.com/yourhandle",     // Replace with your Instagram handle
  ],
};

const breadcrumbJsonLd: BreadCrumbJsonLdProps = {
  itemListElements: [
    {
      position: 1,
      name: "Home",
      item: "https://noaigpt.com/",  // Use https for better SEO
    },
    {
      position: 2,
      name: "Pricing",
      item: "https://noaigpt.com/pricing",  // Use https for better SEO
    },
    {
      position: 3,
      name: "Ai-detectors",
      item: "https://noaigpt.com/ai-detectors",  // Use https for better SEO
    },
  ],
};

export { defaultSEOConfig, socialProfileJsonLd, breadcrumbJsonLd };
