import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RouteOptimisation() {
  return (
    <div className="bg-background text-on-background selection:bg-primary-container">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-white py-20 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-[#9ACA3C] font-black tracking-[0.2em] text-sm uppercase">ROUTE OPTIMISATION — SELFFLEET</p>
              <h1 className="text-5xl md:text-7xl font-black text-[#555759] leading-[1.1] tracking-tight">
                Cut Fuel Costs and Delivery Times with Smart Route Planning
              </h1>
              <p className="text-xl text-on-surface-variant max-w-xl font-regular leading-relaxed">
                Automated route planning that reduces fuel, increases delivery capacity, and improves SLA compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black uppercase text-sm hover:opacity-90 transition-all shadow-xl shadow-[#9ACA3C]/20">
                  Calculate My Fleet Savings
                </button>
                <Link to="/get-quote" className="border-2 border-[#555759] text-[#555759] px-10 py-5 rounded-lg font-black uppercase text-sm hover:bg-[#555759] hover:text-white transition-all flex items-center justify-center">
                  Book Fleet Demo
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#9ACA3C]/10 rounded-2xl blur-3xl group-hover:bg-[#9ACA3C]/20 transition-all"></div>
              <div className="relative rounded-xl overflow-hidden bg-surface-container aspect-video shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Fleet route optimisation dashboard with bright green paths on a city map"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRPAAiDqJS1AvK82hdZZ9aF5WybGoCTSwy70evdCXbwM3tEfWDL3NFU8Wb5HkWEcxlF5CFBJSJsyBDJwyD0IwsX0VRUnf7l_OPBb_pDVn1FcYhYzXXllrOGQDOtR3uMk2h3_0GYi4e68m6qOYPc9Km3iGrz0dW7rQCqVcL-invidyHDhFelnmi7V_tmZT7xLg_Qcv202avphI0x7wBq8F-DeQ5rux0C1VISOQFjqy63mqBbf7vFR_5AqbrO4ZskJCpJNTVp4dIahBu"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="bg-[#f3f3f6] py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#555759] uppercase tracking-tighter">How Much Could You Save?</h2>
              <div className="w-24 h-1.5 bg-[#9ACA3C] mx-auto mt-6"></div>
            </div>
            <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">
              <div className="lg:w-1/2 p-12 space-y-8">
                <div className="space-y-6 text-[#555759]">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Number of vehicles</label>
                    <input
                      className="w-full p-4 bg-[#f3f3f6] border-l-4 border-transparent focus:border-[#9ACA3C] outline-none font-bold text-lg rounded-r-lg transition-all"
                      placeholder="e.g. 50"
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Average monthly fuel spend (R)</label>
                    <input
                      className="w-full p-4 bg-[#f3f3f6] border-l-4 border-transparent focus:border-[#9ACA3C] outline-none font-bold text-lg rounded-r-lg transition-all"
                      placeholder="R 250,000"
                      type="text"
                    />
                  </div>
                </div>
                <button className="w-full bg-[#9ACA3C] text-white py-5 rounded-lg font-black uppercase tracking-widest text-sm hover:brightness-105 shadow-xl shadow-[#9ACA3C]/20">
                  Calculate My Savings
                </button>
              </div>
              <div className="lg:w-1/2 bg-[#9ACA3C] p-12 text-white flex flex-col justify-center">
                <p className="text-white/80 font-black uppercase tracking-[0.2em] text-xs mb-4">Projected Annual Savings</p>
                <div className="text-6xl md:text-7xl font-black mb-8 leading-none">R 1,420,000</div>
                <div className="space-y-6 border-t border-white/20 pt-8 mt-4">
                  <div className="flex justify-between items-center group">
                    <span className="font-bold uppercase tracking-wider text-sm">Fuel Efficiency Gain</span>
                    <span className="text-3xl font-black">22%</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="font-bold uppercase tracking-wider text-sm">Insurance Reduction</span>
                    <span className="text-3xl font-black">15%</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="font-bold uppercase tracking-wider text-sm">Overtime Savings</span>
                    <span className="text-3xl font-black">18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-[#555759] uppercase tracking-tighter leading-[1.1]">What Route Optimisation Does</h2>
                <p className="mt-4 text-on-surface-variant text-lg">Harnessing advanced telemetry and predictive algorithms to keep your fleet in constant, efficient motion.</p>
              </div>
              <div className="h-0.5 flex-1 bg-[#edeef0] hidden md:block mb-4 ml-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">route</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Automated route planning</h3>
                  <p className="text-on-surface-variant leading-relaxed">Instantly generate the most efficient routes for thousands of stops based on vehicle capacity and priority.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">traffic</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Real-time traffic-aware</h3>
                  <p className="text-on-surface-variant leading-relaxed">Dynamic rerouting that accounts for current traffic conditions and incidents in real-time.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">assignment_ind</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Job dispatch & scheduling</h3>
                  <p className="text-on-surface-variant leading-relaxed">Direct digital manifest dispatch to driver mobile apps with sequence locking and navigation integration.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">schedule</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Window Compliance</h3>
                  <p className="text-on-surface-variant leading-relaxed">Strict adherence to customer-requested delivery windows with predictive ETA alerts for recipients.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">verified</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Proof of delivery capture</h3>
                  <p className="text-on-surface-variant leading-relaxed">Digital signatures, photo evidence, and geofenced arrival stamps for 100% auditable proof.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-[#9ACA3C]/10 flex items-center justify-center rounded-xl group-hover:bg-[#9ACA3C] transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[#9ACA3C] group-hover:text-white text-3xl shrink-0">timer_off</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#555759] mb-3 uppercase tracking-tight">Overtime reduction</h3>
                  <p className="text-on-surface-variant leading-relaxed">Smart scheduling that ensures routes are completed within standard working hours, cutting costs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sectors Section */}
        <section className="bg-[#555759] py-24 px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-16">Built for Delivery Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/5 p-8 rounded-xl border-l-[3px] border-[#9ACA3C] hover:bg-white/10 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="material-symbols-outlined text-[#9ACA3C] text-4xl mb-6">local_shipping</span>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">Last-mile Delivery</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">Optimise high-density urban drops with precision timing for e-commerce and retail.</p>
                </div>
                <Link to="#" className="text-[#9ACA3C] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-white/5 p-8 rounded-xl border-l-[3px] border-[#9ACA3C] hover:bg-white/10 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="material-symbols-outlined text-[#9ACA3C] text-4xl mb-6">distance</span>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">Logistics & Long Haul</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">Fuel-centric planning for heavy-duty inter-city transport and supply chain hubs.</p>
                </div>
                <Link to="#" className="text-[#9ACA3C] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-white/5 p-8 rounded-xl border-l-[3px] border-[#9ACA3C] hover:bg-white/10 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="material-symbols-outlined text-[#9ACA3C] text-4xl mb-6">engineering</span>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">Field Service</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">Coordinate technicians and maintenance crews based on skill-sets and proximity.</p>
                </div>
                <Link to="#" className="text-[#9ACA3C] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-white/5 p-8 rounded-xl border-l-[3px] border-[#9ACA3C] hover:bg-white/10 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="material-symbols-outlined text-[#9ACA3C] text-4xl mb-6">inventory</span>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4">Courier Services</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8">Dynamic scheduling for rapid-response parcel pick-up and delivery networks.</p>
                </div>
                <Link to="#" className="text-[#9ACA3C] font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                  Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="bg-[#9ACA3C] py-16 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Ready to streamline your fleet?</h2>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <Link to="/get-quote" className="bg-[#555759] text-white px-10 py-5 rounded-lg font-black uppercase text-sm tracking-widest hover:brightness-125 transition-all shadow-2xl flex items-center justify-center">
                Book Fleet Demo
              </Link>
              <Link to="/get-quote" className="text-white font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2">
                Or request a custom quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
