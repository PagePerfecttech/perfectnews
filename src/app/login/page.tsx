"use client";

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Rocket, 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please check your email and password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 selection:bg-primary/10">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-secondary transition-colors mb-8 group">
           <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
           <span className="text-xs font-black uppercase tracking-widest">Back to Portal</span>
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden p-10 space-y-8 relative">
          
          {/* Logo Section */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-secondary/20 group hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">Command <span className="text-primary">Center</span></h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enterprise Administrative Access</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 rounded-2xl flex items-start space-x-3 border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] font-bold text-red-700 uppercase leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Administrator Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="admin@prajapalana.com" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Security Password</label>
                  <Link href="#" className="text-[9px] font-black uppercase text-primary hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-secondary text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl shadow-secondary/10 group active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Access</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer Footer */}
          <div className="pt-6 border-t border-gray-50 text-center">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                Secured by PagePerfect Tech • v1.0.4<br/>
                Unauthorized access is strictly monitored
             </p>
          </div>

        </div>

        {/* Support Link */}
        <div className="mt-8 text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              New client? <Link href="/setup" className="text-primary hover:underline ml-1">Complete Setup Wizard</Link>
           </p>
        </div>
      </div>
    </div>
  );
}
