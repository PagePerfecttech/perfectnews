"use client";

import { Eye, FileEdit, Clock, TrendingUp, ChevronRight, Database } from "lucide-react";
import Link from "next/link";
import { StatCard, Card, Badge, Button, SectionHeader } from "@/components/ui/primitives";
import { seedMockData } from "@/lib/seed-actions";

interface DashboardStats {
  totalArticles: number;
  pendingReview: number;
  totalViews: number;
  todayArticles: number;
  recentArticles: {
    id: string;
    title: string;
    status: string;
    viewCount: number;
    createdAt: Date;
    category: { name: string };
    author: { name: string | null };
  }[];
}

export function AdminDashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time platform analytics</p>
        </div>
        <Button
          variant="ghost"
          icon={Database}
          onClick={async () => {
            if (confirm("Seed professional mock data? This will add sample articles to your site.")) {
              const res = await seedMockData();
              alert(res.message);
              window.location.reload();
            }
          }}
        >
          Seed Data
        </Button>
      </div>

      {/* Stats Grid — all values from database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Views"
          value={stats.totalViews}
          icon={Eye}
          trend={stats.totalViews > 0 ? "Live" : "—"}
          trendUp={stats.totalViews > 0}
        />
        <StatCard
          label="Articles Published"
          value={stats.totalArticles}
          icon={FileEdit}
        />
        <StatCard
          label="Pending Review"
          value={stats.pendingReview}
          icon={Clock}
          trend={stats.pendingReview > 0 ? `${stats.pendingReview} waiting` : "Clear"}
          trendUp={stats.pendingReview === 0}
        />
        <StatCard
          label="Published Today"
          value={stats.todayArticles}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Articles — real data from database */}
      <Card padding="lg">
        <SectionHeader
          title="Recent Articles"
          icon={FileEdit}
          action={
            <Link href="/admin/news" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          }
        />

        {stats.recentArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No articles yet. Create your first article or seed sample data.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/admin/news/new">
                <Button icon={FileEdit}>Write Article</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between py-4 group">
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-sm font-semibold text-gray-900 truncate telugu-text group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant={article.status === "PUBLISHED" ? "success" : article.status === "PENDING" ? "warning" : "default"}>
                      {article.status}
                    </Badge>
                    <span className="text-xs text-gray-400">{article.category.name}</span>
                    <span className="text-xs text-gray-400">{article.author.name || "Unknown"}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-700">{article.viewCount.toLocaleString()} views</p>
                  <p className="text-xs text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
