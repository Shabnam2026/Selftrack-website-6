import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Facebook, Instagram, Mail, Linkedin, Twitter, Youtube, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-[#555759] antialiased">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1440px] mx-auto pt-32 pb-24 px-8">
        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#555759] leading-[1.1] mb-6">Contact Us</h1>
          <p className="text-xl text-[#555759]/70 font-regular max-w-xl">
            Looking for help? Fill the form and start a new adventure.
          </p>
        </div>

        {/* Two Column Layout Base */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          
          {/* Left Section: Contact Details */}
          <div className="w-full lg:w-1/3 flex flex-col gap-12">
            
            {/* Headquarters */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#9ACA3C]/10 flex items-center justify-center shrink-0">
                <MapPin className="text-[#9ACA3C]" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#555759] mb-2">Headquarters</h3>
                <address className="not-italic text-[#555759]/70 leading-relaxed font-regular">
                  Kings Corner<br />
                  475 Kings Highway (cnr Rodericks Road)<br />
                  Lynnwood<br />
                  Pretoria, Gauteng, SA
                </address>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#9ACA3C]/10 flex items-center justify-center shrink-0">
                <Phone className="text-[#9ACA3C]" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#555759] mb-2">Phone</h3>
                <ul className="text-[#555759]/70 space-y-2 font-regular">
                  <li><span className="font-bold text-[#555759]">Customer Care:</span> 0861 909 101</li>
                  <li><span className="font-bold text-[#555759]">Recovery:</span> 0861 742 778</li>
                  <li><span className="font-bold text-[#555759]">Sales:</span> 071 604 6133</li>
                </ul>
              </div>
            </div>

            {/* Support */}
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[#9ACA3C]/10 flex items-center justify-center shrink-0">
                <MessageSquare className="text-[#9ACA3C]" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#555759] mb-2">Support</h3>
                <ul className="text-[#555759]/70 space-y-2 font-regular">
                  <li><a href="mailto:info@selftrack.co.za" className="hover:text-[#9ACA3C] transition-colors">info@selftrack.co.za</a></li>
                  <li><a href="mailto:support@selftrack.co.za" className="hover:text-[#9ACA3C] transition-colors">support@selftrack.co.za</a></li>
                  <li><a href="mailto:clientcare@selftrack.co.za" className="hover:text-[#9ACA3C] transition-colors">clientcare@selftrack.co.za</a></li>
                </ul>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-8 border-t border-[#f3f3f6]">
              <h3 className="font-bold text-base text-[#555759] mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/selftrackheadoffice/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.397,20.997v-8.196h2.765l0.411-3.209h-3.176V7.548c0-0.926,0.258-1.56,1.587-1.56h1.684V3.127 C15.849,3.039,15.025,2.997,14.201,3c-2.444,0-4.122,1.492-4.122,4.231v2.355H7.332v3.209h2.753v8.202H13.397z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/selftrackheadoffice/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="mailto:info@selftrack.co.za" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-[#9ACA3C] hover:border-[#9ACA3C] transition-all shadow-sm">
                  <Mail size={18} />
                </a>
                <a href="https://www.linkedin.com/company/selftrack-vehicle-tracking/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://x.com/Selftrack1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-black hover:border-black transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/channel/UC084WS1OPOFeqxZRHGRb29w" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#edeef0] flex items-center justify-center text-[#555759] hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#edeef0]">
            <h2 className="text-3xl font-black text-[#555759] mb-8">Let's Connect</h2>
            
            <form className="flex flex-col gap-8">
              {/* Name & Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-bold text-[#555759]">First Name *</label>
                  <input type="text" id="firstName" className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-bold text-[#555759]">Last Name *</label>
                  <input type="text" id="lastName" className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-[#555759]">Email Address *</label>
                  <input type="email" id="email" className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-[#555759]">Phone Number *</label>
                  <input type="tel" id="phone" className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all" required />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-bold text-[#555759]">I need more information on:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-[#edeef0] rounded bg-white checked:bg-[#9ACA3C] checked:border-[#9ACA3C] transition-colors" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[#555759]/70 font-bold group-hover:text-[#555759] transition-colors">GPS Tracking</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-[#edeef0] rounded bg-white checked:bg-[#9ACA3C] checked:border-[#9ACA3C] transition-colors" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[#555759]/70 font-bold group-hover:text-[#555759] transition-colors">Fleet Management</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-[#edeef0] rounded bg-white checked:bg-[#9ACA3C] checked:border-[#9ACA3C] transition-colors" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[#555759]/70 font-bold group-hover:text-[#555759] transition-colors">Live Camera</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-[#edeef0] rounded bg-white checked:bg-[#9ACA3C] checked:border-[#9ACA3C] transition-colors" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[#555759]/70 font-bold group-hover:text-[#555759] transition-colors">Financing</span>
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-bold text-[#555759]">Subject</label>
                <input type="text" id="subject" className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all" />
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-[#555759]">How can we help?</label>
                <textarea id="message" rows={5} className="w-full bg-[#f3f3f6] px-4 py-3 rounded-lg border border-transparent focus:border-[#9ACA3C] focus:bg-white focus:ring-4 focus:ring-[#9ACA3C]/10 outline-none transition-all resize-none"></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button type="button" className="bg-[#9ACA3C] text-white font-black px-10 py-5 rounded-lg shadow-2xl shadow-[#9ACA3C]/20 hover:bg-[#496800] transition-all text-sm uppercase tracking-widest leading-none w-max">
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <section className="w-full mb-32">
          <h2 className="text-3xl font-black text-[#555759] mb-8">Our Locations</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-6 py-3 rounded-xl bg-[#555759] text-white font-bold text-sm hover:bg-black transition-colors">
              Fitment Centers (63)
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-[#edeef0] bg-white text-[#555759] font-bold text-sm hover:border-black transition-colors">
              Offices (11)
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-[#edeef0] bg-white text-[#555759] font-bold text-sm hover:border-black transition-colors">
              Recovery Agents (63)
            </button>
          </div>

          <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-sm border border-[#edeef0] relative bg-[#f3f3f6] group">
            {/* Embedded interactive map placeholder with visual map aesthetic */}
            <div className="absolute inset-0 bg-[#e4e5e7]">
              <iframe 
                title="Map of South Africa locations"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=16.0%2C-35.0%2C33.0%2C-22.0&amp;layer=mapnik" 
                className="w-full h-full pointer-events-none opacity-80"
              />
            </div>
            
            {/* Mock map UI overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 transition-opacity">
              <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg text-[#555759] hover:text-[#9ACA3C] font-bold text-xl border border-[#edeef0]">
                +
              </button>
              <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg text-[#555759] hover:text-[#9ACA3C] font-bold text-xl border border-[#edeef0]">
                −
              </button>
            </div>

            {/* Custom Markers */}
            <div className="absolute top-[40%] text-[#9ACA3C] left-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
              <div className="bg-[#555759] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold mb-2 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                Headquarters
              </div>
              <MapPin size={36} weight="fill" className="drop-shadow-lg" />
            </div>
            
            <div className="absolute top-[60%] text-[#9ACA3C] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
              <div className="bg-[#555759] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold mb-2 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                Cape Town Office
              </div>
              <MapPin size={28} weight="fill" className="drop-shadow-lg" />
            </div>

            <div className="absolute top-[45%] text-[#9ACA3C] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
               <div className="bg-[#555759] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold mb-2 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap">
                Durban Fitment Center
              </div>
              <MapPin size={28} weight="fill" className="drop-shadow-lg" />
            </div>
            
             <div className="absolute top-[35%] text-[#555759] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
               <MapPin size={20} weight="fill" className="opacity-70 drop-shadow-md" />
            </div>
             <div className="absolute top-[50%] text-[#555759] left-[58%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
               <MapPin size={20} weight="fill" className="opacity-70 drop-shadow-md" />
            </div>
             <div className="absolute top-[65%] text-[#555759] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
               <MapPin size={20} weight="fill" className="opacity-70 drop-shadow-md" />
            </div>
             <div className="absolute top-[55%] text-[#555759] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/marker cursor-pointer">
               <MapPin size={20} weight="fill" className="opacity-70 drop-shadow-md" />
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none"></div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
