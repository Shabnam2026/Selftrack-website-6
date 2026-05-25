import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { 
  ShieldCheck, Award, Siren, BellRing, ChevronRight, MapPin, Database, 
  Smartphone, Satellite, Globe, Map, Zap, Phone, Activity, FileText, 
  Receipt, Move, Gauge, User, UserCheck, BatteryWarning, PowerOff, 
  BarChart3, Plus, Cpu, Shield, Radio, Check 
} from 'lucide-react';

export default function VehicleTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main>
        {/* Section 1: Hero Section */}
        <section className="relative bg-white min-h-[870px] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 w-full grid md:grid-cols-[55%_45%] items-center gap-12">
            <div className="z-10">
              <span className="inline-block text-[#9ACA3C] font-semibold tracking-widest text-sm mb-4">VEHICLE TRACKING</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Know Where Your<br />
                Car Is. <span className="text-emerald-500">Always.</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                Our advanced GPS vehicle tracking solutions are designed for those 
                who want reliable protection, real-time visibility, and complete 
                peace of mind.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/pricing" className="group bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                  FIND BEST SOLUTION
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 border-t border-surface-container pt-8">
                <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform">
                  <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={20} className="stroke-[2.5px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">Insurance Approved</span>
                </div>
                <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform">
                  <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                    <Siren size={20} className="stroke-[2.5px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">24/7 Recovery</span>
                </div>
                <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl hover:-translate-y-0.5 transition-transform">
                  <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                    <BellRing size={20} className="stroke-[2.5px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">Instant Alert Notifications</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl -m-4 blur-2xl"></div>
              <img className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square md:aspect-auto md:h-[600px] transform md:translate-x-12" data-alt="Modern high-tech black GPS tracking device resting on a sleek wooden surface next to a smartphone showing a live map interface with car icons" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcvcFnnS2T7ScdqkpkNbCt8GCZuWWBdLPI5MDN53SOPSmrmbjGbrDEUOCaV0Nf2MOOEay-IrAWiWGZTVmEA1tGQ5FC7DR81vVHnGlW1bDBJ3SSgv4Bm3rjrZ3iIq5UVuPtPcImVc8WdPwtioyT_J6xcLI0osP7YUfS3MwCQdD1br0rhcC2hdbti_cmJ8SMdLmPCbtdY__PN2OYioFQWmUkSWyLGeE2SqAg5oAUBe-vpad4xcHwwJFZmO5rXCbClE9kqN_eZP9VYA71" alt="GPS Setup" />
            </div>
          </div>
        </section>

        {/* Section 2: Intro Band */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Smart Tracking Reimagined
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Track Anything, Anytime, Anywhere
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In a world where your vehicles are constantly on the move, 
              knowing where they are located shouldn't be complicated. With 
              Selftrack, you can stay connected, informed, and in control — 
              anytime, anywhere.
            </p>
          </div>
        </section>

        {/* Section 4: Nationwide Stolen Vehicle Recovery */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  24/7 Recovery Service
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Nationwide Stolen Vehicle Recovery
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                When theft happens, every second matters. Selftrack offers 
                professional 24/7 Nationwide Stolen Vehicle Recovery backed by 
                real-time GPS technology and rapid-response support teams 
                across South Africa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
              {[
                { icon: Map, title: "Nationwide Coverage", desc: "Recovery teams positioned across South Africa." },
                { icon: Zap, title: "Fast Response", desc: "Rapid deployment when every second counts." },
                { icon: Award, title: "Insurance Accredited", desc: "Endorsed by major SA insurers." },
                { icon: Phone, title: "24/7 Call Centre", desc: "Dedicated emergency support always available." },
                { icon: ShieldCheck, title: "Proven Technology", desc: "Trusted by thousands of South Africans." },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 italic mt-12 max-w-2xl mx-auto">
              From installation to recovery assistance, Selftrack is built to 
              protect you when it matters most.
            </p>
          </div>
        </section>

        {/* Section 5: Intelligent Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                Designed Around You
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Intelligent Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful tracking capabilities that put you in complete control. 
                Flexible. Affordable. Reliable.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: Activity, title: "Live & History Tracking", desc: "Real-time and historical playback" },
                { icon: FileText, title: "Trip Reports", desc: "Detailed journey analytics" },
                { icon: Receipt, title: "SARS Tax Logbooks", desc: "Compliant tax-ready reports" },
                { icon: MapPin, title: "Geofencing", desc: "Custom zone alerts" },
                { icon: Move, title: "Movement Alerts", desc: "Unauthorised motion detection" },
                { icon: Gauge, title: "Speed Alerts", desc: "Over-speed notifications" },
                { icon: User, title: "Driver Behaviour", desc: "Performance monitoring" },
                { icon: UserCheck, title: "Driver ID Management", desc: "Track who's driving" },
                { icon: BatteryWarning, title: "Battery Tamper Alerts", desc: "Power disconnect warnings" },
                { icon: PowerOff, title: "Immobilisation", desc: "Remote vehicle stop" },
                { icon: BarChart3, title: "Detailed Reporting", desc: "Comprehensive analytics" },
                { icon: Plus, title: "And More", desc: "Continuously expanding capabilities" },
              ].map((feature, idx) => (
                <div key={idx} className="group bg-white border border-gray-200 rounded-lg p-5 hover:border-emerald-500 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                    <feature.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Built for Reliability */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-xl flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-900 rounded-2xl shadow-2xl mb-6">
                      <Cpu className="w-16 h-16 text-emerald-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      Smart Tracking Hardware
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                  Built to Last
                </p>
                <h2 className="text-4xl font-bold mb-4">
                  Engineered for Reliable Performance
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Selftrack devices are engineered for dependable performance 
                  and everyday use. Built for South African conditions.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: Cpu, title: "Smart Tracking Algorithm", desc: "Intelligent power and signal management." },
                    { icon: Shield, title: "IP54-Certified Casing", desc: "Resistant to dust and water splashes." },
                    { icon: Activity, title: "Dual Status LED Indicators", desc: "Real-time device health visibility." },
                    { icon: Radio, title: "Reliable Communication", desc: "Real-time data transmission you can trust." },
                    { icon: Zap, title: "Long-Term Durability", desc: "Designed for years of dependable use." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Why Choose Selftrack */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                Trusted by Thousands
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose Selftrack?
              </h2>
              <p className="text-lg text-gray-600">
                Stay aware. Stay protected. Stay with Selftrack.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 bg-gray-50 rounded-2xl p-8 md:p-12">
              {[
                "Real-time location visibility",
                "Instant safety and movement alerts",
                "Nationwide stolen vehicle recovery",
                "Easy-to-use mobile app and web platform",
                "Insurance-accredited solutions",
                "Affordable monthly packages",
                "Reliable support when you need it most",
                "FREE installation included",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Section 9: Affordable Protection CTA Band */}
        <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100 mb-4">
              Affordable Protection Without the Hassle
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Vehicle Deserves the Best Protection
            </h2>
            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
              You've worked hard for your vehicle. Protecting it should be 
              simple. Get professional tracking, FREE installation, and 
              trusted support — all in one package.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
              >
                Find Best Solution
                <ChevronRight className="w-5 h-5" />
              </Link>
              
              <a
                href="tel:+27716046133"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-4 rounded-lg transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call: +27 71 604 6133
              </a>
            </div>
            
            <div className="mt-8 inline-flex items-center justify-center gap-2 text-emerald-100 text-sm">
              <Shield className="w-4 h-4" />
              <span>Insurance-accredited · Trusted across South Africa</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

