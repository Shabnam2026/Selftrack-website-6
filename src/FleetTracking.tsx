import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Layers, Truck } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function FleetTracking() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-[#555759] min-h-[700px] flex items-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 relative z-10">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[#9ACA3C] font-black tracking-widest text-sm mb-4 uppercase">
                REAL-TIME FLEET MANAGEMENT
              </span>
              <h1 className="text-white open-sans-black font-black text-5xl md:text-6xl leading-tight mb-6">
                Full Visibility Over Every Vehicle in Your Fleet
              </h1>
              <p className="text-white/80 text-xl font-regular max-w-2xl mb-10 leading-relaxed">
                Real-time GPS, driver monitoring, and 24/7 theft protection for
                businesses of all sizes. Built for precision, reliability, and
                speed.
              </p>
              {/* Brand tagline from SELFTRACK_PAGE.docx */}
              <p className="text-[#9ACA3C] font-black uppercase tracking-widest text-xs mb-10">
                Flexible · Reliable · Built around what matters most
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/get-quote" className="bg-[#9ACA3C] text-[#395200] px-10 py-5 rounded-lg font-black uppercase text-sm hover:scale-105 transition-transform shadow-lg shadow-[#9ACA3C]/20 flex items-center justify-center">
                  Book Fleet Demo
                </Link>
                <Link to="/solution-builder" className="border-2 border-white text-white px-10 py-5 rounded-lg font-black uppercase text-sm hover:bg-white/10 transition-colors flex items-center justify-center">
                  Build Your Fleet Solution
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 md:gap-10 text-white/90 text-sm font-bold border-t border-white/10 pt-8 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9ACA3C]/20 flex items-center justify-center text-[#9ACA3C] ring-1 ring-[#9ACA3C]/40">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="leading-tight">20+ Years<br/>Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9ACA3C]/20 flex items-center justify-center text-[#9ACA3C] ring-1 ring-[#9ACA3C]/40">
                    <Layers size={20} />
                  </div>
                  <span className="leading-tight">Integrated<br/>Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#9ACA3C]/20 flex items-center justify-center text-[#9ACA3C] ring-1 ring-[#9ACA3C]/40">
                    <Truck size={20} />
                  </div>
                  <span className="leading-tight">Any size<br/>Fleets</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-full aspect-square max-w-lg">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[#e2e2e4] rounded-xl p-2 shadow-2xl relative z-10 border border-white/10 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="High-tech fleet management dashboard showing real-time vehicle icons moving on a map"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyJqmzXTJcnL8__BH-6K_9i1Gmf72Rhq0zPSlKqf46_7waenJzSwyynb9-3C16K2v3ePviFhWEYUvWIOHUPHS6AbIobaKbzRVqIs_ykFrTI1aaIfxve6n4LFKkEe0a9sTMTHCAVRIXCnfjd5P--RPZ2VUJTxlvNyEq4aAudEOFyoiTc1P8nGvfxohWEEiVE8h8qEoX9T8_-wJ-FBnhGn8LBmwnPudt2fNqN4eCH8GzgbwejkN4gEsGVAoxSdtDkwNx8s8sBCspASTC"
                  />
                  <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl border border-[#edeef0] flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#9ACA3C]/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#496800]">local_shipping</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#555759]/60 font-black uppercase tracking-wider">Active Unit</p>
                      <p className="text-[#555759] font-black text-sm">ND 459-201 | Moving</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <h2 className="open-sans-black font-black text-4xl text-[#555759] mb-16">
              Complete Fleet Visibility — In Real Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">map</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Live Fleet Map</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Track your entire fleet on a single, responsive map with real-time updates and status indicators.</p>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">person_pin</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Driver Identification</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Know exactly who is behind the wheel with digital driver tagging and historical logging.</p>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">history</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Trip History & Playback</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Review previous routes with frame-by-frame playback to verify deliveries and time-on-site.</p>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">grid_view</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Geofence Zones</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Set virtual boundaries and receive instant alerts when vehicles enter or exit specific areas.</p>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">security</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Stolen Vehicle Recovery</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Advanced jamming detection and recovery support to protect your high-value assets 24/7.</p>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">analytics</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Fleet Reports & Analytics</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Make data-driven decisions with automated reports on fuel usage, idle time, and driver behavior.</p>
              </div>
              {/* From SELFTRACK_PAGE.docx — closes 'Speed and tamper notifications' gap */}
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">speed</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Speed & Tamper Alerts</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Get instant notifications for excessive speeding events and device tampering attempts to keep your fleet safe.</p>
              </div>
              {/* From SELFTRACK_PAGE.docx — closes 'Dustproof and waterproof tracking devices' gap */}
              <div className="bg-[#f3f3f6] p-10 rounded-lg group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#9ACA3C]/20">
                <span className="material-symbols-outlined text-4xl text-[#9ACA3C] mb-6">water_drop</span>
                <h3 className="open-sans-black font-black text-xl text-[#555759] mb-4">Weatherproof Devices</h3>
                <p className="text-[#555759]/70 leading-relaxed font-regular">Rugged, dustproof and waterproof tracking devices built to survive the toughest fleet environments and weather conditions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Stats Strip */}
        <section className="bg-[#9ACA3C] py-14">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-center gap-6 md:border-r border-white/20 md:pr-12 last:border-none last:pr-0">
              <span className="material-symbols-outlined text-white text-6xl opacity-90 block">
                local_gas_station
              </span>
              <span className="text-white open-sans-black font-black leading-tight uppercase text-xl md:text-2xl">
                Proven Fuel <br /> Savings
              </span>
            </div>
            <div className="flex items-center gap-6 md:border-r border-white/20 md:pr-12 last:border-none last:pr-0">
              <span className="material-symbols-outlined text-white text-6xl opacity-90 block">
                trending_up
              </span>
              <span className="text-white open-sans-black font-black leading-tight uppercase text-xl md:text-2xl">
                Increase in <br /> Productivity
              </span>
            </div>
            <div className="flex items-center gap-6 md:border-r border-white/20 md:pr-12 last:border-none last:pr-0">
              <span className="material-symbols-outlined text-white text-6xl opacity-90 block">
                speed
              </span>
              <span className="text-white open-sans-black font-black leading-tight uppercase text-xl md:text-2xl">
                Increased Driver <br /> Efficiency
              </span>
            </div>
          </div>
        </section>

        {/* Target Industries */}
        <section className="py-24 bg-[#f3f3f6]">
          <div className="max-w-[1440px] mx-auto px-8 text-center">
            <h2 className="open-sans-black font-black text-3xl text-[#555759] mb-16">Built for Your Industry</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  local_shipping
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Logistics
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  directions_bus
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Transport
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  car_rental
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Car Rental
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  construction
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Construction & Plant
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  security
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Security
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  agriculture
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Agriculture
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  health_and_safety
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Insurance
                </span>
              </div>
              <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center border-b-4 border-transparent hover:border-[#9ACA3C] transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-4xl text-[#555759] mb-4">
                  precision_manufacturing
                </span>
                <span className="font-bold text-[#555759] uppercase text-xs tracking-widest text-center">
                  Mining
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Upsell Ecosystem */}
        <section className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <h2 className="open-sans-black font-black text-4xl text-[#555759] mb-16 text-center">
              Start with Tracking. Scale to Full Fleet Management.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-lg border-2 border-[#9ACA3C] shadow-2xl shadow-[#9ACA3C]/10 text-center relative group">
                <div className="text-[#9ACA3C] open-sans-black font-black text-2xl mb-4 group-hover:scale-110 transition-transform">SelfTRACK</div>
                <p className="text-[#555759]/70 text-sm leading-relaxed">The core real-time GPS tracking and recovery solution for all vehicles.</p>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <span className="material-symbols-outlined text-[#edeef0] text-4xl">arrow_forward</span>
                </div>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg border border-transparent text-center relative hover:bg-white hover:shadow-xl transition-all">
                <div className="text-[#555759] open-sans-black font-black text-2xl mb-4">SelfCAM</div>
                <p className="text-[#555759]/70 text-sm leading-relaxed">Add AI-powered video telematics and real-time cabin monitoring to tracking.</p>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                  <span className="material-symbols-outlined text-[#edeef0] text-4xl">arrow_forward</span>
                </div>
              </div>
              <div className="bg-[#f3f3f6] p-10 rounded-lg border border-transparent text-center hover:bg-white hover:shadow-xl transition-all">
                <div className="text-[#555759] open-sans-black font-black text-2xl mb-4">SelfFLEET</div>
                <p className="text-[#555759]/70 text-sm leading-relaxed">Full Bureau Fleet Management with maintenance scheduling and tax logs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-[#555759] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-8 text-center relative z-10">
            <h2 className="open-sans-black font-black text-5xl text-[#9ACA3C] mb-12">
              Ready to Take Control of Your Fleet?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/get-quote" className="bg-[#9ACA3C] text-[#395200] px-12 py-6 rounded-lg font-black text-xl hover:shadow-2xl hover:shadow-[#9ACA3C]/30 transition-all active:scale-95 flex items-center justify-center">
                Book Fleet Demo
              </Link>
              <Link to="/solution-builder" className="border-2 border-white text-white px-12 py-6 rounded-lg font-black text-xl hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center">
                Find Your Solution
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9ACA3C] transform -skew-x-12 translate-x-1/2"></div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
