"use client";

import React, { useState } from 'react';
import { UserPlus, Shield, Mail, Trash2, Edit, Check, UserCircle } from 'lucide-react';

export default function UserManagementPage() {
  const [users, setUsers] = useState([
    { id: '1', name: 'Admin User', email: 'admin@prajapalana.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: '2', name: 'Ravi Kumar', email: 'ravi@prajapalana.com', role: 'EDITOR', status: 'ACTIVE' },
    { id: '3', name: 'Sita Devi', email: 'sita@prajapalana.com', role: 'REPORTER', status: 'INACTIVE' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">Newsroom <span className="text-primary">Staff</span></h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Roles & Permissions Manager</p>
         </div>
         <button className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add New Member</span>
         </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Staff', count: 24, icon: UserCircle, color: 'text-blue-600' },
           { label: 'Active Editors', count: 5, icon: Shield, color: 'text-primary' },
           { label: 'Field Reporters', count: 18, icon: Mail, color: 'text-green-600' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-2xl font-black italic tracking-tighter">{stat.count}</p>
              </div>
           </div>
         ))}
      </div>

      {/* User Table */}
      <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Name & Email</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Role</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs text-secondary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="font-black italic uppercase tracking-tighter text-secondary">{user.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <select 
                            className="bg-transparent font-black text-[10px] uppercase tracking-widest outline-none text-secondary cursor-pointer hover:text-primary"
                            defaultValue={user.role}
                          >
                             <option value="ADMIN">Admin</option>
                             <option value="EDITOR">Editor</option>
                             <option value="REPORTER">Reporter</option>
                          </select>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            user.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                             {user.status}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-secondary transition-all">
                                <Edit className="w-4 h-4" />
                             </button>
                             <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-primary transition-all">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

    </div>
  );
}
