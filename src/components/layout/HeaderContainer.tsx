import { Header } from "./Header";
import { getSiteSettings } from "@/lib/settings";

export async function HeaderContainer() {
  const settings = await getSiteSettings();
  
  const siteInfo = {
    name: settings.portalName || "PERFECT NEWS",
    tagline: settings.tagline || "మీ స్వరం, మీ అండ",
    primaryColor: "#E11D48" // Defaulting for now
  };

  return <Header siteInfo={siteInfo} />;
}
