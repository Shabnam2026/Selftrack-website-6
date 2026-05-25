import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Check, X, Cpu, ChevronRight, ChevronLeft, CheckCircle2, Briefcase, Truck, Shield, Construction, Key, Layout, Lock, Eye, User, Activity, ShieldCheck, Route, Fuel, Map, Video, Zap, Calculator, RefreshCw, Wrench, AlertTriangle, FileText } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Recommendation from './Recommendation';

export default function SolutionBuilder() {
  const [step, setStep] = useState(0);
  const [fleetSize, setFleetSize] = useState<string | null>(null);
  const [hasHardware, setHasHardware] = useState<string | null>(null);
  const [vehicleUsage, setVehicleUsage] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [videoRequirements, setVideoRequirements] = useState<string[]>([]);
  const [managementType, setManagementType] = useState<string | null>(null);
  const [fuelSpend, setFuelSpend] = useState<number>(50000);
  const [calculatedSavings, setCalculatedSavings] = useState({ fuel: 114000, insurance: 32500, total: 146500 });

  const calculateSavings = () => {
    const f = Number(fuelSpend) || 0;
    const fuel = Math.round(f * 12 * 0.19);
    const insurance = Math.round(f * 12 * 0.054);
    setCalculatedSavings({ fuel, insurance, total: fuel + insurance });
  };

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const fleetOptions = [
    { id: '1-5', title: '1-5', sub: 'Small fleet or single vehicle' },
    { id: '5-20', title: '5-20', sub: 'Growing business fleet' },
    { id: '20-100', title: '20-100', sub: 'Medium fleet — custom pricing applies', enterprise: false, customLink: true },
    { id: '100+', title: '100+', sub: 'Large enterprise fleet', enterprise: true }
  ];

  const hardwareOptions = [
    { id: 'none', title: 'No hardware installed', sub: "We're starting from scratch" },
    { id: 'replace', title: 'Yes — but we want to replace it', sub: "Our current system isn't working for us" },
    { id: 'keep', title: 'Yes — and we want to keep it', sub: "SelfFLEET is hardware-agnostic — we can work with your existing devices", compatible: true },
    { id: 'unsure', title: 'Not sure', sub: "A fleet expert can help us assess what we have" }
  ];

  const usageOptions = [
    { id: 'company', title: 'Company Vehicles', sub: 'Employees, reps, account managers', icon: Briefcase },
    { id: 'delivery', title: 'Delivery & Logistics', sub: 'Deliveries, logistics routes', icon: Truck },
    { id: 'security', title: 'Security & Patrol', sub: 'Security patrols, response vehicles', icon: Shield },
    { id: 'heavy', title: 'Heavy Equipment', sub: 'Construction, mining machinery', icon: Construction },
    { id: 'rental', title: 'Car Rental', sub: 'Rental fleet management', icon: Key },
    { id: 'mixed', title: 'Mixed Fleet', sub: 'Multiple vehicle use types', icon: Layout }
  ];

  const objectiveOptions = [
    { 
      id: 'toc', 
      title: 'Monitor Total Operating Cost (TOC) and Cost per Km (CPK)', 
      sub: 'Track all expenses to optimise your bottom line and run a profitable fleet.', 
      iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <rect x="3" y="13" width="4" height="7" fill="#2e7d32" rx="1" />
          <rect x="10" y="8" width="4" height="12" fill="#43a047" rx="1" />
          <rect x="17" y="3" width="4" height="17" fill="#66bb6a" rx="1" />
          <text x="17" y="11" fill="#1b5e20" fontSize="8" fontWeight="bold" fontFamily="sans-serif">R</text>
        </svg>
      )
    },
    { 
      id: 'assets', 
      title: 'Acquisition and Disposal of assets', 
      sub: 'Manage the complete lifecycle of your vehicles from procurement to resale.', 
      iconBg: 'linear-gradient(135deg, #fff8e1, #ffecb3)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-0.25 1.97-0.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4z M12 18c-3.31 0-6-2.69-6-6c0-1.01 0.25-1.97 0.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4V18z" fill="#f57f17" />
          <circle cx="12" cy="12" r="4" fill="#fff8e1" />
        </svg>
      )
    },
    { 
      id: 'visibility', 
      title: 'Realtime Fleet Visibility', 
      sub: 'Live location updates and bird\'s eye view of all units.', 
      iconBg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M12 7C7 7 2.73 10.11 1 14.5c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 10.11 17 7 12 7zM12 19c-2.48 0-4.5-2.02-4.5-4.5S9.52 10 12 10s4.5 2.02 4.5 4.5S14.48 19 12 19z" fill="#1565c0" />
          <circle cx="12" cy="14.5" r="2.5" fill="#42a5f5" />
          <path d="M9 5 A 4 4 0 0 1 15 5" fill="none" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 2 A 7 7 0 0 1 17 2" fill="none" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      id: 'id', 
      title: 'Driver Identification & Behaviour', 
      sub: 'Track harsh braking, speeding, and assign drivers securely.', 
      iconBg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <circle cx="12" cy="7" r="4" fill="#c62828" />
          <path d="M12 13c-4.42 0-8 2.58-8 6v2h16v-2c0-3.42-3.58-6-8-6z" fill="#c62828" />
          <rect x="13" y="14" width="9" height="6" rx="1" fill="#e53935" />
          <line x1="15" y1="16" x2="20" y2="16" stroke="white" strokeWidth="1" strokeLinecap="round"/>
          <line x1="15" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 'maintenance', 
      title: 'Fuel, Maintenance & Tyre Management', 
      sub: 'Monitor fuel levels, schedule servicing, and track tyre wear.', 
      iconBg: 'linear-gradient(135deg, #e8f5e9, #dcedc8)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M14 20H6V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v14z" fill="#388e3c" />
          <path d="M14 6h2c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-2v-7z" fill="#2e7d32" />
          <g transform="translate(6.5, 8.5) scale(0.65)">
            <path d="M13.78,15.3l-5.6-5.6C7.6,9.12,7.1,8,7.57,6.6l2.1,2.1l2.82-2.82l-2.1-2.1C11.83,3.4,12.91,3.9,13.48,4.4l5.6,5.6 c0.86,0.86,0.86,2.25,0,3.1l-2.2,2.2C16.02,16.17,14.63,16.17,13.78,15.3z M4.38,18.52l1.42,1.42l4.24-4.24l-1.42-1.42L4.38,18.52z" fill="#8d6e63" />
          </g>
        </svg>
      )
    },
    { 
      id: 'accident', 
      title: 'Accident & Fines Management', 
      sub: 'Keep records of collisions, process traffic fines, and assign liability.', 
      iconBg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M1 21L12 2l11 19H1z" fill="#ef6c00" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          <g transform="translate(6, 9) rotate(-20)">
            <rect x="7" y="4" width="2" height="8" fill="#bf360c" />
            <rect x="4" y="2" width="8" height="4" rx="1" fill="#bf360c" />
          </g>
        </svg>
      )
    },
    { 
      id: 'license', 
      title: 'Vehicle & Driver License Management', 
      sub: 'Automated alerts for upcoming renewals, expirations, and compliance checks.', 
      iconBg: 'linear-gradient(135deg, #ede7f6, #d1c4e9)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <rect x="3" y="5" width="18" height="14" rx="2" fill="#5e35b1" />
          <rect x="6" y="9" width="12" height="2" fill="white" opacity="0.6" />
          <rect x="6" y="13" width="8" height="2" fill="white" opacity="0.6" />
          <circle cx="18" cy="17" r="5" fill="#43a047" />
          <path d="M16 17l1.5 1.5L20 15" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    { 
      id: 'recovery', 
      title: 'Stolen Vehicle Recovery & Insurance', 
      sub: 'Secure assets with 24/7 monitoring and meet compliance standards.', 
      iconBg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
      customIcon: (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#1b5e20" />
          <path d="M12 3l-7 3v5.5c0 4.54 3.16 8.76 7 9.88 3.84-1.12 7-5.34 7-9.88V6l-7-3z" fill="#2e7d32" />
          <path d="M12 7c-1.66 0-3 1.34-3 3 0 2 3 5.4 3 5.4s3-3.4 3-5.4c0-1.66-1.34-3-3-3zm0 4a1 1 0 110-2 1 1 0 010 2z" fill="#a5d6a7" />
        </svg>
      )
    }
  ];

  const videoOptions = [
    { 
      id: 'dashcam', 
      tag: 'Basic Driver Recorder', 
      title: 'Driver & Road-Facing Recorder', 
      sub: 'Entry-level — road and driver recording, incident evidence',
      img: 'https://images.unsplash.com/photo-1549466600-449e08316790?q=80&w=400&auto=format&fit=crop'
    },
    { 
      id: 'ai-video', 
      tag: 'SMART MDVR', 
      title: 'Full AI Live Video Telematics', 
      sub: 'Real-time streaming, AI event detection, fatigue alerts',
      img: 'https://images.unsplash.com/photo-1573270919321-df0eb0bb9b6f?q=80&w=400&auto=format&fit=crop'
    },
    { 
      id: 'mdvr', 
      tag: 'MDVR Cameras', 
      title: 'Multi-Camera MDVR System', 
      sub: 'Multiple angles, large vehicles, full coverage',
      img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=400&auto=format&fit=crop'
    },
    { 
      id: 'none', 
      title: 'No Cameras Required', 
      sub: 'GPS tracking only at this stage',
      icon: X
    }
  ];

  const managementOptions = [
    { 
      id: 'basic', 
      title: 'Basic tracking is all I need for now', 
      sub: 'I just need to know where my vehicles are at any given time.',
      tag: 'SelfTRACK Starter',
      icon: Map
    },
    { 
      id: 'full', 
      title: 'Full fleet optimisation', 
      sub: 'Route optimisation, fuel management, and a complete FMIS integration for total control.',
      tag: 'SelfTRACK + SelfCAM + SelfFLEET',
      icon: Layout,
      bestValue: true
    },
    { 
      id: 'some', 
      title: 'Some basic reporting is enough', 
      sub: 'Trip reports, driver summaries, and basic performance analytics for your team.',
      tag: 'SelfTRACK SUPERVISOR/FLEETMANAGER',
      icon: Activity
    }
  ];

  const toggleUsage = (id: string) => {
    setVehicleUsage(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleObjective = (id: string) => {
    setObjectives(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleVideo = (id: string) => {
    if (id === 'none') {
      setVideoRequirements(['none']);
      return;
    }
    setVideoRequirements(prev => {
      const filtered = prev.filter(i => i !== 'none');
      return filtered.includes(id) ? filtered.filter(i => i !== id) : [...filtered, id];
    });
  };

  const handleNext = () => {
    if (step === 6) {
      setStep(8);
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (step === 8) {
    return <Recommendation onStartOver={() => setStep(0)} />;
  }

  if (false) {
    return (
      <div className="bg-surface font-sans text-on-surface antialiased">
        <Navbar />

        <main>
          {/* Success Banner */}
          <section className="w-full bg-[#9ACA3C] py-20 px-8 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-10 duration-700">
            <div className="mb-8 bg-white/20 p-6 rounded-full shadow-inner">
               <CheckCircle2 size={72} className="text-white drop-shadow-lg" />
            </div>
            <h1 className="font-black text-4xl md:text-6xl text-white uppercase tracking-tighter mb-6 italic leading-[1.1]">
              Your Fleet Solution <br /> is Ready
            </h1>
            <p className="text-white/90 text-xl max-w-2xl font-medium leading-relaxed">
              Based on your answers, here is our recommended Selftrack solution for optimal efficiency and fleet safety.
            </p>
          </section>

          {/* Recommendation Section */}
          <section className="py-24 px-8 bg-surface-container-lowest">
            <div className="max-w-[950px] mx-auto">
              <h2 className="font-black text-[#555759] text-3xl md:text-4xl mb-16 text-center uppercase tracking-tighter italic">
                Recommended for Your Fleet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Product 1: SelfTRACK */}
                <div className="bg-surface-container-low p-10 rounded-xl flex flex-col h-full transition-all hover:-translate-y-2 duration-500 shadow-sm hover:shadow-xl border border-transparent hover:border-[#9ACA3C]/20 group">
                  <div className="bg-[#9ACA3C] text-white text-[10px] font-black py-1.5 px-4 rounded-full self-start mb-8 uppercase tracking-[0.1em] shadow-sm">
                    Included in your solution
                  </div>
                  <h3 className="font-black text-3xl text-[#555759] mb-2 uppercase italic tracking-tighter">SelfTRACK</h3>
                  <p className="text-[10px] font-black text-[#9ACA3C] mb-8 uppercase tracking-[0.3em]">Supervisor Tier</p>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {[
                      "Live tracking",
                      "Driver identification",
                      "Trip history"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={18} className="text-[#9ACA3C] flex-shrink-0" />
                        <span className="text-sm text-[#555759] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 mt-auto border-t border-zinc-100">
                    <span className="text-[9px] text-[#555759]/40 block uppercase font-black tracking-widest mb-1">Price from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-3xl text-[#555759] tracking-tighter italic">R189</span>
                      <span className="text-xs font-bold text-zinc-400">/month</span>
                    </div>
                  </div>
                </div>

                {/* Product 2: SelfCAM */}
                <div className="bg-surface-container-low p-10 rounded-xl flex flex-col h-full transition-all hover:-translate-y-2 duration-500 shadow-sm hover:shadow-xl border border-transparent hover:border-[#9ACA3C]/20 group">
                  <div className="bg-[#9ACA3C] text-white text-[10px] font-black py-1.5 px-4 rounded-full self-start mb-8 uppercase tracking-[0.1em] shadow-sm">
                    Included in your solution
                  </div>
                  <h3 className="font-black text-3xl text-[#555759] mb-2 uppercase italic tracking-tighter">SelfCAM</h3>
                  <p className="text-[10px] font-black text-[#9ACA3C] mb-8 uppercase tracking-[0.3em]">SMART MDVR</p>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {[
                      "AI fatigue detection",
                      "Incident clips",
                      "Live streaming"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={18} className="text-[#9ACA3C] flex-shrink-0" />
                        <span className="text-sm text-[#555759] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 mt-auto border-t border-zinc-100">
                    <span className="text-[9px] text-[#555759]/40 block uppercase font-black tracking-widest mb-1">Price from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-3xl text-[#555759] tracking-tighter italic">R450</span>
                      <span className="text-xs font-bold text-zinc-400">/month</span>
                    </div>
                  </div>
                </div>

                {/* Product 3: SelfFLEET */}
                <div className="bg-surface-container-low p-10 rounded-xl flex flex-col h-full transition-all hover:-translate-y-2 duration-500 shadow-sm hover:shadow-xl border border-transparent hover:border-[#9ACA3C]/20 group">
                  <div className="bg-[#9ACA3C] text-white text-[10px] font-black py-1.5 px-4 rounded-full self-start mb-8 uppercase tracking-[0.1em] shadow-sm">
                    Included in your solution
                  </div>
                  <h3 className="font-black text-3xl text-[#555759] mb-2 uppercase italic tracking-tighter">SelfFLEET</h3>
                  <p className="text-[10px] font-black text-[#9ACA3C] mb-8 uppercase tracking-[0.3em]">Full FMIS Platform</p>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {[
                      "Route optimisation",
                      "Fuel management",
                      "Maintenance planning"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check size={18} className="text-[#9ACA3C] flex-shrink-0" />
                        <span className="text-sm text-[#555759] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-8 mt-auto border-t border-zinc-100">
                    <span className="text-[9px] text-[#555759]/40 block uppercase font-black tracking-widest mb-1">Price from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-3xl text-[#555759] tracking-tighter italic">R225</span>
                      <span className="text-xs font-bold text-zinc-400">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Summary */}
          <section className="py-24 bg-surface-container-low px-8">
            <div className="max-w-[800px] mx-auto bg-white p-12 rounded-2xl shadow-2xl">
              <h2 className="font-black text-[#555759] text-3xl mb-12 uppercase italic tracking-tighter">Your Estimated Monthly Investment</h2>
              <div className="space-y-6 mb-10 border-b border-zinc-100 pb-10">
                <div className="flex justify-between items-center">
                  <span className="text-[#555759] font-bold text-lg">SelfTRACK (Supervisor Tier x 10)</span>
                  <span className="text-[#555759] font-black text-xl italic tracking-tighter">R1,890.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#555759] font-bold text-lg">SelfCAM (SMART MDVR x 10)</span>
                  <span className="text-[#555759] font-black text-xl italic tracking-tighter">R4,500.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#555759] font-bold text-lg">SelfFLEET (Full Platform x 10)</span>
                  <span className="text-[#555759] font-black text-xl italic tracking-tighter">R2,250.00</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="font-black text-[#9ACA3C] text-4xl uppercase tracking-tighter italic">
                    Estimated total from R8,640.00/month
                  </p>
                  <p className="text-sm text-[#555759]/50 font-bold uppercase tracking-widest mt-2 ml-1">Calculated for 10 vehicles</p>
                </div>
              </div>
              <div className="mt-10 p-6 bg-surface-container-low rounded-xl border-l-4 border-[#9ACA3C]">
                <p className="text-xs text-[#555759]/70 font-medium leading-relaxed">
                  <strong>Note:</strong> Final pricing confirmed after fleet consultation. Volume discounts available for 20+ vehicles. Pricing excludes VAT and installation costs.
                </p>
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="py-32 bg-surface-container-lowest px-8">
            <div className="max-w-[950px] mx-auto">
              <h2 className="font-black text-[#555759] text-4xl md:text-5xl mb-20 text-center uppercase tracking-tighter italic">
                Your Estimated Annual Savings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#555759]/40 mb-4 ml-1">Current Monthly Fuel Spend (R)</label>
                    <div className="relative group">
                      <input 
                        className="w-full bg-surface-container-low border-2 border-transparent focus:border-[#9ACA3C] focus:bg-white rounded-2xl p-8 outline-none text-4xl font-black text-[#555759] tracking-tighter transition-all" 
                        value={fuelSpend}
                        onChange={(e) => setFuelSpend(Number(e.target.value))}
                        type="number"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <button 
                          onClick={calculateSavings}
                          className="bg-[#9ACA3C] text-white px-10 py-5 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#9ACA3C]/20"
                        >
                          Calculate
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#555759]/60 font-medium leading-relaxed max-w-sm">
                    Typical fleet efficiency gains range from <span className="text-[#9ACA3C] font-black text-base">15-22%</span> when using the Selftrack FMIS Intelligence Layer.
                  </p>
                </div>
                
                <div className="bg-[#9ACA3C] p-12 rounded-[2.5rem] text-white shadow-2xl shadow-[#9ACA3C]/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                  <div className="relative z-10 space-y-10">
                    <div className="flex justify-between border-b border-white/20 pb-6 items-end">
                      <span className="font-bold uppercase text-[10px] tracking-widest opacity-80">Estimated Fuel Savings</span>
                      <span className="font-black text-3xl tracking-tighter italic">R{calculatedSavings.fuel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-6 items-end">
                      <span className="font-bold uppercase text-[10px] tracking-widest opacity-80">Insurance Premium Savings</span>
                      <span className="font-black text-3xl tracking-tighter italic">R{calculatedSavings.insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-6 items-center">
                      <span className="font-black uppercase text-lg tracking-tighter italic">Total Annual Savings</span>
                      <div className="text-right">
                        <span className="block text-6xl font-black tracking-tighter italic">R{calculatedSavings.total.toLocaleString()}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Guaranteed Efficiency Potential</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 bg-[#555759] px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-container/[0.02] -z-10"></div>
            <div className="max-w-[1000px] mx-auto relative z-10">
              <h2 className="font-black text-white text-5xl md:text-6xl uppercase tracking-tighter italic mb-8">Ready to Get Started?</h2>
              <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-xl font-medium leading-relaxed mb-20">
                Move from tracking to total fleet intelligence. Choose how you'd like to proceed with your custom solution.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[950px] mx-auto">
                {/* Option 1: Demo */}
                <div className="bg-[#9ACA3C] p-12 rounded-[2rem] shadow-2xl flex flex-col items-center group hover:scale-[1.02] transition-all duration-500">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform">
                    <Video size={40} className="text-white" />
                  </div>
                  <h3 className="font-black text-white text-3xl mb-4 uppercase italic tracking-tighter">Book Your Free <br /> Fleet Demo</h3>
                  <p className="text-white/80 font-medium mb-12 leading-relaxed">
                    Speak to a fleet expert and see the platform live with real-world scenarios.
                  </p>
                  <button className="w-full bg-white text-[#9ACA3C] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-xl active:scale-95 transition-all shadow-lg shadow-black/5">
                    Book Demo
                  </button>
                </div>

                {/* Option 2: Quote */}
                <div className="bg-white p-12 rounded-[2rem] border-4 border-[#555759] flex flex-col items-center group hover:scale-[1.02] transition-all duration-500">
                  <div className="w-20 h-20 bg-zinc-100 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:-rotate-6 transition-transform">
                    <Briefcase size={40} className="text-[#555759]" />
                  </div>
                  <h3 className="font-black text-[#555759] text-3xl mb-4 uppercase italic tracking-tighter">Request a <br /> Formal Quote</h3>
                  <p className="text-[#555759]/60 font-medium mb-12 leading-relaxed">
                    We'll send a detailed proposal tailored to your specific requirements within 24 hours.
                  </p>
                  <button className="w-full bg-transparent border-2 border-[#9ACA3C] text-[#9ACA3C] py-6 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#9ACA3C] hover:text-white transition-all active:scale-95">
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low min-h-screen flex flex-col font-sans">
      {/* Progress Bar Anchor */}
      <div className="w-full bg-black/5 h-1.5 sticky top-0 z-50 overflow-hidden">
        <div 
          className="bg-[#9ACA3C] h-full transition-all duration-700 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-12 pb-32 md:pb-40 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary-container/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#555759]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {step === 0 && (
          <div className="max-w-[800px] w-full text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Visual */}
            <div className="mb-10 inline-flex items-center justify-center w-28 h-28 rounded-[2rem] bg-white border border-black/5 shadow-sm group transition-all duration-500 hover:scale-110">
              <Cpu size={56} className="text-[#9ACA3C] group-hover:rotate-12 transition-transform duration-500" />
            </div>

            {/* Headline */}
            <h1 className="font-black text-[#555759] text-5xl md:text-[64px] leading-[1.1] mb-8 tracking-tighter uppercase italic">
              Build Your Perfect <br />
              <span className="text-[#9ACA3C]">Fleet Solution</span>
            </h1>

            {/* Subtext */}
            <p className="font-medium text-[#555759]/70 text-xl md:text-[22px] leading-relaxed mb-12 max-w-2xl mx-auto">
              Answer 6 quick questions and we'll recommend the most suitable Selftrack products and management services for your business.
            </p>

            {/* Time Estimate */}
            <div className="flex items-center justify-center gap-3 text-zinc-400 mb-14 bg-white inline-flex px-6 py-2 rounded-full border border-black/5 shadow-sm">
              <Clock size={16} className="text-[#9ACA3C]" />
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">Takes about 3 minutes</span>
            </div>

            {/* Action Area */}
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleNext}
                className="bg-[#9ACA3C] text-white px-16 py-7 rounded-xl font-black text-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-[#9ACA3C]/40 flex items-center gap-4 group uppercase tracking-widest"
              >
                Start Building
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">No obligation. No account required.</p>
            </div>

            {/* Benefits Grid */}
            <div className="mt-24 flex flex-wrap justify-center gap-6">
              {[
                "Product recommendation",
                "Indicative pricing",
                "ROI estimate"
              ].map((benefit, idx) => (
                <div key={idx} className="bg-white px-8 py-4 rounded-xl flex items-center gap-3 border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-[#9ACA3C]/10 p-1 rounded-full">
                    <Check size={14} className="text-[#9ACA3C]" />
                  </div>
                  <span className="font-black text-[10px] uppercase tracking-widest text-[#555759]/60">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Operational Scale</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  How many vehicles do you <br className="hidden md:block" /> want to monitor?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Defining your fleet potential</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fleetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFleetSize(option.id)}
                    className={`group relative p-10 rounded-2xl text-left border-2 transition-all duration-300 overflow-hidden ${
                      fleetSize === option.id 
                      ? "bg-white border-[#9ACA3C] shadow-2xl shadow-[#9ACA3C]/10 translate-y-[-4px]" 
                      : "bg-white border-black/5 shadow-sm hover:border-black/10 hover:shadow-md"
                    }`}
                  >
                    {fleetSize === option.id && (
                      <div className="absolute top-6 right-6 text-[#9ACA3C] animate-in zoom-in-50 duration-300">
                        <CheckCircle2 size={32} />
                      </div>
                    )}

                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-5xl font-black italic tracking-tighter uppercase transition-colors ${fleetSize === option.id ? 'text-[#9ACA3C]' : 'text-[#555759]'}`}>
                          {option.title}
                        </h3>
                        {option.customLink && (
                          <span className="bg-[#9ACA3C] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter animate-pulse">Custom Pricing</span>
                        )}
                        {option.enterprise && (
                          <span className="bg-[#555759] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-tighter">Enterprise</span>
                        )}
                      </div>
                      <p className="text-zinc-500 font-medium text-lg leading-snug">
                        {option.sub}
                      </p>
                      <div className={`mt-8 flex items-center gap-2 transition-all duration-300 ${fleetSize === option.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-10px]"}`}>
                        <span className="text-[10px] font-black text-[#9ACA3C] uppercase tracking-[0.2em]">Scale Locked</span>
                        <ChevronRight size={14} className="text-[#9ACA3C]" />
                      </div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Existing Hardware</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  Do your vehicles already have <br className="hidden md:block" /> <span className="text-[#9ACA3C]">GPS tracking</span> installed?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Step 2 of 6: Infrastructure Assessment</p>
             </div>

             <div className="space-y-4 max-w-3xl mx-auto">
                {hardwareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setHasHardware(option.id)}
                    className={`group relative w-full p-8 rounded-2xl text-left border-2 transition-all duration-300 flex items-center gap-6 ${
                      hasHardware === option.id 
                      ? "bg-white border-[#9ACA3C] shadow-2xl shadow-[#9ACA3C]/10 translate-x-2" 
                      : "bg-white border-black/5 shadow-sm hover:border-black/10 hover:shadow-md"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      hasHardware === option.id ? "border-[#9ACA3C]" : "border-zinc-200 group-hover:border-[#9ACA3C]/50"
                    }`}>
                      <div className={`w-4 h-4 bg-[#9ACA3C] rounded-full transition-transform duration-300 ${
                        hasHardware === option.id ? "scale-100" : "scale-0"
                      }`}></div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-1">
                        <h3 className={`text-xl font-black italic tracking-tighter uppercase transition-colors ${hasHardware === option.id ? 'text-[#9ACA3C]' : 'text-[#555759]'}`}>
                          {option.title}
                        </h3>
                        {option.compatible && (
                          <span className="bg-[#9ACA3C] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">Compatible</span>
                        )}
                      </div>
                      <p className="text-zinc-500 font-medium text-sm leading-snug">
                        {option.sub}
                      </p>
                    </div>

                    <ChevronRight size={20} className={`text-[#9ACA3C] transition-all duration-300 ${hasHardware === option.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-10px]"}`} />
                  </button>
                ))}
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Vehicle Usage</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  How are the vehicles <br className="hidden md:block" /> used in your business?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Step 3 of 6: Operational Profiling</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {usageOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = vehicleUsage.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleUsage(option.id)}
                      className={`group relative p-6 rounded-xl text-left border-2 transition-all duration-300 ${
                        isSelected 
                        ? "bg-white border-[#9ACA3C] shadow-2xl shadow-[#9ACA3C]/10 ring-1 ring-[#9ACA3C]/20" 
                        : "bg-white border-black/5 shadow-sm hover:border-black/10 hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-[#9ACA3C]/10 text-[#9ACA3C]' : 'bg-white text-zinc-400'}`}>
                          <Icon size={28} />
                        </div>
                        <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-[#9ACA3C] border-[#9ACA3C]' : 'border-zinc-200'}`}>
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </div>
                      <h3 className={`text-lg font-black italic tracking-tighter uppercase mb-1 transition-colors ${isSelected ? 'text-[#9ACA3C]' : 'text-[#555759]'}`}>
                        {option.title}
                      </h3>
                      <p className="text-zinc-500 text-sm font-medium leading-tight">
                        {option.sub}
                      </p>
                    </button>
                  );
                })}
             </div>

             {/* Illustration Element */}
             <div className="mt-16 flex flex-col md:flex-row items-center gap-12 transition-all duration-700 max-w-4xl mx-auto">
                <img 
                  className="w-full md:w-1/2 h-44 object-cover rounded-xl shadow-xl" 
                  alt="Fleet of vans"
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" 
                />
                <div className="text-left space-y-4">
                  <p className="font-black text-[#555759] text-xl tracking-tight leading-tight italic uppercase">
                    Optimizing every kilometer <br /> of your business journey.
                  </p>
                  <div className="w-12 h-1 bg-[#9ACA3C]"></div>
                </div>
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Objectives</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  What are your main <br className="hidden md:block" /> tracking objectives?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Step 4 of 6: Goal Alignment</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {objectiveOptions.map((option) => {
                  const isSelected = objectives.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleObjective(option.id)}
                      className={`group relative p-[18px] px-5 rounded-[14px] text-left border-[1.5px] transition-all duration-150 ease-out flex items-start gap-[14px] ${
                        isSelected 
                        ? "bg-[linear-gradient(145deg,#e0f0c8,#f0f9e4)] border-[#639922] shadow-[0_0_0_4px_rgba(99,153,34,0.14)]" 
                        : "bg-white border-[#e0e5d8] hover:border-[#a8c070] hover:-translate-y-[1px] hover:shadow-[0_4px_14px_rgba(0,0,0,0.07)]"
                      }`}
                    >
                      <div 
                        className={`flex-shrink-0 w-[52px] h-[52px] rounded-[12px] flex items-center justify-center transition-transform duration-200 group-hover:scale-[1.08] ${isSelected ? 'shadow-[0_4px_12px_rgba(0,0,0,0.12)]' : ''}`}
                        style={{ background: option.iconBg }}
                      >
                        {option.customIcon}
                      </div>
                      <div className="flex-grow pt-[1px] pr-8">
                        <h3 className={`text-[13px] font-[800] italic uppercase mb-1 transition-colors ${isSelected ? 'text-[#639922]' : 'text-[#2d3a1e]'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {option.title}
                        </h3>
                        <p className="text-[#5a6650] text-[12.5px] font-sans leading-[1.55] mt-[4px]">
                          {option.sub}
                        </p>
                      </div>
                      <div className={`absolute top-[22px] right-5 w-5 h-5 flex items-center justify-center rounded-[4px] border-[1.5px] transition-all ${isSelected ? 'bg-[#639922] border-[#639922]' : 'border-[#d0d7c4] bg-white group-hover:border-[#a8c070]'}`}>
                        {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      </div>
                    </button>
                  );
                })}
             </div>
          </div>
        )}

        {step === 5 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Camera Requirements</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  Do you require video <br className="hidden md:block" /> monitoring for your fleet?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Step 5 of 6: Visual Evidence Strategy</p>
             </div>

             <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                {videoOptions.map((option) => {
                  const isSelected = videoRequirements.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleVideo(option.id)}
                      className={`group relative p-6 rounded-xl text-left border-2 transition-all duration-300 flex items-center gap-6 ${
                        isSelected 
                        ? "bg-white border-[#9ACA3C] shadow-2xl shadow-[#9ACA3C]/10 ring-1 ring-[#9ACA3C]/20" 
                        : "bg-white border-black/5 shadow-sm hover:border-black/10 hover:shadow-md"
                      }`}
                    >
                      <div className="w-24 h-24 flex-shrink-0 bg-white rounded overflow-hidden shadow-sm">
                        {option.img ? (
                          <img 
                            src={option.img} 
                            alt={option.title} 
                            className="w-full h-full object-cover transition-all duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-300">
                             {option.id === 'none' ? <X size={40} /> : <Video size={40} />}
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        {option.tag && (
                          <span className="text-[9px] font-black uppercase text-[#9ACA3C] tracking-widest mb-1 block">
                            {option.tag}
                          </span>
                        )}
                        <h3 className={`text-xl font-black italic tracking-tighter uppercase mb-1 transition-colors ${isSelected ? 'text-[#9ACA3C]' : 'text-[#555759]'}`}>
                          {option.title}
                        </h3>
                        <p className="text-zinc-500 font-medium text-sm leading-tight">
                          {option.sub}
                        </p>
                      </div>

                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#9ACA3C] border-[#9ACA3C]' : 'border-zinc-200'}`}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                    </button>
                  );
                })}
             </div>
          </div>
        )}
        {step === 6 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Fleet Management</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  Do you require fleet optimisation <br className="hidden md:block" /> and management tools?
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Step 6 of 7: Intelligence Layer</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {managementOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = managementType === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setManagementType(option.id)}
                      className={`group relative flex flex-col p-8 text-left transition-all duration-300 border-2 ${
                        isSelected 
                        ? "bg-white border-[#9ACA3C] shadow-2xl scale-105 z-10" 
                        : "bg-white border-black/5 shadow-sm hover:border-black/10 hover:shadow-md"
                      }`}
                      style={{ borderRadius: '0.5rem' }}
                    >
                      {option.bestValue && (
                        <div className="absolute top-0 right-0 bg-[#9ACA3C] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter">
                          Best Value
                        </div>
                      )}
                      
                      <div className="mb-8">
                        <Icon size={40} className={isSelected ? 'text-[#9ACA3C]' : 'text-zinc-300 group-hover:text-zinc-400'} />
                      </div>
                      
                      <h3 className={`text-xl font-black italic tracking-tighter uppercase mb-3 leading-snug transition-colors ${isSelected ? 'text-[#9ACA3C]' : 'text-[#555759]'}`}>
                        {option.title}
                      </h3>
                      
                      <p className="text-zinc-500 text-sm font-medium mb-12 flex-grow">
                        {option.sub}
                      </p>

                      <div className={`mt-auto inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${isSelected ? 'bg-[#9ACA3C]/10 text-[#9ACA3C]' : 'bg-surface-container-highest text-zinc-400'}`}>
                        {option.tag}
                      </div>
                    </button>
                  );
                })}
             </div>

             <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 max-w-5xl mx-auto">
                <img 
                  className="w-full aspect-video object-cover rounded-lg" 
                  alt="Logistics"
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" 
                />
                <img 
                  className="w-full aspect-video object-cover rounded-lg" 
                  alt="Telemetry Dashboard"
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop" 
                />
             </div>
          </div>
        )}

        {step === 7 && (
          <div className="max-w-[1000px] w-full relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 font-sans">
             <div className="text-center mb-16">
                <span className="inline-block text-xs font-black tracking-[0.3em] text-[#9ACA3C] mb-4 uppercase">Final Step</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#555759] uppercase italic tracking-tighter leading-tight mb-4">
                  Where should we send your <br className="hidden md:block" /> <span className="text-[#9ACA3C]">custom recommendation?</span>
                </h2>
                <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Instantly view your curated solution & pricing</p>
             </div>

             <div className="max-w-xl mx-auto bg-white p-10 shadow-2xl border border-zinc-100" style={{ borderRadius: '1rem' }}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-surface-container-low border-2 border-transparent focus:border-[#9ACA3C] focus:bg-white rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-6 py-4 bg-surface-container-low border-2 border-transparent focus:border-[#9ACA3C] focus:bg-white rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => setStep(8)}
                      className="w-full bg-gradient-to-r from-[#496800] to-[#9ACA3C] text-white py-6 rounded-lg font-black uppercase tracking-[0.2em] shadow-xl shadow-[#9ACA3C]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      style={{ borderRadius: '0.5rem' }}
                    >
                      Generate My Solution
                    </button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </main>

      {/* Persistent Footer Step 1+ */}
      {step > 0 && step <= 7 && (
        <footer className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl border-t border-zinc-100 px-8 py-6 z-50 flex justify-between items-center shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
          <button 
            onClick={handleBack}
            className="flex items-center gap-3 text-[#555759] bg-black/5 hover:bg-black/10 transition-all font-black uppercase text-[10px] tracking-widest group px-8 py-4"
            style={{ borderRadius: '0.5rem' }}
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="hidden md:flex flex-col items-center gap-1">
             <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`h-1 w-6 rounded-full transition-all duration-300 ${i <= step ? 'bg-[#9ACA3C]' : 'bg-black/10'}`}></div>
                ))}
             </div>
          </div>

          <button 
            onClick={step === 7 ? () => {} : handleNext}
            disabled={
              (step === 1 && !fleetSize) || 
              (step === 2 && !hasHardware) ||
              (step === 3 && vehicleUsage.length === 0) ||
              (step === 4 && objectives.length === 0) ||
              (step === 5 && videoRequirements.length === 0) ||
              (step === 6 && !managementType) ||
              (step === 7)
            }
            className={`flex items-center gap-3 px-10 py-5 font-black uppercase text-[10px] tracking-widest transition-all duration-300 ${
              ((step === 1 && !fleetSize) || (step === 2 && !hasHardware) || (step === 3 && vehicleUsage.length === 0) || (step === 4 && objectives.length === 0) || (step === 5 && videoRequirements.length === 0) || (step === 6 && !managementType) || (step === 7)) 
              ? "bg-black/5 text-black/30 cursor-not-allowed" 
              : "bg-gradient-to-r from-[#496800] to-[#9ACA3C] text-white hover:scale-105 shadow-xl shadow-[#9ACA3C]/20 active:scale-95"
            }`}
            style={{ borderRadius: '0.5rem' }}
          >
            {step === 7 ? "Finish" : step === 6 ? "See My Recommendation" : "Next Step"}
            <ChevronRight size={18} />
          </button>
        </footer>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </div>
  );
}
