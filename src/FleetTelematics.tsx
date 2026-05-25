import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function FleetTelematics() {
  return (
    <div className="bg-surface font-sans text-on-surface">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          {/* Left 55% Content */}
          <div className="md:w-[55%] space-y-8">
            <span className="text-[#9ACA3C] font-black tracking-widest text-sm uppercase block">Fleet Telematics & Driver Behaviour</span>
            <h1 className="text-5xl md:text-7xl font-black text-[#555759] leading-[1.1] tracking-tight">
              Turn Your Fleet <br /> Data Into <span className="text-[#9ACA3C]">Business <br /> Intelligence</span>
            </h1>
            <p className="text-xl text-[#555759]/70 leading-relaxed max-w-xl font-regular">
              Advanced driver scoring and real-time analytics designed to transform raw telematics into actionable safety and efficiency improvements.
            </p>
          <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/get-quote" className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black text-lg hover:bg-[#496800] transition-all shadow-2xl shadow-[#9ACA3C]/20 uppercase tracking-widest">
                Book Demo
              </Link>
              <Link to="/solution-builder" className="border-2 border-[#555759] text-[#555759] px-10 py-5 rounded-lg font-black text-lg hover:bg-[#555759] hover:text-white transition-all uppercase tracking-widest flex items-center justify-center">
                Build Your Solution
              </Link>
            </div>
          </div>

          {/* Right 45% Visual */}
          <div className="md:w-[45%] relative">
            <div className="relative z-10 bg-white rounded-xl shadow-[0_32px_48px_-12px_rgba(85,87,89,1.0)] p-8 border border-[#edeef0]/50">
              {/* Driver Score Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-[#f3f3f6] p-4 rounded-lg text-center border-b-4 border-[#9ACA3C]">
                  <span className="text-[10px] font-black text-[#555759]/40 uppercase block mb-1 tracking-widest">Safety Grade</span>
                  <span className="text-4xl font-black text-[#9ACA3C]">A</span>
                </div>
                <div className="bg-[#f3f3f6] p-4 rounded-lg text-center">
                  <span className="text-[10px] font-black text-[#555759]/40 uppercase block mb-1 tracking-widest">Efficiency</span>
                  <span className="text-4xl font-black text-[#555759]">B+</span>
                </div>
                <div className="bg-[#f3f3f6] p-4 rounded-lg text-center border-b-4 border-red-500/20">
                  <span className="text-[10px] font-black text-red-500/60 uppercase block mb-1 tracking-widest">Compliance</span>
                  <span className="text-4xl font-black text-red-500">C</span>
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="space-y-6">
                <div className="flex justify-between items-end h-32 gap-2">
                  <div className="w-full bg-[#9ACA3C]/20 h-[30%] rounded-t-sm"></div>
                  <div className="w-full bg-[#9ACA3C]/40 h-[50%] rounded-t-sm"></div>
                  <div className="w-full bg-[#9ACA3C] h-[100%] rounded-t-sm shadow-lg shadow-[#9ACA3C]/20"></div>
                  <div className="w-full bg-[#555759] h-[60%] rounded-t-sm"></div>
                  <div className="w-full bg-[#9ACA3C] h-[80%] rounded-t-sm shadow-lg shadow-[#9ACA3C]/20"></div>
                  <div className="w-full bg-[#9ACA3C]/60 h-[40%] rounded-t-sm"></div>
                </div>
                
                <div className="border-t border-[#edeef0] pt-6">
                  <h4 className="text-[10px] font-black text-[#555759] uppercase mb-4 tracking-[0.2em] opacity-60">Recent Speeding Incidents</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#f3f3f6] rounded border-l-4 border-red-500">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                        <span className="text-xs font-black text-[#555759]">Truck #402 — M1 Highway</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#555759]/50">14:22 PM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#f3f3f6] rounded border-l-4 border-amber-500">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-amber-500 text-lg">speed</span>
                        <span className="text-xs font-black text-[#555759]">Van #12 — Urban Zone</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#555759]/50">09:15 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Kinetic Element */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#9ACA3C]/5 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-[#f3f3f6]">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-4 mb-20">
            <div className="h-1.5 w-16 bg-[#9ACA3C]"></div>
            <h2 className="text-4xl font-black text-[#555759] uppercase tracking-tighter">Metrics That Matter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-sm border-b-4 border-transparent hover:border-[#9ACA3C] hover:shadow-2xl transition-all duration-500 group">
              <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-8 block font-black">speed</span>
              <h3 className="text-xl font-black text-[#555759] mb-4">Driver Behaviour Score</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">0-100 scoring based on comprehensive safety parameters and incident frequency.</p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border-b-4 border-transparent hover:border-[#9ACA3C] hover:shadow-2xl transition-all duration-500 group">
              <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-8 block font-black">notifications_active</span>
              <h3 className="text-xl font-black text-[#555759] mb-4">Speeding Detection</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Real-time alerts triggered by pre-defined fleet thresholds and local road limits.</p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border-b-4 border-transparent hover:border-[#9ACA3C] hover:shadow-2xl transition-all duration-500 group">
              <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-8 block font-black">emergency</span>
              <h3 className="text-xl font-black text-[#555759] mb-4">Harsh Events</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Automated monitoring of heavy braking, aggressive acceleration, and sharp cornering.</p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm border-b-4 border-transparent hover:border-[#9ACA3C] hover:shadow-2xl transition-all duration-500 group">
              <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-8 block font-black">local_gas_station</span>
              <h3 className="text-xl font-black text-[#555759] mb-4">Idling Reports</h3>
              <p className="text-[#555759]/60 text-sm leading-relaxed font-regular">Deep dive analysis into wasted engine time, excessive fuel consumption, and operational leaks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-[#555759]">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-5xl font-black text-white mb-24 text-center tracking-tight">What Telematics Data Does for Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-24">
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">01</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Reduce accident risk through proactive monitoring.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">02</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Lower insurance premiums with verifiable safety data.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">03</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Improve driver accountability and road ethics.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">04</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Reduce fuel waste by correcting poor idling habits.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">05</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Identify driver training needs with performance gaps.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
            <div className="flex gap-8 group">
              <span className="text-7xl font-black text-[#9ACA3C] leading-none opacity-20 group-hover:opacity-100 transition-opacity">06</span>
              <div>
                <p className="text-xl font-black text-white leading-tight uppercase tracking-wide">Automate compliance documentation and reporting.</p>
                <div className="h-1 w-12 bg-[#9ACA3C] mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Sell Strip */}
      <section className="bg-[#9ACA3C] py-12">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">Pair with SelfFLEET for Complete Fleet Optimisation</h3>
          <Link to="#" className="bg-white text-[#555759] px-10 py-4 rounded-lg font-black uppercase text-sm hover:shadow-xl transition-all flex items-center gap-3 tracking-[0.2em]">
            See SelfFLEET
            <span className="material-symbols-outlined font-black">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 text-center relative z-10">
          <h2 className="text-6xl font-black text-[#555759] mb-12 uppercase tracking-tighter">Ready to Optimize Your Fleet?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/get-quote" className="bg-[#9ACA3C] text-white px-12 py-6 rounded-lg font-black text-xl hover:bg-[#496800] transition-all shadow-2xl shadow-[#9ACA3C]/20 uppercase tracking-widest">
              Book Demo
            </Link>
            <button className="border-4 border-[#555759] text-[#555759] px-12 py-6 rounded-lg font-black text-xl hover:bg-[#555759] hover:text-white transition-all uppercase tracking-widest">
              See Pricing
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3f3f6] -skew-x-12 translate-x-1/2"></div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
