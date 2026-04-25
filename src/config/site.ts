/**
 * Static fallback configuration for Perfect News.
 * 
 * IMPORTANT: This is used ONLY as defaults when the database
 * SiteSettings record hasn't been created yet (pre-setup).
 * After setup, all values should come from the database via getSiteSettings().
 * 
 * Components should prefer receiving siteInfo via props from their parent layout
 * rather than importing this directly.
 */

import type { SiteInfo, CategoryItem } from "@/types";

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "ap", slug: "ap", label: "ఆంధ్రప్రదేశ్" },
  { id: "ts", slug: "ts", label: "తెలంగాణ" },
  { id: "national", slug: "national", label: "జాతీయ వార్తలు" },
  { id: "international", slug: "international", label: "అంతర్జాతీయ వార్తలు" },
  { id: "politics", slug: "politics", label: "రాజకీయాలు" },
  { id: "sports", slug: "sports", label: "క్రీడలు" },
  { id: "entertainment", slug: "entertainment", label: "వినోదం" },
  { id: "health", slug: "health", label: "ఆరోగ్యం" },
  { id: "business", slug: "business", label: "వ్యాపారం" },
  { id: "opinion", slug: "opinion", label: "అభిప్రాయం" },
];

export const DEFAULT_SITE_INFO: SiteInfo = {
  name: "Perfect News",
  tagline: "మీ స్వరం, మీ అండ",
  description: "ప్రజల స్వరం – నిజమైన వార్తలు",
  primaryColor: "#E30613",
  contactEmail: "contact@perfectnews.com",
  contactPhone: "+91-9999999999",
  template: "HYBRID",
  theme: "LIGHT",
  categories: DEFAULT_CATEGORIES,
  socials: {
    whatsapp: "https://whatsapp.com/channel/example",
    facebook: "https://facebook.com/perfectnews",
    twitter: "https://twitter.com/perfectnews",
    instagram: "https://instagram.com/perfectnews",
    youtube: "https://youtube.com/perfectnews",
  },
};

/**
 * @deprecated Import getSiteSettings from "@/lib/settings" instead.
 * This export is kept only for backward compatibility during migration.
 */
export const siteConfig = DEFAULT_SITE_INFO;
