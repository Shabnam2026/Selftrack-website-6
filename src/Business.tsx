import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Layers, Truck, Navigation, Fuel, Activity, LifeBuoy, BookOpen, Gavel, Coins, ShieldAlert, BarChart, Wrench } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Business() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-[#555759] min-h-[819px] flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 relative z-10">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[#9ACA3C] font-black tracking-widest text-sm mb-6 uppercase">
                Fleet Management Solutions
              </span>
              <h1 className="text-white open-sans-black font-black text-5xl md:text-7xl leading-tight mb-6">
                Total Fleet Visibility <br />
                and Control
              </h1>
              <p className="text-white/80 text-xl max-w-xl mb-10 leading-relaxed">
                Asset & Driver Monitoring. Fleet Analytics & Optimisation.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/get-quote"
                  className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-black uppercase text-sm hover:scale-105 transition-transform flex items-center justify-center"
                >
                  Book Fleet Demo
                </Link>
                <Link
                  to="/solution-builder"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-black uppercase text-sm hover:bg-white/10 transition-colors flex items-center justify-center"
                >
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
              <div className="relative w-full aspect-square max-w-lg lg:translate-x-12">
                {/* Dashboard Mockup */}
                <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-xl shadow-2xl p-4 overflow-hidden border border-white/20">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="high-end professional fleet tracking dashboard interface showing detailed city map with glowing lime green vehicle pins and telemetry data panels"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6PPfJsnrApLGWownfQ2y8oefz76jEWNiiG8LDMx568Uzw-YooZQ0t37-cDxqpriqilAHDt1tzbqVjbKpi-QRP0BL6fgBmDjACPMcyJU3fuVbhhvY62Sps9S1BrzEH-c-VGialGNCsVhv30xqo4XbK70gUBZXaCK0GgjximCsJPpjthGJhpcwgcXsZRi0w7V8EQZHzPUtFAFshINspdYJ0zEym5gojI7g2rwPx61vtqJer7DvOAgaQ2bsDJWnrpUAqCT6SrMpp2GbM"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary-container p-6 rounded-lg shadow-xl text-on-primary-container font-black flex flex-col items-center">
                  <span className="text-3xl">99.8%</span>
                  <span className="text-[10px] uppercase tracking-tighter">
                    Uptime Reliability
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9ACA3C]/5 -skew-x-12 translate-x-1/2"></div>
        </section>
        {/* Product Highlights */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="open-sans-black font-black text-4xl text-[#555759] mb-4">
                The Complete Fleet Management Ecosystem
              </h2>
              <div className="w-24 h-1.5 bg-[#9ACA3C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* SelfTRACK */}
              <div className="bg-surface-container-low p-10 rounded-xl group hover:bg-white hover:shadow-xl transition-all duration-300">
                <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-6">
                  location_on
                </span>
                <h3 className="open-sans-black font-black text-2xl text-[#555759] mb-4">
                  SelfTRACK
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Advanced GPS tracking with real-time positioning, geofencing,
                  and comprehensive trip history logging for complete movement
                  oversight.
                </p>
              </div>
              {/* SelfCAM */}
              <div className="bg-surface-container-low p-10 rounded-xl group hover:bg-white hover:shadow-xl transition-all duration-300">
                <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-6">
                  videocam
                </span>
                <h3 className="open-sans-black font-black text-2xl text-[#555759] mb-4">
                  SelfCAM
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  AI-powered video telematics featuring driver fatigue
                  detection, road-facing incident recording, and live in-cab
                  coaching modules.
                </p>
              </div>
              {/* SelfFLEET */}
              <div className="bg-surface-container-low p-10 rounded-xl group hover:bg-white hover:shadow-xl transition-all duration-300">
                <span className="material-symbols-outlined text-5xl text-[#9ACA3C] mb-6">
                  analytics
                </span>
                <h3 className="open-sans-black font-black text-2xl text-[#555759] mb-4">
                  SelfFLEET
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Holistic fleet administration tools for maintenance
                  scheduling, fuel management, and automated driver behavior
                  scorecarding.
                </p>
              </div>
            </div>
            {/* Fleet Management Ecosystem */}
            <div className="mt-20 max-w-[1100px] mx-auto">
              <div className="text-center mb-9">
                <h2 className="font-bold text-[28px] text-[#1a2010] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Fleet Management Ecosystem
                </h2>
                <p className="text-[15px] text-[#5a6650]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Everything you need to manage, monitor and optimise your fleet in one platform
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
                {[
                  { title: "Asset Management", desc: "Track total lifecycle from purchase to resale", icon: Navigation },
                  { title: "Fuel Management", desc: "Monitor consumption and prevent fuel theft", icon: Fuel },
                  { title: "Driver Behaviour", desc: "Score cards for safety and efficiency metrics", icon: Activity },
                  { title: "Tyre Management", desc: "Monitor wear and schedule replacements", icon: LifeBuoy },
                  { title: "Digital Logbooks", desc: "Automated SARS-compliant digital travel logs", icon: BookOpen },
                  { title: "Fines Management", desc: "Automated traffic fine tracking and redirection", icon: Gavel },
                  { title: "e-Toll Management", desc: "Centralized toll expense monitoring", icon: Coins },
                  { title: "Accident Management", desc: "Streamlined incident reporting and claims", icon: ShieldAlert },
                  { title: "Reporting Dashboards", desc: "Custom BI visualisations for fleet data", icon: BarChart },
                  { title: "Maintenance Planning", desc: "Predictive servicing and repair scheduling", icon: Wrench },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className="bg-[#f8f9f6] border border-[#e8ebe2] rounded-xl px-[18px] py-[20px] cursor-default transition-all duration-150 ease-out hover:border-[#a8c070] hover:bg-white hover:shadow-[0_4px_16px_rgba(99,153,34,0.08)] hover:-translate-y-[2px]">
                      <Icon color="#9ACA3C" size={32} strokeWidth={1.5} />
                      <h3 className="font-bold text-[14px] text-[#1a2010] mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.title}</h3>
                      <p className="font-normal text-[12.5px] text-[#5a6650] leading-[1.55] mt-[6px]" style={{ fontFamily: "'Inter', sans-serif" }}>{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* ROI Callout Strip */}
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
        {/* Industries Strip */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="open-sans-black font-black text-3xl text-[#555759] text-center mb-16">
              Solutions for Every Industry
            </h2>
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
        {/* B2B Decision Tree Teaser */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="open-sans-black font-black text-4xl text-[#555759] mb-6">
                Find the Right Fleet <br />
                Solution in 6 Steps
              </h2>
              <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
                Not sure which hardware or software package fits your specific
                business needs? Our interactive solution builder analyses your
                fleet size, industry, and core challenges to recommend the most
                suitable solution.
              </p>
              <Link
                to="/solution-builder"
                className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black uppercase text-sm hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                Build Your Fleet Solution
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-surface-container p-8 rounded-2xl shadow-2xl relative z-10">
                <img
                  className="w-full h-auto rounded-lg"
                  alt="modern clean interactive infographic showing a 6-step decision tree for fleet management on a tablet screen with lime and charcoal elements"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHlhJFIjDTJG2IjfpLbGGzn3bkVZ9P16Jbu-9c0C_HbSdDgdsL_FJdDyzeWUgw8Rte3bzO4f2a_KZcopeeNqh1Cr7gjfGPanBlepFqzZhnw7o2GzaRunPxXUwGhCE0-og6UmayzYer7oU_T02G8gBMGWX9Q5yxuNBR1u8rn9OaeMY93yfqvmlu45933beeNNNIxQUHuQiN2zgN7tvj0qUsyJAWzj2b_NcpzbnFNb3Lj37oIMCBTMyl86jGyzcs0pqZX24bJ9SlK8JE"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#9ACA3C]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
        {/* Social Proof */}
        <section className="py-24 bg-[#555759]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-white open-sans-black font-black text-3xl mb-4">
                Trusted by Leading Businesses
              </h2>
              <div className="w-16 h-1 bg-[#9ACA3C] mx-auto opacity-50"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="bg-zinc-800/50 p-8 rounded-xl border border-white/5 hover:border-[#9ACA3C]/50 transition-colors">
                <span className="text-[#9ACA3C] font-bold text-xs uppercase tracking-widest mb-4 block">
                  National Logistics Firm
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      18%
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Lower Idle Time
                    </p>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      R1.2m
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Fuel Savings p.a.
                    </p>
                  </div>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "The real-time geofencing and route optimization changed how
                  we handle our Gauteng distribution. Selftrack is
                  indispensable."
                </p>
              </div>
              {/* Case Study 2 */}
              <div className="bg-zinc-800/50 p-8 rounded-xl border border-white/5 hover:border-[#9ACA3C]/50 transition-colors">
                <span className="text-[#9ACA3C] font-bold text-xs uppercase tracking-widest mb-4 block">
                  Mining Services Provider
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      100%
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Compliance Met
                    </p>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      0
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Lost Vehicles
                    </p>
                  </div>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "Managing a fleet in remote territories requires
                  absolute reliability. Selftrack's hardware handles the
                  terrain."
                </p>
              </div>
              {/* Case Study 3 */}
              <div className="bg-zinc-800/50 p-8 rounded-xl border border-white/5 hover:border-[#9ACA3C]/50 transition-colors">
                <span className="text-[#9ACA3C] font-bold text-xs uppercase tracking-widest mb-4 block">
                  Last-Mile Delivery Specialist
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      40%
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Fewer Accidents
                    </p>
                  </div>
                  <div className="w-px h-10 bg-white/10"></div>
                  <div className="text-white">
                    <span className="open-sans-black font-black text-3xl">
                      15min
                    </span>
                    <p className="text-[10px] uppercase text-zinc-400">
                      Avg Response Time
                    </p>
                  </div>
                </div>
                <p className="text-zinc-300 italic leading-relaxed">
                  "Driver behavior coaching through the SelfCAM system reduced
                  our incident rates significantly within three months."
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Final CTA Strip */}
        <section className="bg-[#9ACA3C] py-20 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-[#555759] open-sans-black font-black text-4xl mb-8">
              See Selftrack in Action — Book Your Free Fleet Demo
            </h2>
            <Link
              to="/get-quote"
              className="bg-white text-[#555759] px-12 py-5 rounded-lg font-black uppercase text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center"
            >
              Book My Free Demo
            </Link>
          </div>
          {/* Dynamic Shape Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full transform -skew-y-3 bg-white/20"></div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
