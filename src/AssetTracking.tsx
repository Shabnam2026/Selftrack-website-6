import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { Boxes, MessageCircle, Wrench, MapPin, Navigation, ShieldCheck, Bell, Award, RotateCcw, Map, ArrowRight, ChevronDown } from 'lucide-react';

export default function AssetTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-sans text-[#555759] antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-32 pb-20 overflow-hidden px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8">
            <span className="inline-block text-[#9ACA3C] font-black text-sm tracking-widest uppercase">ASSET TRACKING</span>
            <h1 className="text-5xl md:text-7xl font-black text-[#555759] leading-[1.1] tracking-tight">
              Protect What Matters <br />Beyond Your Vehicles
            </h1>
            <p className="text-xl text-[#555759]/70 leading-relaxed max-w-xl font-regular">
              Real-time GPS tracking for trailers, caravans, generators, boats, equipment, containers, and more. Trusted by businesses across South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-start sm:items-center">
              <Link to="/asset-tracking/quote" className="bg-[#9ACA3C] text-white px-8 py-4 rounded-lg font-black text-lg hover:bg-[#496800] transition-all shadow-xl shadow-[#9ACA3C]/20 uppercase tracking-widest flex items-center gap-2">
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+27716046133" className="bg-white text-[#9ACA3C] border-2 border-[#9ACA3C] px-8 py-4 rounded-lg font-black text-lg hover:bg-[#9ACA3C]/5 transition-all uppercase tracking-widest text-center">
                Speak to a Consultant
              </a>
            </div>
            <button onClick={() => scrollToSection('what-to-track')} className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline transition-all mt-4 w-max">
              Find the Right Tracking Solution <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-xl overflow-hidden shadow-2xl">
                  <img className="w-full h-full object-cover" data-alt="high-end motorboat docked at a luxury marina during sunset with glossy white hull reflections" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ60FgFhJV5KzrdUNOLG3oAkxY_e3woWWzveSiQtg87acNszayBmALz5zIxeA1RrY7ldfrxseA6NpdGY1q9zdW8woIMA3WH1QLqbOa_Ex4dPc-8jGsgqwEnGMeGr70hJHEtzyG25kdGx4W4QMkyPkuuea4EFwEiN0wcmdc1ogy59RHNFlvh9VeaOKT7Lh2g-YQh1bSh6MUyo_995FrEvezgDoPJBRtxHnQn0X1SWqAcdZuGZgiWmW5fzjWH9qYYCgu94a669Lt9UUO" alt="Boat" />
                </div>
                <div className="h-48 rounded-xl overflow-hidden shadow-2xl translate-x-4">
                  <img className="w-full h-full object-cover" data-alt="heavy-duty industrial power generator in a construction site setting with morning fog and industrial aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtUrc5zb-iWousJBwploowM6sRTKUR3ZKhsvKdSHhJIqtgQA6EQHbtWpZi6r3J0aauX6gmXJPCfE_NYKFZvEEdjerd_uvr48kdULHqQNxRVJpv8ASh99hT34a491nduvn42JFdQMKCDOol2IqGmzOukU4bldLPKUNLq4EXrr28nxFDfugT8Psei67any-bRtZ5VIY7bYgWKTPGLItZcq-sE2EO8vywk9j3L8ZixHTpzzTe-eE6OM70hRPbv4E__rIvqWmD2iJzvc9x" alt="Generator" />
                </div>
              </div>
              <div className="pt-12">
                <div className="h-96 rounded-xl overflow-hidden shadow-2xl -translate-x-4">
                  <img className="w-full h-full object-cover" data-alt="close-up of a high-quality utility trailer parked on a clean asphalt driveway under clear blue sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHTcKdTeRq6y2sDJUh6prlbPL8pQRpVRGnwpNUa_5zpNsg3nTufsq1fxoRqRwjyG-whXhiRYowMahNG89kQWRoisN209_T1hEX2GEh3SgWE5hIuoYcFiUXmKwWLAtIu5nykqOfqimXXGSROrzRSI_txgqOPM9QCVQ5vjvrUApj-gAV4W8LzaRB6noYDMz5likVMQ5a2A_5iCZBxavhT5sJB99nBofyPwQ1wDJ9AYxlH__BWr8803h24D1UpZNfBjv_Jz25i5NczhDa" alt="Trailer" />
                </div>
              </div>
            </div>
            {/* Abstract signal elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#9ACA3C]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#9ACA3C]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="what-to-track" className="bg-[#f3f3f6] py-32 px-8">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-black text-[#555759] mb-16 text-center tracking-tight">What Can You Track?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tiles */}
            <Link to="/asset-tracking/quote?type=trailers" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="trailer">movie</span>
              </div>
              <span className="font-bold text-[#555759]">Trailers</span>
            </Link>
            <Link to="/asset-tracking/quote?type=generators" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="generator">remote_gen</span>
              </div>
              <span className="font-bold text-[#555759]">Generators</span>
            </Link>
            <Link to="/asset-tracking/quote?type=boats" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="sailing">sailing</span>
              </div>
              <span className="font-bold text-[#555759] text-center">Boats &amp; Jet Skis</span>
            </Link>
            <Link to="/asset-tracking/quote?type=caravans" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="rv_hookup">rv_hookup</span>
              </div>
              <span className="font-bold text-[#555759]">Caravans</span>
            </Link>
            <Link to="/asset-tracking/quote?type=tools" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
               <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="construction">construction</span>
              </div>
              <span className="font-bold text-[#555759]">Power Tools</span>
            </Link>
            <Link to="/asset-tracking/quote?type=containers" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="box">box</span>
              </div>
              <span className="font-bold text-[#555759]">Containers</span>
            </Link>
            <Link to="/asset-tracking/quote?type=equipment" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
              <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="precision_manufacturing">precision_manufacturing</span>
              </div>
              <span className="font-bold text-[#555759]">Equipment</span>
            </Link>
            <Link to="/asset-tracking/quote?type=agriculture" className="bg-white p-8 rounded-xl flex flex-col items-center justify-center space-y-4 shadow-sm border-b-4 border-transparent transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-xl hover:border-[#9ACA3C]">
               <div className="w-16 h-16 bg-[#9ACA3C]/10 rounded-full flex items-center justify-center group-hover:bg-[#9ACA3C]/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#9ACA3C]" data-icon="agriculture">agriculture</span>
              </div>
              <span className="font-bold text-[#555759] text-center">Agricultural Machinery</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-neutral-800 tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
              From choosing the right tracker to real-time monitoring — we make asset protection simple.
            </p>
          </div>
          
          {/* Desktop timeline (horizontal) */}
          <div className="hidden lg:block relative">
            {/* The horizontal connecting line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-neutral-200" />
            
            {/* The 4 steps */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {[
                {
                  number: "01",
                  icon: Boxes,
                  title: "Choose Your Asset",
                  body: "Tell us what you need to protect — from trailers to generators to high-value equipment."
                },
                {
                  number: "02",
                  icon: MessageCircle,
                  title: "We Recommend",
                  body: "Our specialist contacts you within 48 hours to recommend the best tracker and plan for your needs."
                },
                {
                  number: "03",
                  icon: Wrench,
                  title: "Professional Installation",
                  body: "Our certified technicians install your tracking device — or you can self-install with our easy guide."
                },
                {
                  number: "04",
                  icon: MapPin,
                  title: "Monitor Real-Time",
                  body: "Access your assets 24/7 via our mobile app or web platform."
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="group flex flex-col items-center text-center cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Number badge on the timeline line */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-200 transition-all duration-300">
                    {step.number}
                  </div>
                  
                  {/* Vertical connector line from number to icon */}
                  <div className="w-[2px] h-6 bg-neutral-200 my-2" />
                  
                  {/* Icon in tinted circle */}
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-emerald-100 group-hover:-translate-y-1">
                    <step.icon className="w-8 h-8 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-neutral-500 max-w-xs leading-relaxed font-medium">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile timeline (vertical) */}
          <div className="lg:hidden relative pl-4 max-w-md mx-auto">
            {/* The vertical connecting line */}
            <div className="absolute top-6 bottom-6 left-[38px] w-[2px] bg-neutral-200" />
            
            {/* The 4 steps stacked */}
            <div className="space-y-12 relative z-10">
              {[
                {
                  number: "01",
                  icon: Boxes,
                  title: "Choose Your Asset",
                  body: "Tell us what you need to protect — from trailers to generators to high-value equipment."
                },
                {
                  number: "02",
                  icon: MessageCircle,
                  title: "We Recommend",
                  body: "Our specialist contacts you within 48 hours to recommend the best tracker and plan for your needs."
                },
                {
                  number: "03",
                  icon: Wrench,
                  title: "Professional Installation",
                  body: "Our certified technicians install your tracking device — or you can self-install with our easy guide."
                },
                {
                  number: "04",
                  icon: MapPin,
                  title: "Monitor Real-Time",
                  body: "Access your assets 24/7 via our mobile app or web platform."
                },
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-6 group cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Left side — badge and line offset is handled by parent line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-200 transition-all duration-300 relative z-10">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Right side — content */}
                  <div className="flex-1 pb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-emerald-100 group-hover:-translate-y-1">
                      <step.icon className="w-8 h-8 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[#555759] py-32 px-8 text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">Advanced Protection,<br />Zero Hassle.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12 text-left">
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <span className="material-symbols-outlined text-[#9ACA3C]" data-icon="battery_full">battery_full</span>
                </div>
                <h3 className="font-bold text-lg text-white">Battery-powered</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Independent power source, no vehicle battery drain.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <span className="material-symbols-outlined text-[#9ACA3C]" data-icon="visibility_off">visibility_off</span>
                </div>
                <h3 className="font-bold text-lg text-white">Hidden install</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Compact size allows for mounting in invisible locations.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <span className="material-symbols-outlined text-[#9ACA3C]" data-icon="notification_important">notification_important</span>
                </div>
                <h3 className="font-bold text-lg text-white">Geofence alerts</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Get notified instantly if your asset moves out of its zone.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <span className="material-symbols-outlined text-[#9ACA3C]" data-icon="update">update</span>
                </div>
                <h3 className="font-bold text-lg text-white">Long battery life</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Optimized low-power modes for months between charges.</p>
              </div>
              
              {/* New Features */}
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <Navigation className="w-6 h-6 text-[#9ACA3C]" />
                </div>
                <h3 className="font-bold text-lg text-white">Real-time location</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">GPS coordinates updated continuously, accurate to street level.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <ShieldCheck className="w-6 h-6 text-[#9ACA3C]" />
                </div>
                <h3 className="font-bold text-lg text-white">Recovery support</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Nationwide recovery team ready 24/7 if your asset goes missing.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <Bell className="w-6 h-6 text-[#9ACA3C]" />
                </div>
                <h3 className="font-bold text-lg text-white">Movement &amp; tamper</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Get instantly notified if your asset is moved or tampered with.</p>
              </div>
              <div className="flex flex-col space-y-3 p-6 bg-white/5 rounded-3xl border border-white/10 shadow-sm hover:translate-y-[-8px] transition-transform duration-300 backdrop-blur-sm">
                <div className="bg-[#9ACA3C]/20 w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                  <Award className="w-6 h-6 text-[#9ACA3C]" />
                </div>
                <h3 className="font-bold text-lg text-white">Insurance approved</h3>
                <p className="text-white/70 text-sm leading-relaxed font-regular">Accredited by major South African insurance providers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="bg-[#f3f3f6] py-32 px-8 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10 px-4">
            <h2 className="text-4xl lg:text-6xl font-black text-[#555759] tracking-tight">Showcase: Asset Trackers</h2>
            <p className="text-[#555759]/70 mt-6 text-xl font-regular max-w-2xl mx-auto leading-relaxed">From ultra-compact units to heavy-duty solar setups, we have the perfect solution designed for your valuable assets.</p>
          </div>

          <div className="bg-white max-w-max mx-auto px-6 py-3 rounded-full shadow-sm border border-[#9ACA3C]/20 mb-12 flex items-center gap-3">
             <span className="text-xl">💡</span>
             <p className="text-sm font-medium text-[#555759]">Pricing varies based on your specific use case, asset type, and volume. Get a personalised quote from our specialist.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Product 1 */}
            <div className="bg-white rounded-3xl p-8 w-full shadow-md relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform">
              <div className="mb-8 rounded-2xl overflow-hidden h-56 bg-[#f8f9fa] flex items-center justify-center p-6 mix-blend-darken">
                <img className="object-contain w-full h-full mix-blend-darken scale-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVAifr5VPuCCqw6piSmVQwiI1mx9L2oIAvb108zL0_8XaTgxSDjlx173Vp8_GFDu2Vs9sb0wTMHHlg7cVF_xA6fzF46FViDfz17FaeGyYkemkOucHV7WJZFo5zAK6YECdMAR5UuvSpHjoAAB4nCkDkocnrH3s6DP07booORV22517Y10pTR6uJAcN20gvZAvdqbamHG4_bWjUp7z262A3BwkVgY44Lc0pte6_K2GbuA2rJ0-8bhdGvND12ETkZTKLtFCb9aau2G09" alt="tracker" />
              </div>
              <div className="space-y-4 flex-grow flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-[#555759]">Mini Tracker</h3>
                    <p className="text-[#9ACA3C] font-bold text-[10px] mt-2 uppercase tracking-widest">Asset Series Alpha</p>
                  </div>
                  <div className="bg-[#9ACA3C]/10 text-[#5f8222] font-bold text-xs uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
                    Get Custom Quote
                  </div>
                </div>
                <div className="py-6 border-y border-[#f3f3f6] flex flex-col gap-4 text-sm text-[#555759]/80 mb-auto">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">scale</span>Weight:</span> <strong className="text-[#555759] font-black">85g</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">battery_charging_full</span>Battery:</span> <strong className="text-[#555759] font-black">Up to 1 year</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">water_drop</span>IP Rating:</span> <strong className="text-[#555759] font-black">IP67 Waterproof</strong></div>
                </div>
                <div className="pt-4 flex flex-col gap-4">
                  <Link to="/asset-tracking/quote" className="bg-[#9ACA3C] text-white w-full py-4 rounded-lg font-bold text-center hover:bg-[#496800] transition-colors flex items-center justify-center gap-2">
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="/asset-tracker-mini-datasheet.pdf" className="text-[#9ACA3C] hover:text-[#496800] font-bold text-center text-sm transition-colors flex items-center justify-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-[20px]">download</span> Datasheet (PDF)
                  </a>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-3xl p-8 w-full shadow-xl relative overflow-hidden flex flex-col h-full border-2 border-emerald-500 hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] py-1.5 px-4 rounded-b-lg font-black uppercase tracking-widest z-20 shadow-sm">
                Best Value
              </div>
              <div className="mb-8 rounded-2xl overflow-hidden h-56 bg-[#f8f9fa] flex items-center justify-center p-6 mix-blend-darken relative">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#9ACA3C]/10 to-transparent"></div>
                <img className="object-contain w-full h-full mix-blend-multiply opacity-90 saturate-50 scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVAifr5VPuCCqw6piSmVQwiI1mx9L2oIAvb108zL0_8XaTgxSDjlx173Vp8_GFDu2Vs9sb0wTMHHlg7cVF_xA6fzF46FViDfz17FaeGyYkemkOucHV7WJZFo5zAK6YECdMAR5UuvSpHjoAAB4nCkDkocnrH3s6DP07booORV22517Y10pTR6uJAcN20gvZAvdqbamHG4_bWjUp7z262A3BwkVgY44Lc0pte6_K2GbuA2rJ0-8bhdGvND12ETkZTKLtFCb9aau2G09" alt="tracker heavy duty" />
              </div>
              <div className="space-y-4 flex-grow flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-[#555759]">Heavy Duty</h3>
                    <p className="text-[#9ACA3C] font-bold text-[10px] mt-2 uppercase tracking-widest">Asset Series Max</p>
                  </div>
                  <div className="bg-[#9ACA3C]/10 text-[#5f8222] font-bold text-xs uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
                    Get Custom Quote
                  </div>
                </div>
                <div className="py-6 border-y border-[#f3f3f6] flex flex-col gap-4 text-sm text-[#555759]/80 mb-auto">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">scale</span>Weight:</span> <strong className="text-[#555759] font-black">320g</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">battery_charging_full</span>Battery:</span> <strong className="text-[#555759] font-black">Up to 5 years</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">shield</span>IP Rating:</span> <strong className="text-[#555759] font-black">IP68 Ultra-Rugged</strong></div>
                </div>
                <div className="pt-4 flex flex-col gap-4">
                  <Link to="/asset-tracking/quote" className="bg-[#9ACA3C] text-white w-full py-4 rounded-lg font-bold text-center hover:bg-[#496800] transition-colors flex items-center justify-center gap-2">
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-3xl p-8 w-full shadow-md relative overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-transform">
              <div className="mb-8 rounded-2xl overflow-hidden h-56 bg-[#f8f9fa] flex items-center justify-center p-6 mix-blend-darken relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 to-transparent opacity-50 isolate mix-blend-overlay"></div>
                <img className="object-cover w-full h-full filter sepia-[.1] hue-rotate-[180deg] saturate-[1.2] mix-blend-darken scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVAifr5VPuCCqw6piSmVQwiI1mx9L2oIAvb108zL0_8XaTgxSDjlx173Vp8_GFDu2Vs9sb0wTMHHlg7cVF_xA6fzF46FViDfz17FaeGyYkemkOucHV7WJZFo5zAK6YECdMAR5UuvSpHjoAAB4nCkDkocnrH3s6DP07booORV22517Y10pTR6uJAcN20gvZAvdqbamHG4_bWjUp7z262A3BwkVgY44Lc0pte6_K2GbuA2rJ0-8bhdGvND12ETkZTKLtFCb9aau2G09" alt="tracker solar" />
              </div>
              <div className="space-y-4 flex-grow flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-[#555759]">Solar Tracker</h3>
                    <p className="text-[#9ACA3C] font-bold text-[10px] mt-2 uppercase tracking-widest">Asset Series Eco</p>
                  </div>
                  <div className="bg-[#9ACA3C]/10 text-[#5f8222] font-bold text-xs uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
                    Get Custom Quote
                  </div>
                </div>
                <div className="py-6 border-y border-[#f3f3f6] flex flex-col gap-4 text-sm text-[#555759]/80 mb-auto">
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">scale</span>Weight:</span> <strong className="text-[#555759] font-black">450g</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">solar_power</span>Battery:</span> <strong className="text-[#555759] font-black text-right">Continuous</strong></div>
                  <div className="flex justify-between items-center"><span className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-[20px] text-gray-500">water_drop</span>IP Rating:</span> <strong className="text-[#555759] font-black">IP68 Waterproof</strong></div>
                </div>
                <div className="pt-4 flex flex-col gap-4">
                  <Link to="/asset-tracking/quote" className="bg-[#9ACA3C] text-white w-full py-4 rounded-lg font-bold text-center hover:bg-[#496800] transition-colors flex items-center justify-center gap-2">
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="/asset-tracker-solar-datasheet.pdf" className="text-[#9ACA3C] hover:text-[#496800] font-bold text-center text-sm transition-colors flex items-center justify-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-[20px]">download</span> Datasheet (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="bg-white py-24 px-8 border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-[#555759] tracking-tight mb-4">Trusted Across South Africa</h2>
          <p className="text-lg text-[#555759]/70 font-regular">Selftrack protects assets for businesses and families nationwide.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#f8f9fa] p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <ShieldCheck className="w-10 h-10 text-[#9ACA3C] mb-4" />
            <h3 className="font-bold text-[#555759] mb-2">Insurance Approved</h3>
            <p className="text-[#555759]/70 text-sm">Accredited by major SA insurers</p>
          </div>
          <div className="bg-[#f8f9fa] p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <RotateCcw className="w-10 h-10 text-[#9ACA3C] mb-4" />
            <h3 className="font-bold text-[#555759] mb-2">Recovery Support</h3>
            <p className="text-[#555759]/70 text-sm">24/7 stolen asset recovery</p>
          </div>
          <div className="bg-[#f8f9fa] p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <Map className="w-10 h-10 text-[#9ACA3C] mb-4" />
            <h3 className="font-bold text-[#555759] mb-2">Nationwide Support</h3>
            <p className="text-[#555759]/70 text-sm">Coverage across all provinces</p>
          </div>
          <div className="bg-[#f8f9fa] p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
            <Award className="w-10 h-10 text-[#9ACA3C] mb-4" />
            <h3 className="font-bold text-[#555759] mb-2">15+ Years Experience</h3>
            <p className="text-[#555759]/70 text-sm">Trusted by thousands of customers</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-[#555759]/50 font-medium text-sm flex items-center justify-center gap-2">
            <span className="text-[#f59e0b] text-lg">★★★★★</span> Trusted by businesses and families across South Africa
          </p>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-br from-[#ecf5dc] to-[#dce8c4] py-20 px-8 text-center border-t border-[#9ACA3C]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-black text-[#3d501a] tracking-tight mb-6">Ready to Protect Your Assets?</h2>
          <p className="text-lg text-[#5f8222] font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            Get a personalised tracking solution in minutes. Our specialists respond within 48 hours.
          </p>
          <div className="flex flex-col items-center gap-6 text-center">
            <Link to="/asset-tracking/quote" className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black text-lg hover:bg-[#7ca82b] transition-all shadow-xl shadow-[#9ACA3C]/30 uppercase tracking-widest inline-flex flex-col sm:flex-row items-center gap-2">
              Get My Asset Tracking Quote <ArrowRight className="w-5 h-5 hidden sm:block" />
            </Link>
            <span className="font-medium text-[#5f8222]">
              or call us: <a href="tel:+27716046133" className="font-bold hover:underline">+27 71 604 6133</a>
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
