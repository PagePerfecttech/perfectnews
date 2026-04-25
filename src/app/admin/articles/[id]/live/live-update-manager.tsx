"use client";

import React, { useState } from 'react';
import { Radio, Send, Trash2, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { addLiveUpdate, deleteLiveUpdate } from '@/lib/live-blog-actions';

interface Update {
  id: string;
  content: string;
  isImportant: boolean;
  createdAt: Date;
}

export function LiveUpdateManager({ articleId, initialUpdates }: { articleId: string, initialUpdates: Update[] }) {
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const result = await addLiveUpdate(articleId, content, isImportant);
    if (result.success) {
      setContent("");
      setIsImportant(false);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900">Live Blog <span className="text-primary">Control</span></h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Real-time update management</p>
        </div>
        <div className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase border border-red-100 animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>Live Session Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Update Form */}
        <div className="lg:col-span-5">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-10">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Push New Update</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Update Content (Telugu)</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-6 rounded-3xl text-lg font-bold telugu-text outline-none focus:border-primary transition-all min-h-[200px]"
                  placeholder="వార్తను ఇక్కడ టైప్ చేయండి..."
                />
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <input 
                  type="checkbox" 
                  id="important" 
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-5 h-5 rounded-md border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="important" className="text-xs font-black uppercase tracking-widest text-secondary cursor-pointer select-none">
                  Mark as Breaking / Important
                </label>
              </div>

              <button 
                disabled={loading || !content.trim()}
                type="submit" 
                className="w-full bg-black text-white p-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-primary transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Pushing Update..." : "Blast Update Now"}</span>
              </button>
            </form>
          </section>
        </div>

        {/* Timeline Preview */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 px-4">Live Timeline</h3>
          
          <div className="relative border-l-2 border-gray-100 ml-6 space-y-10 pb-10">
            {initialUpdates.length === 0 ? (
              <div className="pl-10 py-10">
                <div className="bg-gray-50 border border-gray-100 p-10 rounded-3xl border-dashed flex flex-col items-center text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-gray-200" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No updates pushed yet</p>
                </div>
              </div>
            ) : initialUpdates.map((update, i) => (
              <div key={update.id} className="relative pl-10 group">
                <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white ${
                  i === 0 ? 'bg-primary ring-4 ring-red-100' : 'bg-gray-300'
                }`} />
                
                <div className={`p-6 rounded-3xl border transition-all ${
                  update.isImportant ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(update.createdAt).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <button 
                      onClick={async () => {
                        if (confirm("Delete this update?")) {
                          await deleteLiveUpdate(update.id, articleId);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-primary transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="telugu-text text-lg font-bold leading-relaxed text-gray-800">
                    {update.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
