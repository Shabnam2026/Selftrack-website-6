import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Recommendation({ onStartOver }: { onStartOver?: () => void }) {
  const [vehicleCount, setVehicleCount] = useState(10);

  return (
    <div className="bg-surface-container-low min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* SECTION 1 - HERO SUCCESS BAND */}
        <section className="bg-[#9ACA3C] py-12 px-6 text-center shadow-inner">
          <div className="w-14 h-14 bg-white/20 rounded-full mx-auto flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-sans text-3xl font-[900] uppercase tracking-tight italic text-white mt-5 leading-tight">
            YOUR FLEET SOLUTION IS READY
          </h1>
          <p className="font-sans text-base text-white/90 max-w-lg mx-auto mt-3 leading-relaxed">
            Based on your answers, here is our recommended Selftrack solution for optimal efficiency and fleet safety.
          </p>
        </section>

        {/* SECTION 2 - RECOMMENDED PRODUCTS */}
        <section className="bg-surface-container-low pt-12 px-6 max-w-4xl mx-auto w-full">
          <h2 className="font-sans text-sm font-[900] uppercase text-[#555759] tracking-wider text-center mb-8">
            RECOMMENDED FOR YOUR FLEET
          </h2>
          
          <div className="flex gap-5 flex-wrap">
            {[
              { 
                name: 'SelfTRACK', tier: 'SUPERVISOR TIER',
                features: ['Live tracking', 'Driver identification', 'Trip history'] 
              },
              { 
                name: 'SelfCAM', tier: 'SMART MDVR',
                features: ['AI fatigue detection', 'Incident clips', 'Live streaming'] 
              },
              { 
                name: 'SelfFLEET', tier: 'FULL FMIS PLATFORM',
                features: ['Route optimisation', 'Fuel management', 'Maintenance planning'] 
              }
            ].map((product, idx) => (
              <div 
                key={idx} 
                className="group transform hover:-translate-y-1 bg-white border border-black/5 rounded-2xl p-6 flex-1 min-w-[200px] shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="bg-[#555759]/5 text-[#555759] font-sans text-[10px] font-bold uppercase tracking-wide py-1 px-3 rounded-full inline-block mb-4 border border-black/5">
                  INCLUDED IN YOUR SOLUTION
                </div>
                <h3 className="font-sans text-[22px] font-[900] text-[#555759] mb-1">{product.name}</h3>
                <div className="font-sans text-[11px] font-[900] uppercase text-[#9ACA3C] tracking-wide mb-5">
                  {product.tier}
                </div>
                
                <div className="flex flex-col gap-3">
                  {product.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <circle cx="8" cy="8" r="8" fill="#9ACA3C" fillOpacity="0.2" />
                        <path d="M4.5 8.5L7 11L11.5 5" stroke="#9ACA3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-sans text-[14px] text-[#555759]/80 font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 - LEAD CAPTURE FORM */}
        <section className="max-w-xl mx-auto my-12 px-6 w-full">
          <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-sm">
            <h2 className="font-sans text-xl font-[900] uppercase text-[#555759] tracking-wider mb-2">
              Get Your Personalised Quote
            </h2>
            <p className="font-sans text-[13px] text-[#555759]/80 mb-6 leading-relaxed">
              Our fleet specialist will contact you within 24 hours with a personalised quote.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              const name = formData.get('name');
              const company = formData.get('company');
              const email = formData.get('email');
              const phone = formData.get('phone');
              
              const subject = "Lead Capture - Personalised Quote";
              const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\n\nVehicle Count: ${vehicleCount}\n`;
              
              window.location.href = `mailto:info@selftrack.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="font-sans text-[11px] font-[900] uppercase text-[#555759] tracking-wide mb-1 block">Full Name</label>
                   <input required name="name" type="text" className="w-full bg-[#f3f3f6] border border-black/5 rounded-lg px-4 py-3 font-sans text-[13px] outline-none focus:border-[#9ACA3C] focus:ring-1 focus:ring-[#9ACA3C]" />
                </div>
                <div>
                   <label className="font-sans text-[11px] font-[900] uppercase text-[#555759] tracking-wide mb-1 block">Company Name</label>
                   <input required name="company" type="text" className="w-full bg-[#f3f3f6] border border-black/5 rounded-lg px-4 py-3 font-sans text-[13px] outline-none focus:border-[#9ACA3C] focus:ring-1 focus:ring-[#9ACA3C]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="font-sans text-[11px] font-[900] uppercase text-[#555759] tracking-wide mb-1 block">Email</label>
                   <input required name="email" type="email" className="w-full bg-[#f3f3f6] border border-black/5 rounded-lg px-4 py-3 font-sans text-[13px] outline-none focus:border-[#9ACA3C] focus:ring-1 focus:ring-[#9ACA3C]" />
                </div>
                <div>
                   <label className="font-sans text-[11px] font-[900] uppercase text-[#555759] tracking-wide mb-1 block">Phone</label>
                   <input required name="phone" type="tel" className="w-full bg-[#f3f3f6] border border-black/5 rounded-lg px-4 py-3 font-sans text-[13px] outline-none focus:border-[#9ACA3C] focus:ring-1 focus:ring-[#9ACA3C]" />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#9ACA3C] text-white font-sans text-[15px] font-[900] uppercase tracking-widest py-4 px-8 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all mb-4">
                  SUBMIT REQUEST &rarr;
                </button>
                <button 
                  type="button"
                  onClick={onStartOver}
                  className="w-full bg-transparent text-[#555759] font-sans text-[15px] font-[900] uppercase tracking-widest py-4 px-8 rounded-xl border-2 border-black/10 hover:bg-[#555759] hover:text-white transition-colors"
                >
                  RESTART BUILDER &#x21ba;
                </button>
              </div>
              
              <div className="text-center font-sans text-[13px] font-bold text-[#555759]/60 mt-4">
                &#128222; 012 460 1495 &middot; WhatsApp: 066 480 5375 &middot; info@selftrack.co.za
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
