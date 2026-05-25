import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import { ShieldCheck, Award, Siren, BellRing } from 'lucide-react';

export default function Family() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <section className="bg-surface-container-lowest min-h-[819px] flex items-center relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 w-full flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-[55%] space-y-8 py-12">
            <h1 className="text-[52px] leading-[1.1] font-black text-[#2B2B2B] tracking-tight font-headline">
              Protect Your Vehicle and Loved Ones
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl">
              Realtime GPS Tracking. Stolen Vehicle Recovery. Automated Notifications. — starting from R99/month.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/pricing" className="bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#496800] transition-all shadow-2xl shadow-[#9ACA3C]/20 text-center">FIND BEST SOLUTION</Link>
            </div>
            <div className="flex flex-wrap gap-4 pt-12 items-center">
              <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl">
                <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">Insurance Approved</span>
              </div>
              <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl">
                <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                  <BellRing size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">Instant Alert Notifications</span>
              </div>
              <div className="flex items-center gap-3 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-zinc-100 px-4 py-3 rounded-2xl">
                <div className="bg-[#9ACA3C]/10 text-[#7ca82b] p-2 rounded-xl flex items-center justify-center">
                  <Siren size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#555759]">24/7 Recovery</span>
              </div>
            </div>
          </div>
          <div className="md:w-[45%] relative">
            <div className="relative z-10 p-4 bg-on-surface rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[400px] mx-auto">
              <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19] relative">
                <img className="w-full h-full object-cover" data-alt="smartphone screen displaying a modern vehicle tracking application with map interface and live GPS location pin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJVHbQz2jA8d5Y3gmnMQQou34Ow5oK1-ccoL94_C2H5istjt5j_ZtYujRTqFMBF6qSp6lcF-vXfR-muluMtYLL5otOdrJVoq4FidinI_C4d3jMNouzC3EUkwyF9fzANdIt8QMtVikXPAUpDbZ9zjN_1Sy6jyZnRhkIolek8tBAVtkQAeK93LOkmH2wRLeAi9uck9WcbPYiYTPVQgnalgAxYcqcF-FHAsMCobXcOoGueBrMpKW5PkwV10FJTUpjBKVKKj41_mq2kECt" alt="App UI Map" />
                <div className="absolute bottom-4 left-4 right-4 kinetic-glass p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase text-primary">Live Tracking</span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <p className="text-sm font-bold text-on-surface">BMW X5 - Moving</p>
                  <p className="text-[10px] text-on-surface-variant">Last seen: Just now in Sandton</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-[32px] font-black text-on-surface leading-tight font-headline">Everything You Need to Protect Your Vehicle</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <h3 className="text-xl font-bold text-on-surface">Real-Time Tracking</h3>
              <p className="text-on-surface-variant leading-relaxed">Follow your vehicle's precise movement live on any smartphone or computer with pin-point accuracy.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <h3 className="text-xl font-bold text-on-surface">Stolen Vehicle Recovery</h3>
              <p className="text-on-surface-variant leading-relaxed">Dedicated stolen vehicle recovery teams standing by 24/7 to assist with emergencies and secure your assets when it matters most.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <h3 className="text-xl font-bold text-on-surface">Instant Alerts</h3>
              <p className="text-on-surface-variant leading-relaxed">Receive alerts on events such as Accidents, Battery Tampers, Speeding, Geofence violation, Unauthorised Movement/Towing, Jamming and Excessive Idling.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>app_shortcut</span>
              <h3 className="text-xl font-bold text-on-surface">Mobile App</h3>
              <p className="text-on-surface-variant leading-relaxed">Manage your entire profile through the Web UI and monitor all assets on our intuitive mobile app designed for modern families on the move.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h3 className="text-xl font-bold text-on-surface">Insurance Approved</h3>
              <p className="text-on-surface-variant leading-relaxed">Our systems are fully certified, often helping you reduce your monthly insurance premiums significantly.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-lg space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#9ACA3C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
              <h3 className="text-xl font-bold text-on-surface">Reports</h3>
              <p className="text-on-surface-variant leading-relaxed">Obtain a variety of reports such as Trip and SARS Logbook Reports among others. Reports may easily be scheduled for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 className="text-3xl font-black mb-16 text-on-surface font-headline">Trusted by Thousands of Families</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-[#9ACA3C]">
              <div className="flex items-center gap-1 mb-4 text-[#9ACA3C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-on-surface-variant mb-6">"Recovered my car in less than 45 minutes after it was hijacked. The response team was professional and kept me calm."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" data-alt="headshot of a smiling middle-aged man with short hair in professional attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsflCdB-FEpdXsodJi0LcLQHxXVrtlF6ZYHGDd9mP6LV60jJ_3XjApAMDd46Wk_iAPAaLYUSe8AvKfjXgo7U3_335gEbI_5bV1pQ7Q7wjt5Wq-W9-F2Nfag64QF75Gw8A61OOXMMkCwfQyHAd-1h9XuqwjhVgJz5vsPtRWbZaH9IgbLv_w0aLbN-DuAn_0oibvPKYF9zyIVZvlrewqkFq9WQb_G7kGqTzS1VEbK_cVo96IvMFEUQGgXtmDaozhM7GdgnYkboUzNxV8" alt="David M." />
                <div>
                  <p className="font-bold text-on-surface">David M.</p>
                  <p className="text-xs text-on-surface-variant">Pretoria East</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-[#9ACA3C]">
              <div className="flex items-center gap-1 mb-4 text-[#9ACA3C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-on-surface-variant mb-6">"I track my son's car when he commutes to university. Gives me absolute peace of mind knowing exactly where he is."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" data-alt="portrait of a confident woman in her 40s with a warm smile and natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1D83jq9207RzsPfQiXb3ErOSGoYN6ct76zz9pZqlSfWV6oHc4F4fcf1ObuQm1CK74u8qJNVwEbCzahBbUqda5Hj5ZQfG-UKMM4Oh6rKLjHVoEW398YaLEjEjmgmYdTVC2kfYedurR2kcRPBjEymxfJLig7dJbSEe9DGEsTAFS4yGaWtJI7Z5Ca_fp1rnTeT-8OwUmVp42bdZ-dtV7t6h0gM4WBynOt1fJyezjNnyqXR-bBZ9kMI52kXWHyq-aocXIQUsf-G_g8We1" alt="Sarah J." />
                <div>
                  <p className="font-bold text-on-surface">Sarah J.</p>
                  <p className="text-xs text-on-surface-variant">Cape Town</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-[#9ACA3C]">
              <div className="flex items-center gap-1 mb-4 text-[#9ACA3C]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="italic text-on-surface-variant mb-6">"Best price in the market with the best service. The app is much more user-friendly than the previous big name company I used."</p>
              <div className="flex items-center gap-4">
                <img className="w-12 h-12 rounded-full object-cover" data-alt="headshot of a cheerful man outdoors with a friendly expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHz24IcaBR1zpPaoCfK1gsdlERlIcmczQ1Osf-aD6WUgjDN2qlwEmPQa6PhzFQGSQn44pOuPlScnnUXt_OXFE7mGAX59Cm-S7m7e6uQ_Xx01BsH1aa9qTB_aHurqQkjTvXNPrw3R9YOo_qDuMrbHB0pXqkzXDXs7mjTFVH2W95LEBxqN8ODoPayUntWN3oAJjMgDYUiw3_BaTvKvfEM2qiZe5yb5YYcgVyoGaXMa0FQDyXsR0twJA7B2q4_LUJQMrOImc0MSXj_VYc" alt="Thabo K." />
                <div>
                  <p className="font-bold text-on-surface">Thabo K.</p>
                  <p className="text-xs text-on-surface-variant">Sandton</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-outline-variant/15">
            <div className="space-y-2">
              <div className="text-[#9ACA3C] text-6xl font-black font-headline">20+</div>
              <div className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#9ACA3C] text-6xl font-black font-headline">100,000+</div>
              <div className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">Devices Tracked</div>
            </div>
            <div className="space-y-2">
              <div className="text-[#9ACA3C] text-6xl font-black font-headline">98%+</div>
              <div className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#9ACA3C] py-20 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-8 relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tight font-headline">Start Protecting Your Vehicle Today</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/pricing" className="bg-white text-[#9ACA3C] px-10 py-5 rounded-lg font-black text-lg shadow-xl hover:bg-surface transition-all text-center">FIND BEST SOLUTION</Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none"></div>
      </section>

      <Footer />
    </div>
  );
}
