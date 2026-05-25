import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function IndustrySolutions() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[600px] flex items-center pt-8 pb-16 overflow-hidden bg-[#191c1e]">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-30" 
            alt="Modern logistics fleet of white trucks driving on a highway at dusk" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBzSlaLVzCNmNTWk04_t6cGTndTyH4y1KjvLV1gfwC4vlJfJbn7z3fPWaL5FPda4h3YIuQoAahVoys37tkfL0xIC2jNbvTLVnlnbwvgmWoJdP940EMizSyp_gWFuMCqpjpaLQ2p-pUpdML6RSl85VBk15jZP0kctAXdQLiOHLIXzHRAkcCctAHi1acZHsJkJBPDQrGvtKwO8bHyV1sNCeLQWT8I66h_PvAMEr65u0_-A-vqAE_r9ikSTSB9Pk3sjO7CZyu129MKT8l" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#191c1e] via-[#191c1e]/90 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
          <span className="inline-block text-[#9ACA3C] font-black tracking-[0.2em] text-sm mb-4 uppercase">SELFFLEET</span>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl mb-8">
            Fleet Solutions for <br />
            <span className="text-[#9ACA3C]">Logistics Companies</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mb-12 font-regular leading-relaxed">
            Reduce fuel costs, improve driver compliance, and gain real-time visibility — from a single delivery vehicle to a large logistics fleet. Scalable, affordable, and built to keep your business moving efficiently.
          </p>
          {/* Brand tagline from SELFFLEET_PAGE.docx */}
          <p className="text-[#9ACA3C] font-black uppercase tracking-widest text-xs mb-12">
            Real-time visibility · Smarter operations · Complete fleet control
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/get-quote" className="px-10 py-5 bg-[#9ACA3C] text-white font-black text-sm uppercase tracking-widest rounded-lg hover:scale-95 transition-all shadow-2xl shadow-[#9ACA3C]/20 flex items-center justify-center">
              Request Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Driver Tag Technology section — full-width dark spotlight (premium B2B treatment) */}
      <section className="relative py-24 bg-[#191c1e] overflow-hidden">

        {/* Subtle lime radial accent — mirrors Hero's premium pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_85%_30%,#9ACA3C_0%,transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">

          {/* CENTERED OPENER */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-[#9ACA3C] font-black tracking-[0.25em] text-xs mb-4 uppercase block">
              Exclusive Technology
            </span>

            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
              Driver Tag <span className="text-[#9ACA3C]">Technology</span>
            </h2>

            {/* Centered lime divider */}
            <div className="h-1.5 w-24 bg-[#9ACA3C] mx-auto mb-10" aria-hidden="true"></div>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-regular">
              Our Driver Tag technology adds an extra layer of control by ensuring only authorised drivers can operate assigned vehicles. Every trip is linked to a specific driver, providing accurate trip records, improved accountability, and added theft prevention.
            </p>
          </div>

          {/* 3 BIG BENEFIT BLOCKS — replaces weak pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Block 1 — Authorised Access */}
            <div className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center hover:bg-white/[0.08] hover:border-[#9ACA3C]/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(154,202,60,0.3)] transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-[#9ACA3C]/15 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#9ACA3C]/25 group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-[#9ACA3C]" style={{ fontSize: "36px" }}>verified_user</span>
              </div>
              <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-3">
                Authorised Access
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-regular">
                Only assigned drivers can operate each vehicle in your fleet.
              </p>
            </div>

            {/* Block 2 — Trip Accountability */}
            <div className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center hover:bg-white/[0.08] hover:border-[#9ACA3C]/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(154,202,60,0.3)] transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-[#9ACA3C]/15 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#9ACA3C]/25 group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-[#9ACA3C]" style={{ fontSize: "36px" }}>person_pin</span>
              </div>
              <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-3">
                Trip Accountability
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-regular">
                Every journey is linked to a specific driver for accurate records.
              </p>
            </div>

            {/* Block 3 — Theft Prevention */}
            <div className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center hover:bg-white/[0.08] hover:border-[#9ACA3C]/50 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(154,202,60,0.3)] transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-[#9ACA3C]/15 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#9ACA3C]/25 group-hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-[#9ACA3C]" style={{ fontSize: "36px" }}>shield_lock</span>
              </div>
              <h3 className="text-white font-black uppercase tracking-tighter text-lg mb-3">
                Theft Prevention
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-regular">
                Unauthorised drivers cannot operate the vehicle, protecting your assets.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-black text-[#555759] uppercase tracking-tighter mb-6">Core Logistics Challenges</h2>
            <div className="h-1.5 w-24 bg-[#9ACA3C]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-8 bg-[#f3f3f6] rounded-xl group hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#9ACA3C]">
              <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-6 block">local_gas_station</span>
              <h3 className="text-xl font-black text-[#555759] mb-4 uppercase tracking-tight">High Fuel Costs</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Unmonitored idling, speeding, and fuel siphoning drain your bottom line daily.</p>
            </div>
            <div className="p-8 bg-[#f3f3f6] rounded-xl group hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#9ACA3C]">
              <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-6 block">badge</span>
              <h3 className="text-xl font-black text-[#555759] mb-4 uppercase tracking-tight">Driver Accountability</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Lack of visibility into driver behavior leads to increased risk and liability.</p>
            </div>
            <div className="p-8 bg-[#f3f3f6] rounded-xl group hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#9ACA3C]">
              <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-6 block">route</span>
              <h3 className="text-xl font-black text-[#555759] mb-4 uppercase tracking-tight">Route Inefficiency</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Manual dispatching results in unnecessary mileage and missed delivery windows.</p>
            </div>
            <div className="p-8 bg-[#f3f3f6] rounded-xl group hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#9ACA3C]">
              <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-6 block">lock_reset</span>
              <h3 className="text-xl font-black text-[#555759] mb-4 uppercase tracking-tight">Cargo Theft</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">High-value goods are vulnerable without live environmental and visual monitoring.</p>
            </div>
            {/* Geofencing & Alerts card — closes geofencing gap from SELFFLEET_PAGE.docx */}
            <div className="p-8 bg-[#f3f3f6] rounded-xl group hover:bg-white hover:shadow-2xl transition-all duration-500 border-b-4 border-transparent hover:border-[#9ACA3C]">
              <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-6 block">share_location</span>
              <h3 className="text-xl font-black text-[#555759] mb-4 uppercase tracking-tight">Zone & Movement Alerts</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Set up geofencing zones and receive instant alerts the moment any vehicle enters or exits assigned areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Section */}
      <section className="py-24 bg-[#edeef0]/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-[#555759] tracking-tighter mb-6 uppercase">The Ultimate Logistics Stack</h2>
            <p className="text-[#555759]/60 max-w-2xl mx-auto font-bold uppercase tracking-widest text-sm">Seamlessly integrated hardware and software designed to work in tandem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative shadow-2xl rounded-2xl overflow-hidden">
            {/* Tier 1 */}
            <div className="bg-white p-12 border-r border-[#edeef0] relative group hover:bg-[#f3f3f6] transition-all">
              <div className="mb-10">
                <span className="text-[#9ACA3C] font-black uppercase text-[10px] tracking-[0.3em] block mb-4">Tier 01</span>
                <h3 className="text-3xl font-black text-[#555759] uppercase italic tracking-tighter">SelfTRACK</h3>
                <p className="text-[#555759]/60 text-sm mt-3 font-black uppercase tracking-widest">Advanced Supervisor Telematics</p>
              </div>
              <ul className="space-y-5 mb-16 text-sm text-[#555759]/80 font-bold uppercase tracking-tight">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Real-time GPS Tracking</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Engine Diagnostics</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Speed Monitoring</li>
              </ul>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-[#9ACA3C] w-10 h-10 rounded-full hidden md:flex items-center justify-center text-white shadow-xl">
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </div>
            </div>
            {/* Tier 2 */}
            <div className="bg-white p-12 border-r border-[#edeef0] relative group hover:bg-[#f3f3f6] transition-all">
              <div className="mb-10">
                <span className="text-[#9ACA3C] font-black uppercase text-[10px] tracking-[0.3em] block mb-4">Tier 02</span>
                <h3 className="text-3xl font-black text-[#555759] uppercase italic tracking-tighter">SelfCAM</h3>
                <p className="text-[#555759]/60 text-sm mt-3 font-black uppercase tracking-widest">Live AI DashCam System</p>
              </div>
              <ul className="space-y-5 mb-16 text-sm text-[#555759]/80 font-bold uppercase tracking-tight">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Driver Fatigue Alerts</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> 4G Live Video Stream</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Impact Detection</li>
              </ul>
              <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-[#9ACA3C] w-10 h-10 rounded-full hidden md:flex items-center justify-center text-white shadow-xl">
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </div>
            </div>
            {/* Tier 3 */}
            <div className="bg-white p-12 group hover:bg-[#f3f3f6] transition-all">
              <div className="mb-10">
                <span className="text-[#9ACA3C] font-black uppercase text-[10px] tracking-[0.3em] block mb-4">Tier 03</span>
                <h3 className="text-3xl font-black text-[#555759] uppercase italic tracking-tighter">SelfFLEET</h3>
                <p className="text-[#555759]/60 text-sm mt-3 font-black uppercase tracking-widest">Full FMIS Integration</p>
              </div>
              <ul className="space-y-5 mb-16 text-sm text-[#555759]/80 font-bold uppercase tracking-tight">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Maintenance Scheduling</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Fuel Management System</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#9ACA3C] font-black">check</span> Cost Analysis Dashboard</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 text-center">
            <Link to="/solution-builder" className="bg-[#9ACA3C] text-white px-16 py-6 font-black uppercase tracking-[0.3em] rounded-lg hover:scale-105 transition-all shadow-2xl shadow-[#9ACA3C]/40 text-sm inline-block">
              Build Your Logistics Fleet Solution
            </Link>
          </div>
        </div>
      </section>

      {/* Solution Matrix */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-[#555759] tracking-tighter mb-4 uppercase">The Kinetic Response</h2>
            <p className="text-[#555759]/60 font-bold uppercase tracking-widest text-sm">Transforming logistics challenges into operational flow.</p>
          </div>
          <div className="space-y-4">
            {[
              { challenge: "Fuel Waste", icon: "warning", solution: "Route Optimisation", tool: "SelfFLEET" },
              { challenge: "Driver Behaviour", icon: "person_alert", solution: "Telematics + Scoring", tool: "SelfTRACK" },
              { challenge: "Route Inefficiency", icon: "alt_route", solution: "Automated Planning", tool: "SelfFLEET" },
              { challenge: "Cargo Theft", icon: "lock_open", solution: "Live Camera Monitoring", tool: "SelfCAM" }
             ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center justify-between bg-[#f3f3f6] py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-transparent hover:border-[#9ACA3C] gap-4 md:gap-0">
                <div className="flex items-center gap-4 w-full md:w-[40%]">
                  <span className="material-symbols-outlined text-red-500 text-xl font-black">{item.icon}</span>
                  <span className="font-black text-[#555759] text-[13px] uppercase tracking-tight">{item.challenge}</span>
                </div>
                <div className="hidden md:flex justify-center px-4">
                  <span className="material-symbols-outlined text-[#9ACA3C] text-xl font-black">trending_flat</span>
                </div>
                <div className="flex justify-center md:hidden w-full">
                  <span className="material-symbols-outlined text-[#9ACA3C] text-xl font-black rotate-90">trending_flat</span>
                </div>
                <div className="flex items-center justify-between w-full md:w-[50%]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#9ACA3C] text-xl font-black">check_circle</span>
                    <span className="font-black text-[#555759] text-[13px] uppercase tracking-tight">{item.solution}</span>
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[15px] font-[800] uppercase text-[#27500a] border-b-[2.5px] border-[#9ACA3C] pb-0.5">{item.tool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Telematics Data Does for Your Business */}
      <section className="py-24 bg-[#fafcfa]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#555759] tracking-tighter mb-6 uppercase">What Telematics Data Does for Your Business</h2>
            <div className="h-1.5 w-24 bg-[#9ACA3C] mx-auto"></div>
          </div>
          <div className="max-w-[700px] mx-auto">
            {[
              "Reduce fuel waste by correcting poor idling habits",
              "Improve driver accountability and road behaviour",
              "Identify driver training needs through performance gaps",
              "Automate compliance documentation and reporting",
              "Reduce accident risk through proactive monitoring",
              "Lower insurance premiums with verifiable safety data"
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-4 py-[12px] border-b border-[#f0f2ec] last:border-b-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <circle cx="8" cy="8" r="8" fill="#9ACA3C"/>
                  <path d="M11.5 5.5L6.5 10.5L4.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ fontFamily: "'Inter', sans-serif" }} className="text-[14px] text-[#2d3a1e]">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-[#9ACA3C] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-white space-y-16">
            <h2 className="text-white/70 font-black tracking-widest text-sm uppercase mb-8">Performance Impact</h2>
            <div className="space-y-12">
              <div>
                <div className="text-8xl font-black leading-none tracking-tighter">24%</div>
                <div className="text-[#395200] uppercase font-black tracking-widest mt-4 text-sm opacity-80">Fuel reduction within 6 months</div>
              </div>
              <div>
                <div className="text-8xl font-black leading-none tracking-tighter">18%</div>
                <div className="text-[#395200] uppercase font-black tracking-widest mt-4 text-sm opacity-80">Reduction in overtime claims</div>
              </div>
              <div>
                <div className="text-8xl font-black leading-none tracking-tighter">100%</div>
                <div className="text-[#395200] uppercase font-black tracking-widest mt-4 text-sm opacity-80">Real-time fleet visibility</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-16 rounded-xl shadow-2xl transform lg:translate-x-12 border border-black/5">
              <span className="material-symbols-outlined text-[#9ACA3C] text-6xl mb-8 font-black">format_quote</span>
              <p className="text-[#555759] text-2xl italic font-medium mb-12 leading-relaxed">
                "Selftrack didn't just give us dots on a map; they gave us a lens into our entire logistics operation. We've eliminated fuel waste and dramatically improved our delivery reliability."
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#f3f3f6] rounded-full flex items-center justify-center font-black text-[#9ACA3C] text-xl shadow-inner">JD</div>
                <div>
                  <div className="font-black text-[#555759] uppercase tracking-tighter text-lg">Johan de Villiers</div>
                  <div className="text-sm text-[#555759]/50 font-bold uppercase tracking-widest">Fleet Operations Manager, Logistics Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
