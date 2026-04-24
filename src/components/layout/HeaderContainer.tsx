import { Header } from "./Header";
import { getSiteSettings } from "@/lib/settings";

export async function HeaderContainer() {
  const settings = await getSiteSettings();
  
  const siteInfo = {
    name: settings.siteName || "PRAJAPALANA",
    tagline: settings.siteDescription || "మీ స్వరం, మీ అండ",
    primaryColor: settings.primaryColor || "#E11D48"
  };

  return <Header siteInfo={siteInfo} />;
}
