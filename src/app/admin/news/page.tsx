import { getAdminArticles } from "@/lib/actions";
import { NewsManagementClient } from "./news-client";

/**
 * News Management — Server Component fetches real articles from DB
 */
export default async function NewsManagement() {
  const data = await getAdminArticles(1);
  return <NewsManagementClient data={data} />;
}
