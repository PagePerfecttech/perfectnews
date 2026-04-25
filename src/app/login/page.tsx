"use client";

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Lock, 
  Mail, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Settings
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
        setError("Invalid credentials. Please verify your email and password.");
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
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col items-center justify-center p-6">
      
      <div className="max-w-[400px] w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Back Navigation */}
        <div className="w-full mb-12 flex justify-start">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-medium uppercase tracking-widest">Back to Portal</span>
          </Link>
        </div>

        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-10 sm:p-12 space-y-10 relative overflow-hidden">
          
          {/* Accent Header */}
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Portal Administrative Access</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 rounded-2xl flex items-start space-x-3 border border-red-100 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] font-semibold text-red-700 uppercase leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-4.5 w-4.5 h-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4.5 pl-13 text-sm font-medium focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400" 
                    placeholder="admin@perfectnews.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Security Key</label>
                  <Link href="#" className="text-[10px] font-semibold text-gray-400 hover:text-black transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-4.5 w-4.5 h-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl p-4.5 pl-13 text-sm font-medium focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-black text-white py-5 rounded-full font-semibold text-sm flex items-center justify-center space-x-3 hover:bg-gray-800 transition-all shadow-xl shadow-black/5 group active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Access</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Compliance Info */}
          <div className="pt-8 border-t border-gray-50 text-center">
             <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-relaxed">
                Secured by Perfect News Tech<br/>
                Unauthorized access is strictly monitored
             </p>
          </div>

        </div>

        {/* Setup Redirect */}
        <div className="mt-12 text-center">
           <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              New portal? <Link href="/setup" className="text-black hover:underline ml-1">Launch Setup Wizard</Link>
           </p>
        </div>

      </div>
    </div>
  );
}
