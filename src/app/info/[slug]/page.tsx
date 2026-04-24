import React from 'react';
import { Shield, Info, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function StaticPage({ params }: { params: { slug: string } }) {
  const isContact = params.slug === 'contact';
  
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-20">
        <div className="max-w-screen-md mx-auto px-4 text-center">
           <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4 text-secondary">
             {params.slug.replace('-', ' ')}
           </h1>
           <div className="w-12 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 py-20">
        {isContact ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-8">
                <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">Get in Touch</h2>
                <div className="space-y-6">
                   <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-50 text-primary rounded-xl"><Mail className="w-6 h-6" /></div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                         <p className="font-bold text-gray-800">contact@telugupost.com</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Phone className="w-6 h-6" /></div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                         <p className="font-bold text-gray-800">+91 98765 43210</p>
                      </div>
                   </div>
                   <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-xl"><MapPin className="w-6 h-6" /></div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visit Us</p>
                         <p className="font-bold text-gray-800">Hyderabad, Telangana, India</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
                <input type="text" placeholder="Your Name" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary text-sm font-bold" />
                <input type="email" placeholder="Your Email" className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary text-sm font-bold" />
                <textarea placeholder="Message" rows={4} className="w-full p-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary text-sm font-bold resize-none"></textarea>
                <button className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-100 hover:scale-[1.02] transition-all">
                   Send Message
                </button>
             </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none space-y-8">
             <section className="space-y-4">
                <h2 className="text-2xl font-black text-secondary flex items-center space-x-3 uppercase tracking-tight">
                   <Shield className="w-6 h-6 text-primary" />
                   <span>Our Commitment</span>
                </h2>
                <p className="text-gray-600 leading-relaxed font-medium">
                   Welcome to <strong>Telugu Post</strong>. We are dedicated to providing accurate, timely, and unbiased news to the Telugu-speaking community across the globe. Our team of experienced journalists works around the clock to bring you stories that matter—from grassroots reporting in Telangana and Andhra Pradesh to global developments that impact our lives.
                </p>
             </section>

             <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
                <h3 className="font-black text-secondary text-lg uppercase tracking-tight">Why Trust Us?</h3>
                <ul className="space-y-3">
                   {[
                     "Verified Sources & Fact-Checked Reports",
                     "Hyperlocal Intelligence & Field Reporting",
                     "Modern E-Paper & Multimedia Experience",
                     "User-Centric & Fast Mobile Browsing"
                   ].map(item => (
                     <li key={item} className="flex items-center space-x-3 text-sm font-bold text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>{item}</span>
                     </li>
                   ))}
                </ul>
             </section>

             <section className="space-y-4">
                <p className="text-gray-600 leading-relaxed font-medium">
                   We understand the responsibility that comes with being a news organization in the digital age. Our platform is built on transparency and integrity. For any queries regarding our content or policies, feel free to reach out to our editorial board.
                </p>
             </section>
          </div>
        )}
      </div>
    </main>
  );
}
