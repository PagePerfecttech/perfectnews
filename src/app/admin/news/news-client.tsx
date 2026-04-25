"use client";

import { Search, Plus, ExternalLink, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, Badge, Button, SectionHeader, EmptyState } from "@/components/ui/primitives";

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  viewCount: number;
  featuredImage: string | null;
  createdAt: Date;
  publishedAt: Date | null;
  category: { name: string };
  author: { id: string; name: string | null; image: string | null };
}

interface NewsData {
  articles: ArticleRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function NewsManagementClient({ data }: { data: NewsData }) {
  const { articles, total, page, totalPages } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-sm text-gray-500">{total} total articles</p>
        </div>
        <Link href="/admin/news/new">
          <Button icon={Plus}>New Article</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card padding="sm" className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles by title..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </Card>

      {/* Table or Empty State */}
      {articles.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No articles found"
          description="Start by creating your first article or seeding sample data."
          action={
            <Link href="/admin/news/new">
              <Button icon={Plus}>Create First Article</Button>
            </Link>
          }
        />
      ) : (
        <Card padding="sm" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Article</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Views</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                          {article.featuredImage ? (
                            <Image
                              src={article.featuredImage}
                              alt={article.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
                        <div className="max-w-[300px]">
                          <h4 className="text-sm font-semibold text-gray-900 truncate telugu-text group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {article.author.name || "Unknown Author"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{article.category.name}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          article.status === "PUBLISHED" ? "success" :
                          article.status === "PENDING" ? "warning" :
                          article.status === "DRAFT" ? "default" : "danger"
                        }
                      >
                        {article.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {article.viewCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/news/${article.slug}`} target="_blank">
                          <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="View">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </Link>
                        <button className="p-2 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination — real data */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Page {page} of {totalPages} ({total} articles)
            </p>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
