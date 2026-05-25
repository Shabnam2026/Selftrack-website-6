import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function GetQuote() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 items-start">
          {/* Hero Left Content */}
          <div className="space-y-8">
            <span className="inline-block py-1 px-3 bg-[#d1e8a4] text-[#566932] font-bold text-xs tracking-widest rounded-full uppercase">FREE FLEET DEMO</span>
            <h1 className="text-5xl lg:text-6xl font-black text-zinc-800 leading-[1.1] tracking-tighter">
              See Selftrack in Action — Book Your Free Fleet Demo
            </h1>
            <p className="text-xl text-zinc-500 font-normal leading-relaxed">
              30 minutes. Live walkthrough. Tailored to your fleet. No obligation.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#9ACA3C] font-bold">check_circle</span>
                <span className="text-lg text-zinc-700">Personalised walkthrough</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#9ACA3C] font-bold">check_circle</span>
                <span className="text-lg text-zinc-700">Live demo</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#9ACA3C] font-bold">check_circle</span>
                <span className="text-lg text-zinc-700">Custom recommendation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#9ACA3C] font-bold">check_circle</span>
                <span className="text-lg text-zinc-700">No obligation</span>
              </li>
            </ul>
            <div className="pt-8 flex flex-wrap gap-8 items-center border-t border-zinc-100">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-zinc-800">20 Years</span>
                <span className="text-xs uppercase text-zinc-400 font-bold tracking-widest">Experience</span>
              </div>
              <div className="w-px h-10 bg-zinc-200"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-zinc-800">Response in 2hrs</span>
                <span className="text-xs uppercase text-zinc-400 font-bold tracking-widest">Guaranteed</span>
              </div>
            </div>
          </div>
          {/* Hero Right Form */}
          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#9ACA3C]/10 rounded-full blur-3xl -z-10"></div>
            <div className="bg-white p-8 lg:p-12 rounded-xl shadow-2xl shadow-zinc-200/50">
              <h2 className="text-2xl font-black text-zinc-800 mb-8 uppercase tracking-tighter">Book Your Free Demo</h2>
              <form action="#" className="space-y-6" onClick={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <input className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all" placeholder="John Doe" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Company Name</label>
                    <input className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all" placeholder="Enter Company" type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Work Email</label>
                    <input className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all" placeholder="john@company.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                    <input className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all" placeholder="+27 ..." type="tel" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Fleet Size</label>
                    <select className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all appearance-none">
                      <option>1-10 Vehicles</option>
                      <option>11-50 Vehicles</option>
                      <option>51-100 Vehicles</option>
                      <option>100+ Vehicles</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Industry</label>
                    <select className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all appearance-none">
                      <option>Logistics & Transport</option>
                      <option>Security Services</option>
                      <option>Construction</option>
                      <option>Public Sector</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Message (Optional)</label>
                  <textarea className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-[#9ACA3C] outline-none transition-all resize-none" placeholder="Tell us about your requirements..." rows={3}></textarea>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Demo Format</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input defaultChecked className="text-[#9ACA3C] focus:ring-[#9ACA3C] w-4 h-4" name="format" type="radio" />
                      <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors uppercase tracking-tight">Video Call</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input className="text-[#9ACA3C] focus:ring-[#9ACA3C] w-4 h-4" name="format" type="radio" />
                      <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors uppercase tracking-tight">In-Person</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input className="mt-1 rounded text-[#9ACA3C] focus:ring-[#9ACA3C]" type="checkbox" />
                  <p className="text-[10px] uppercase font-bold text-zinc-500 leading-relaxed tracking-tight">
                    I consent to Selftrack processing my personal data for the purpose of this demo order in accordance with POPIA regulations.
                  </p>
                </div>
                <button className="w-full bg-[#9ACA3C] text-white py-4 rounded-lg text-[18px] font-black uppercase tracking-widest hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-[#9ACA3C]/20">
                  Book My Free Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* What Happens Next Section */}
      <section className="bg-[#f3f3f6] py-24">
        <div className="max-w-7xl mx-auto px-8 font-sans">
          <h2 className="text-4xl font-black text-center text-[#555759] mb-20 uppercase tracking-tighter">What Happens Next?</h2>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#9ACA3C] text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-[#9ACA3C]/20">1</div>
              <h3 className="font-black text-[#555759] uppercase tracking-tight">Confirmation email</h3>
              <p className="text-sm text-[#555759]/60 font-medium">You'll receive an instant confirmation of your request with our guide.</p>
            </div>
            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#9ACA3C] text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-[#9ACA3C]/20">2</div>
              <h3 className="font-black text-[#555759] uppercase tracking-tight">Expert calls</h3>
              <p className="text-sm text-[#555759]/60 font-medium">A fleet consultant calls to learn your specific challenges and goals.</p>
            </div>
            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#9ACA3C] text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-[#9ACA3C]/20">3</div>
              <h3 className="font-black text-[#555759] uppercase tracking-tight">30-min live demo</h3>
              <p className="text-sm text-[#555759]/60 font-medium">A live walkthrough showing exactly how Selftrack solves your needs.</p>
            </div>
            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#9ACA3C] text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-[#9ACA3C]/20">4</div>
              <h3 className="font-black text-[#555759] uppercase tracking-tight">Custom proposal</h3>
              <p className="text-sm text-[#555759]/60 font-medium">A tailored solution and pricing plan designed for your ROI.</p>
            </div>
            {/* Connecting line (Desktop only) */}
            <div className="hidden md:block absolute top-7 left-0 w-full h-1 bg-zinc-200 -z-0 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
