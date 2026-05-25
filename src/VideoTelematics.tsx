import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function VideoTelematics() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-[#555759] min-h-[819px] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#9ACA3C_0%,transparent_50%)]"></div>
          </div>
          <div className="max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-8 z-10">
              <span className="text-[#9ACA3C] font-black tracking-widest text-sm uppercase">SELFCAM</span>
              <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                See Exactly What's Happening In and Around Your Vehicles
              </h1>
              <p className="text-white/80 text-xl max-w-xl leading-relaxed">
                The ultimate witness for your fleet. Combine high-definition video with AI-powered driver analysis to reduce incidents and protect your bottom line.
              </p>
              {/* Brand tagline from SELFCAM_PAGE.docx */}
              <p className="text-[#9ACA3C] font-black uppercase tracking-widest text-xs pt-2">
                Real-time monitoring · Smarter fleet management · Complete peace of mind
              </p>
            </div>
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Asymmetrical Product Collage */}
              <div className="relative w-full h-full">
                <div className="absolute top-10 right-0 w-64 h-64 bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-3 z-30 border border-white/10">
                  <img className="w-full h-full object-cover" alt="Close-up of a professional black multi-camera MDVR system" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARXXrIpMWLt6kfkDKoVsGfWj-EZNHc3xGbg_Ud2hrTMj0pJN-KuWVtxXzYhFro4dUc2Dji9uD1886GHMZtaKvxKwU6iqZDyH83R-eNAJTxLpLsR0UTg6xSGY5JqBBMxicQW27MptxmjVd0P76O2Zm9X4ncGE_er8NSsfwkepYXwYVxsQCAxUYCpYqmsLnTl6vype0_diJLZFK6YpKJY7zEGdplINu6pmh4VZ1FlA2NScIR2FWgqlJMFMCDLGHrGFmXpQTfvjItpOa7" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-white rounded-xl shadow-2xl overflow-hidden transform -rotate-6 z-20 border border-white/10">
                  <img className="w-full h-full object-cover" alt="Sleek dual-facing fleet dashcam mounted on a windshield" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC74hj0-d-o076lZaBOLtvicaFr-X9wdJoCgdM1yLRIeQ71HXwwBAtG5FB1SGOANKynxwn12zVL5eEzQb4lbovd1iySnsek6MNBlwCEWkPVpomiZo-Sz8RryIhaGCJ7AeDm9aWzysKOQ1QriLxZXrjCnBeDt5eZWCWe_cO_aUSh7aIGfOizfbKigt-62zMGmzDTnXt_ymq4pAdWKUKg5ybth6BpikS_0h2GTHDKYlByWJu3gZ9kvzYchHdvNyzf0RAbPLntpNAaH42Z" />
                </div>
                <div className="absolute bottom-10 left-0 w-60 h-48 bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-12 z-10 opacity-80 border border-white/10">
                  <img className="w-full h-full object-cover" alt="Compact entry-level vehicle black box recorder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkg9pcrKH4ut2NbfFVhDpYnEGZjyADAlrpyBj8z18ZwiqM0TUaRgg6ZzE0_yGWbBN-Z8zokyi114INTLYUW6udU9cnjY_zxGAV_42HUHuz4mB8RMKuyPAQ-rNcpme4EEUy3IvMmPbpHaWczwUTDZmnfb8U7dlfrVsdXw1-3Olv4ZFgeIKgJNlMEePUaS-XvKt2_EngIQTRrtrhgDOpJh9a918_nv8kiftIwfEG4Kbk3-FdoxXjJZ-ei5Q3ehv-UehGL1RR5zuTAbvM" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features Strip */}
        <section className="bg-[#f3f3f6] py-20 border-y border-[#edeef0]">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="text-center group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">airline_seat_recline_extra</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter">Driver Fatigue</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">Detect eyelid closure and persistent yawning</p>
              </div>
              <div className="text-center group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">smartphone</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter">Distraction Alerts</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">Immediate alerts for mobile phone use or smoking</p>
              </div>
              <div className="text-center group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">label_important</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter">Event Auto-Tagging</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">AI categorizes footage by severity and risk type</p>
              </div>
              <div className="text-center group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">video_library</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter">Incident Clips</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">15-second high-risk clips pushed instantly to web</p>
              </div>
            </div>
          </div>
        </section>

        {/* Camera Product Cards */}
        <section className="py-24 bg-white px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#555759] text-4xl font-black mb-4 uppercase tracking-tight">Select Your Vision</h2>
              <div className="w-24 h-1 bg-[#9ACA3C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Driver Recorder */}
              <div className="bg-[#f3f3f6] p-8 rounded-lg flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <span className="bg-[#555759] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Entry Level</span>
                </div>
                <h3 className="text-2xl font-black text-[#555759] mb-2">Basic Driver Recorder</h3>
                <p className="text-[#496800] font-bold text-lg mb-6">From R[x]/month</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    HD Loop Recording
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    GPS Meta-data
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    G-Sensor Incident Lock
                  </li>
                  {/* Storage capability from SELFCAM_PAGE.docx */}
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Secure SD Card Storage
                  </li>
                </ul>
                <button className="w-full py-3 bg-[#9ACA3C] text-white font-black rounded-lg hover:brightness-110 transition-all uppercase text-xs tracking-widest shadow-lg shadow-[#9ACA3C]/20">Choose Basic</button>
              </div>

              {/* Live DashCam */}
              <div className="bg-white p-8 rounded-lg flex flex-col h-full border-2 border-[#9ACA3C] shadow-2xl relative z-10 transform scale-105">
                <div className="mb-6">
                  <span className="bg-[#9ACA3C] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Most Popular</span>
                </div>
                <h3 className="text-2xl font-black text-[#555759] mb-2">Live DashCam</h3>
                <p className="text-[#496800] font-bold text-lg mb-6 uppercase tracking-widest">Real-time Visibility</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    4G Live Video Streaming
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Two-Way Audio Communication
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Remote Footage Download
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Cloud Storage Auto-Upload
                  </li>
                  {/* Storage capability from SELFCAM_PAGE.docx */}
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Cloud + SD Card Storage
                  </li>
                </ul>
                <button className="w-full py-4 bg-[#9ACA3C] text-white font-black rounded-lg hover:brightness-110 transition-all shadow-xl uppercase text-xs tracking-widest">Go Live</button>
              </div>

              {/* SMART MDVR */}
              <div className="bg-[#f3f3f6] p-8 rounded-lg flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <span className="bg-[#953795] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">Advanced AI</span>
                </div>
                <h3 className="text-2xl font-black text-[#555759] mb-2">SMART MDVR Cameras</h3>
                <p className="text-[#496800] font-bold text-lg mb-6 tracking-widest">Multi-Channel Power</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Support for 4-8 Cameras
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    AI DSM & ADAS Detection
                  </li>
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Blind Spot Side Cameras
                  </li>
                  {/* Storage capability from SELFCAM_PAGE.docx */}
                  <li className="flex items-center text-[#555759]/70 font-bold text-sm">
                    <span className="material-symbols-outlined text-[#9ACA3C] mr-2">check_circle</span>
                    Secure HDD + SD Storage
                  </li>
                </ul>
                <button className="w-full py-3 bg-[#9ACA3C] text-white font-black rounded-lg hover:brightness-110 transition-all uppercase text-xs tracking-widest shadow-lg shadow-[#9ACA3C]/20">Get Enterprise</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud Access Section */}
        <section className="bg-[#555759] py-32 overflow-hidden relative">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 md:order-1">
              <h2 className="text-white text-5xl font-black leading-tight uppercase tracking-tighter">Access All Footage from Anywhere</h2>
              {/* Multi-camera capability sub-headline from SELFCAM_PAGE.docx */}
              <p className="text-[#9ACA3C] font-bold uppercase tracking-widest text-sm -mt-6">
                Multiple HD cameras · Inside &amp; Outside the Vehicle
              </p>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <span className="bg-[#9ACA3C] w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="material-symbols-outlined text-white text-sm font-black">check</span>
                  </span>
                  <div>
                    <h5 className="text-white font-black text-xl uppercase tracking-tight mb-2">Real-time Live Streaming</h5>
                    <p className="text-white/60 font-regular">Tap into any vehicle's camera feed with 0.5s latency over 4G/LTE.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="bg-[#9ACA3C] w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="material-symbols-outlined text-white text-sm font-black">check</span>
                  </span>
                  <div>
                    <h5 className="text-white font-black text-xl uppercase tracking-tight mb-2">Remote Video Download</h5>
                    <p className="text-white/60 font-regular">Retrieve past footage without the vehicle needing to return to the depot.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="bg-[#9ACA3C] w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="material-symbols-outlined text-white text-sm font-black">check</span>
                  </span>
                  <div>
                    <h5 className="text-white font-black text-xl uppercase tracking-tight mb-2">GPS Map Overlay</h5>
                    <p className="text-white/60 font-regular">See exactly where an incident happened with synchronized GPS positioning.</p>
                  </div>
                </li>
              </ul>
              <button className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black hover:scale-105 transition-transform uppercase text-sm tracking-widest shadow-xl">
                See the Dashboard
              </button>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="bg-[#191c1e] rounded-xl p-2 shadow-2xl transform md:translate-x-12 rotate-2 border border-white/5">
                <img className="rounded-lg w-full h-auto" alt="High-fidelity software dashboard interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYGdVYwMjnGwkBS9-hM6QNVlvc42Sy72xcv_TDy2jBgj8_rfKyLTFyDOYOzQ52golgp980y_FY-WNt3L7-dZ2l41GhiQck5iL5q4LmL_CPBe90MD0YECA7MoXboJWvQHhKARJy0F3o_g73zYl7L6KHWIWbasFCTm12jCpapdWsuNK6xw7ayC25tGLx7dUQI1fHPfcsWAnTxMlJuOudvwspraoX617uEh0pFYANaAtwS48G818XVRJ3SIP897jlp1R7Dn03i3Dokx7D" />
                <div className="absolute -bottom-6 -left-12 bg-[#9ACA3C] text-[#395200] p-5 rounded-lg shadow-2xl hidden lg:block border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined font-black">online_prediction</span>
                    <span className="font-black uppercase tracking-widest text-xs">Live Link Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-32 bg-white px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-20">
              <h2 className="text-[#555759] text-5xl font-black uppercase tracking-tighter">The Impact of Video</h2>
              <p className="text-[#555759]/60 mt-4 font-bold text-lg">Why leading fleets choose SelfCAM for their daily operations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
              <div className="flex gap-8 items-start">
                <span className="material-symbols-outlined text-[#9ACA3C] text-4xl shrink-0">verified</span>
                <div>
                  <h4 className="text-2xl font-black text-[#555759] mb-3 uppercase tracking-tight">Driver Behavior Coaching</h4>
                  <p className="text-[#555759]/70 leading-relaxed">Use actual footage to train drivers, moving away from theoretical coaching to evidence-based performance reviews.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="material-symbols-outlined text-[#9ACA3C] text-4xl shrink-0">security</span>
                <div>
                  <h4 className="text-2xl font-black text-[#555759] mb-3 uppercase tracking-tight">Insurance Claim Defense</h4>
                  <p className="text-[#555759]/70 leading-relaxed">Exonerate drivers in "no-fault" accidents with clear 1080p footage, preventing fraudulent claims and premium hikes.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="material-symbols-outlined text-[#9ACA3C] text-4xl shrink-0">inventory_2</span>
                <div>
                  <h4 className="text-2xl font-black text-[#555759] mb-3 uppercase tracking-tight">Cargo Theft Prevention</h4>
                  <p className="text-[#555759]/70 leading-relaxed">Interior cargo cameras monitor door opening events and load tampering in real-time, sending alerts to dispatch.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="material-symbols-outlined text-[#9ACA3C] text-4xl shrink-0">health_and_safety</span>
                <div>
                  <h4 className="text-2xl font-black text-[#555759] mb-3 uppercase tracking-tight">Safety Compliance</h4>
                  <p className="text-[#555759]/70 leading-relaxed">Ensure PPE compliance and strict adherence to safety protocols during loading and unloading procedures.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Your Industry — closes target audience gap from SELFCAM_PAGE.docx */}
        <section className="bg-[#f3f3f6] py-24 px-8 border-y border-[#edeef0]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#555759] text-4xl font-black mb-4 uppercase tracking-tight">Built for Your Industry</h2>
              <div className="w-24 h-1 bg-[#9ACA3C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logistics */}
              <div className="bg-white p-10 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">local_shipping</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter text-xl">Logistics</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">Track cargo, monitor drivers, and respond to road incidents in real time</p>
              </div>
              {/* Commercial Fleets */}
              <div className="bg-white p-10 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">directions_bus</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter text-xl">Commercial Fleets</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">Improve driver safety, accountability, and operational efficiency</p>
              </div>
              {/* Security Operations */}
              <div className="bg-white p-10 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all duration-300 group">
                <span className="material-symbols-outlined text-6xl text-[#9ACA3C] mb-6 block group-hover:scale-110 transition-transform">security</span>
                <h4 className="font-black text-[#555759] mb-3 uppercase tracking-tighter text-xl">Security Operations</h4>
                <p className="text-xs text-[#555759]/60 px-4 font-bold uppercase tracking-widest">Live video, two-way comms, and incident evidence for rapid response</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Strip */}
        <section className="bg-[#9ACA3C] py-16 relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <h3 className="text-[#395200] font-black text-4xl md:text-5xl tracking-tighter uppercase leading-tight text-center md:text-left">
              Take SelfCAM Further with <br /> SelfTRACK + SelfFLEET
            </h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end shrink-0">
              <Link to="/solution-builder" className="bg-[#555759] text-white px-8 py-5 rounded-lg font-black uppercase text-sm tracking-[0.2em] hover:bg-black transition-colors shadow-2xl flex items-center justify-center border-2 border-transparent">
                Build Your Full Solution
              </Link>
              <Link to="/get-quote" className="bg-transparent border-2 border-[#555759] text-[#555759] px-8 py-5 rounded-lg font-black uppercase text-sm tracking-[0.2em] hover:bg-[#555759] hover:text-white transition-colors shadow-2xl flex items-center justify-center">
                Book Demo
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 flex opacity-10 pointer-events-none">
            <div className="w-2 bg-white ml-auto mr-6 transform skew-x-12"></div>
            <div className="w-8 bg-white mr-6 transform skew-x-12"></div>
            <div className="w-24 bg-white transform skew-x-12"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
