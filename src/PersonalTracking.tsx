import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { 
  ChevronRight, ShieldAlert, MapPin, Battery, Bell, Smartphone, Map, 
  Feather, Wifi, BatteryCharging, Zap, Baby, Heart, Mountain, 
  HardHat, Sprout, Shield, Check, Phone 
} from 'lucide-react';

const AUDIENCES = [
  {
    id: "children",
    icon: Baby,
    label: "Children",
    title: "Child Safety & Family Peace of Mind",
    subtitle: "Freedom for them. Peace of mind for you.",
    body: "Children are constantly on the move — school runs, sports practice, playdates, school trips. Selftrack helps parents stay connected while still allowing children independence.",
    fits: ["School bags", "Pockets", "Lanyards", "Jackets or backpacks"],
    features: [
      "Real-time GPS location tracking",
      "Panic button for emergencies",
      "Geofence alerts for safe zones",
      "Instant notifications to parents",
      "Easy tracking through Mobile App",
    ],
    tagline: "Because your child's safety matters every moment of the day.",
  },
  {
    id: "elderly",
    icon: Heart,
    label: "Elderly Care",
    title: "Elderly Care & Caregiver Support",
    subtitle: "Reliable real-time tracking and emergency assistance.",
    body: "Caring for elderly loved ones or vulnerable individuals comes with constant concern for their wellbeing. Selftrack provides reassurance for families, caregivers, and healthcare workers.",
    fits: ["Elderly loved ones", "Caregivers", "Healthcare visits", "Vulnerable individuals"],
    features: [
      "Instant panic alerts",
      "Live location tracking", 
      "Geofence safe zones",
      "Caregiver notifications",
      "24/7 emergency support",
    ],
    tagline: "Help is always close when needed most.",
  },
  {
    id: "adventurers",
    icon: Mountain,
    label: "Adventurers",
    title: "Adventurers, Cyclists & Outdoor Enthusiasts",
    subtitle: "Stay connected while you focus on the adventure.",
    body: "Whether cycling solo, hiking remote trails, running outdoors, or travelling alone, Selftrack helps keep you connected with live location sharing and an emergency panic button.",
    fits: ["Solo cyclists", "Hikers", "Trail runners", "Solo travellers"],
    features: [
      "Live location sharing",
      "Emergency panic button",
      "Friends & family monitoring",
      "Quick response capability",
      "Long battery life",
    ],
    tagline: "Enjoy the freedom to explore with added confidence.",
  },
  {
    id: "loneworkers",
    icon: HardHat,
    label: "Lone Workers",
    title: "Protect Employees Working Alone or Remotely",
    subtitle: "Worker safety, accountability, and response.",
    body: "Employees working in isolated, remote, or high-risk environments face unique safety challenges. Selftrack helps businesses improve worker safety through live monitoring and emergency alerts.",
    fits: ["Remote workers", "Technicians", "Field staff", "Site operators", "Maintenance teams"],
    features: [
      "Real-time employee location",
      "Panic alerts during emergencies",
      "Geofence monitoring",
      "24/7 visibility across areas",
      "Operational oversight",
    ],
    tagline: "Ensure employees remain protected and connected throughout the day.",
  },
  {
    id: "farm",
    icon: Sprout,
    label: "Farm Workers",
    title: "Farm Worker & Agricultural Safety",
    subtitle: "Working remotely should never mean working unprotected.",
    body: "Farm workers often spend long hours alone across large properties, remote fields, and isolated areas. Selftrack ensures help is always available when emergencies happen.",
    fits: ["Irrigation checks", "Livestock work", "Field maintenance", "Machinery operation"],
    features: [
      "Live worker location across the farm",
      "Emergency panic alerts",
      "Geofence and inactivity monitoring",
      "Manager real-time visibility",
      "Reliable remote connectivity",
    ],
    tagline: "Built for remote farmland and demanding agricultural environments.",
  },
  {
    id: "security",
    icon: Shield,
    label: "Security Teams",
    title: "Security Personnel Protection",
    subtitle: "Protecting the people protecting your assets.",
    body: "Security teams work tirelessly to protect businesses, warehouses, estates, industrial properties, and farms. Selftrack helps ensure they stay connected and protected at all times.",
    fits: ["Estate security", "Warehouse guards", "Industrial property", "Farm security"],
    features: [
      "Patrol routes & perimeter activity",
      "Live personnel locations",
      "Emergency panic alerts",
      "Geofence and boundary breaches",
      "Overnight patrol monitoring",
    ],
    tagline: "Connected and protected during every patrol, every shift.",
  },
];

function WhoItsForSection() {
  const [activeId, setActiveId] = useState("children");
  
  const active = AUDIENCES.find(a => a.id === activeId);
  
  if (!active) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
            Built For Everyone
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Who It's For
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From families to businesses, Selftrack adapts to the needs 
            of every person who needs to stay safe.
          </p>
        </div>
        
        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {AUDIENCES.map(audience => (
            <button
              key={audience.id}
              type="button"
              onClick={() => setActiveId(audience.id)}
              className={`group inline-flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm transition-all
                ${activeId === audience.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              <audience.icon className="w-4 h-4" />
              {audience.label}
            </button>
          ))}
        </div>
        
        {/* Active audience content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* LEFT — Image/Icon block */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-12 flex items-center justify-center min-h-[400px] text-white">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6">
                  <active.icon className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{active.label}</h3>
                <p className="text-emerald-100 italic">{active.subtitle}</p>
              </div>
            </div>
            
            {/* RIGHT — Content */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {active.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {active.body}
              </p>
              
              {/* Ideal for / fits */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Ideal For
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.fits.map(fit => (
                    <span key={fit} className="text-xs px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                      {fit}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Feature list */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  What You Get
                </p>
                <ul className="space-y-2">
                  {active.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tagline */}
              <p className="text-sm italic text-emerald-700 font-medium border-t border-gray-100 pt-4">
                {active.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PersonalTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-white font-sans text-gray-800">
      <Navbar />

      {/* Section 1: Enhanced Hero */}
      <section className="relative bg-white pt-32 pb-20 overflow-hidden px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-[55%] space-y-8 z-10">
            <span className="inline-block text-emerald-600 font-semibold text-sm tracking-widest uppercase">
              PERSONAL TRACKING
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Real-Time Protection<br />
              for the People<br />
              Who <span className="text-emerald-500">Matter Most.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Whether it's your child walking home from school, an employee working alone in a remote location, or a loved one needing extra care — Selftrack keeps you connected when it matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/checkout/person" 
                className="group bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
              >
                BUILD YOUR SOLUTION
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  24/7 Panic Alerts
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Live Location
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <Battery className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Long Battery Life
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-[45%] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl -z-10"></div>
            <div className="relative z-10 p-4 flex justify-center">
              <img 
                alt="Phone App Interface" 
                className="rounded-[2.5rem] shadow-2xl border-[8px] border-stone-800 w-full max-w-[280px] lg:max-w-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6U8F8FewjFTfbXRoZRHGF7m0CswOu8Z6e3NIutV-BEdMXOk1e55TA5T4te13038KTPUsWuPBlkh5YOwpD6uLyDGpzfHBw4TZpY7Sz5n6IFxbqY6xSRYj1VdZOJs5vzQbG6Y2QO-BgKmqSl862MTidEKvGO68MTWnW6ToVuherBvxLpyBYeIm5dRcvq2t2oZMsJ14LQYSYk7Q-YufoQoLMDJhUUVgUFhVCxsuZn26B28oTj58uKi7DccDEPDNbyPceZkRKh2EgkRy4" 
              />
              {/* Overlapping Emergency Banner */}
              <div className="absolute -right-4 md:-right-10 top-1/4 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                    warning
                  </span>
                  <span className="font-bold text-red-500">EMERGENCY SOS</span>
                </div>
                <p className="text-xs font-bold text-gray-800">Alert from: Sarah's Phone</p>
                <p className="text-[10px] text-gray-500 mt-1">Immediate response protocol initiated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Intro Band */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
            Stay Connected Wherever Life Takes You
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Because Personal Safety Should Never Be Left to Chance
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The Selftrack Personal Tracking Device is compact, portable, and 
            designed to go wherever you do. Through our easy-to-use Mobile 
            App and Web Platform, you can monitor live locations in real 
            time and receive instant alerts when assistance may be needed.
          </p>
        </div>
      </section>

      {/* Section 3: Premium Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Premium Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Stay Safe
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful protection in a compact device. Designed for daily 
              use, anywhere life takes you.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: "Live GPS Tracking", desc: "Real-time location, always visible." },
              { icon: ShieldAlert, title: "Panic Button", desc: "One-press emergency alerts." },
              { icon: Bell, title: "Instant Notifications", desc: "Get alerts the moment they matter." },
              { icon: Smartphone, title: "Mobile App & Web", desc: "Access anywhere, anytime." },
              { icon: Map, title: "Geofence Alerts", desc: "Custom safe-zone monitoring." },
              { icon: Feather, title: "Compact & Portable", desc: "Lightweight, easy to carry." },
              { icon: Wifi, title: "24/7 Connectivity", desc: "Reliable signal coverage." },
              { icon: BatteryCharging, title: "Long Battery Life", desc: "Lasts through daily use." },
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
          
          <p className="text-center text-gray-500 italic mt-12 max-w-2xl mx-auto">
            Whether at work, school, on the road, or outdoors — Selftrack 
            helps ensure users are never truly alone.
          </p>
        </div>
      </section>

      {/* Section 4: Panic Button Spotlight */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Subtle red glow background to evoke urgency */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-500/5 to-transparent blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT — Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  Emergency Response
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Personal Safety with a<br />
                Built-In <span className="text-emerald-400">Panic Button</span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                When safety becomes a concern, immediate communication can 
                make all the difference. The Selftrack Personal Tracker 
                includes an integrated Panic Button that instantly sends an 
                emergency alert and live location to designated contacts.
              </p>
              
              <p className="text-gray-400 mb-8 italic">
                "It's more than just a tracking device — it's reassurance, 
                protection, and peace of mind for both users and their 
                families."
              </p>
              
              {/* Use case quick chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Walking alone", "Unfamiliar areas", "High-risk environments"].map(useCase => (
                  <span key={useCase} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                    {useCase}
                  </span>
                ))}
              </div>
              
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all">
                Learn More About SOS
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* RIGHT — Panic button image */}
            <div className="relative flex justify-center">
              <div className="relative z-10 w-full max-w-[280px] lg:max-w-sm">
                <img 
                  alt="Panic Button Device" 
                  className="rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] border-[8px] border-stone-900 w-full" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzpB7DTxkemb8Xxi_qqbxxm-af9ru9fCIkg0j2lkL47g3sLnux89wePeY631KAEsb2IpilWKYglbaN5iTKpRVvmKGvfkVslu7DvpFhPRXTc-7_qxcFxSxHTBmlwQSr1QJ1RzIMtnJgzce8zujRkYSkwxktrFilSsvBLOGMNc_67pNoWmoUDcRoio5A4OKYoNY_fRq2hF4K7LFqvUF8dKKbKYey_pFfqy6Pucoehd8t-D7DE1I_sxnElFKiP8czoqDSUVyzzFaykx2G" 
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-emerald-500/20 rounded-full z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-emerald-500/10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Who It's For */}
      <WhoItsForSection />

      {/* Section 6: App Download Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img 
              alt="App Dashboard" 
              className="w-full max-w-[280px] lg:max-w-md drop-shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4jHlxDnf5tZcIKB02Nob4S1Vu9aBwQQOFiXeZm5cPLdLb2CLJGiFvMod5hlhdjiRDBUHJJR_jfQgyJBcZkt0WE8Az7M8QBJYVvOCHrDOxrZegAV5hI1--KBiP-TV23HF4J52ccp7Q4LkaLTG8068n-U2yy71UrBHoLJjIWB9aAlQdOixdcILkhrxHE9gAgHd0YNlDwJOhBuA26vXbweLaIaIwd_1djIIkQVbusiwHMf9SowOZgAfl6Bu-E3OKNjJnLiOWh2SGhjhQ" 
            />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                Always In Your Pocket
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Track from Your Phone — <br />iOS &amp; Android
              </h2>
            </div>
            
            <ul className="space-y-6 pt-4">
              <li className="flex items-center gap-4 text-xl font-medium text-gray-700">
                <span className="material-symbols-outlined text-emerald-500 text-3xl">check_circle</span>
                Live Location Sharing
              </li>
              <li className="flex items-center gap-4 text-xl font-medium text-gray-700">
                <span className="material-symbols-outlined text-emerald-500 text-3xl">check_circle</span>
                Custom Safety Zones
              </li>
              <li className="flex items-center gap-4 text-xl font-medium text-gray-700">
                <span className="material-symbols-outlined text-emerald-500 text-3xl">check_circle</span>
                Instant SOS Alerts
              </li>
            </ul>
            
            <div className="flex flex-col gap-8 pt-8">
              <a href="#" className="bg-emerald-500 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center w-max">
                Get the App
              </a>
              <div className="flex gap-4 items-center">
                <a href="#" className="inline-block hover:scale-105 transition-transform duration-300">
                  <img alt="Download on the App Store" className="h-12 cursor-pointer hover:opacity-80 transition-opacity" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" />
                </a>
                <a href="#" className="inline-block hover:scale-105 transition-transform duration-300">
                  <img alt="Get it on Google Play" className="h-[68px] -ml-2 cursor-pointer hover:opacity-80 transition-opacity drop-shadow-sm" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Why Choose Selftrack */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Trusted Protection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Selftrack Personal Tracking?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            {[
              "Real-time personal GPS tracking",
              "Instant emergency panic alerts",
              "Easy-to-use Mobile App and Web Platform",
              "Compact and portable devices",
              "Protection for families, workers, and individuals",
              "Reliable connectivity and long battery life",
              "Improved safety and visibility",
              "Peace of mind, always",
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


      {/* Section 9: Emotional CTA Band */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white relative overflow-hidden">
        {/* Decorative subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100 mb-4">
            Stay Connected. Stay Protected.
          </p>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            No One Should Ever Feel Alone<br />
            When <span className="italic font-medium">Safety Matters Most</span>
          </h2>
          
          <p className="text-lg text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            From protecting children and loved ones to safeguarding employees 
            and lone workers, Selftrack Personal Tracking Solutions provide 
            the visibility and emergency support needed in today's world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/checkout/person"
              className="bg-white text-emerald-600 hover:bg-gray-100 active:scale-95 font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
            >
              Build Your Solution
              <ChevronRight className="w-5 h-5" />
            </Link>
            
            <a
              href="tel:+27716046133"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-4 rounded-lg transition-all inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Speak to a Consultant
            </a>
          </div>
          
          <div className="inline-flex items-center justify-center gap-2 text-emerald-100 text-sm">
            <ShieldAlert className="w-4 h-4" />
            <span>24/7 Emergency Response · Insurance Approved · POPIA Compliant</span>
          </div>
        </div>
      </section>

      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
}

