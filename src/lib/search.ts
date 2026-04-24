import { prisma } from "./db";

/**
 * Advanced Relevance-Weighted Search
 */
export async function searchNews(query: string) {
  // 1. Normalize query for Full-Text Search
  const searchTerms = query.split(' ').join(' & ');

  // 2. Perform weighted search using Raw SQL for performance
  // Title (Weight A), Excerpt (Weight B), Content (Weight C)
  return await prisma.$queryRaw`
    SELECT id, title, slug, excerpt, "featuredImage", "publishedAt",
           ts_rank_cd(
             setweight(to_tsvector('simple', title), 'A') ||
             setweight(to_tsvector('simple', COALESCE(excerpt, '')), 'B') ||
             setweight(to_tsvector('simple', content), 'C'),
             to_tsquery('simple', ${searchTerms})
           ) AS rank
    FROM "Article"
    WHERE status = 'PUBLISHED'
    AND (
      to_tsvector('simple', title) ||
      to_tsvector('simple', COALESCE(excerpt, '')) ||
      to_tsvector('simple', content)
    ) @@ to_tsquery('simple', ${searchTerms})
    ORDER BY rank DESC
    LIMIT 20;
  `;
}
