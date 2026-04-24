import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function NewsManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Content Management</h1>
        <Link 
          href="/admin/news/new" 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200"
        >
          <Plus className="w-5 h-5" />
          <span>Post New Article</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search articles by title or keyword..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:border-primary focus:bg-white rounded-lg text-sm transition-all outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm font-medium outline-none cursor-pointer hover:bg-gray-100">
            <option>All Categories</option>
            <option>Politics</option>
            <option>Sports</option>
            <option>Entertainment</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border-transparent rounded-lg text-sm font-medium outline-none cursor-pointer hover:bg-gray-100">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Article Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=100&h=100&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="max-w-[300px]">
                        <h4 className="telugu-text text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                          ఆంధ్రప్రదేశ్లో భారీ వర్షాలు – ప్రజలకు హెచ్చరిక
                        </h4>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase mt-1">Author: Ramesh Babu</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="telugu-text text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">ఆంధ్రప్రదేశ్</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-full ${
                      i % 3 === 0 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {i % 3 === 0 ? 'Pending' : 'Live'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono font-bold text-gray-700">
                    {(i * 1234).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">
                    April 23, 2026
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" title="View">
                        <ExternalLink className="w-4 h-4" />
                      </button>
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
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1 to 8 of 154 entries</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-200 rounded text-xs font-bold hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-primary text-white rounded text-xs font-bold">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-xs font-bold hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-xs font-bold hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
