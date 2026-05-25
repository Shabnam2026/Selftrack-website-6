import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Truck, PlayCircle, LifeBuoy, Settings, Smartphone, CreditCard, Phone, MessageCircle, Mail, ChevronDown } from 'lucide-react';

const TOPIC_CARDS = [
  { icon: Truck, title: "Manuals & Downloads", desc: "Access device datasheets, user manuals and compliance documents." },
  { icon: PlayCircle, title: "Video Tutorials", desc: "Step-by-step video guides for setup, installation and platform use." },
  { icon: LifeBuoy, title: "Help & Support", desc: "Get assistance with your account, devices and subscription services." },
  { icon: Settings, title: "Troubleshooting", desc: "Fix common issues with your tracking device or platform login." },
  { icon: Smartphone, title: "App Help", desc: "Download the Selftrack app and learn how to use all its features." },
  { icon: CreditCard, title: "Accounts & Billing", desc: "Manage your subscription, payment methods and billing history." }
];

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    sub: "0861 742 778",
    detail: "Mon–Fri 08:00–17:00",
    button: "Call Now",
    iconBg: "#eaf3de",
    iconColor: "#9ACA3C",
    btnBg: "#9ACA3C",
    subColor: "#9ACA3C"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    sub: "Chat with an agent",
    detail: "Average wait: 2 minutes",
    button: "Start Chat",
    iconBg: "#e8f0ff",
    iconColor: "#3b6fd4",
    btnBg: "#3b6fd4",
    subColor: "#3b6fd4"
  },
  {
    icon: Mail,
    title: "Send a Message",
    sub: "info@selftrack.co.za",
    detail: "We reply within 24 hours",
    button: "Email Us",
    iconBg: "#fff3e8",
    iconColor: "#e07b2a",
    btnBg: "#e07b2a",
    subColor: "#e07b2a"
  }
];

const FAQS = [
  {
    category: "Getting Started",
    data: [
      {
        q: "Can I track my devices from my phone?",
        a: "Yes — download the Selftrack app from the App Store (iOS) or Play Store (Android) by searching 'Selftrack'. Log in with the same credentials you use on our website to view your devices in real-time from anywhere."
      },
      {
        q: "How many contacts can I add to my account?",
        a: "You can add as many contacts as you wish to your Selftrack account. There is no limit on the number of contacts you can configure for alerts and notifications."
      },
      {
        q: "Will the tracking device drain my vehicle's battery?",
        a: "The tracking device requires very low voltage and will not typically drain your battery during normal use. However, if the vehicle is left unused for an extended period, the battery may run flat over time."
      }
    ]
  },
  {
    category: "Stolen Vehicle Recovery",
    data: [
      {
        q: "Who handles Stolen Vehicle Recovery and how do I contact them?",
        a: "Selftrack uses Afrisist (www.afrisist.co.za) for all stolen vehicle recovery. You can reach their 24/7 Recovery Call Centre on 0861 742 778. We strongly recommend saving this number on your phone."
      },
      {
        q: "Does the Recovery Call Centre react automatically to alerts?",
        a: "Only on certain events. If you are subscribed to a Recovery plan, the following events will automatically trigger Call Centre action: Panic Alert (when panic button is pressed), and other critical security events defined in your subscription."
      },
      {
        q: "What do I do if my vehicle is stolen?",
        a: "Immediately contact the 24/7 Recovery Call Centre on 0861 742 778 — save this number now. You can also contact our office during trading hours on 0861 909 101. Do not attempt to recover the vehicle yourself."
      }
    ]
  },
  {
    category: "Installation & Devices",
    data: [
      {
        q: "Do you have fitment centres in Durban and Cape Town?",
        a: "Yes — Selftrack has fitment centres across all provinces within South Africa, including all major cities and suburbs. Most centres also offer mobile installers for on-site installation at your location."
      },
      {
        q: "What do I do if my tracking device is not working?",
        a: "Contact our Customer Care Centre on 0861 909 101 and our team will diagnose and resolve the issue. You can also WhatsApp us on 066 480 5375."
      },
      {
        q: "What do I need to do to remove or move my device to a new vehicle?",
        a: "Contact our Customer Care Centre on 0861 909 101 and they will guide you through the process, arrange a technician if needed, and update your account accordingly."
      }
    ]
  },
  {
    category: "Billing & Payments",
    data: [
      {
        q: "Do you accept card payments?",
        a: "Currently Selftrack accepts EFT (Electronic Funds Transfer) and cash payments only. Card payment facilities are not available at this time."
      },
      {
        q: "What are your trading hours?",
        a: "Our office operates Monday to Friday, 08:00–17:00, excluding weekends and public holidays. A standby agent is available after hours and on weekends via WhatsApp or SMS on 066 480 5375. The Recovery Call Centre is available 24/7 on 0861 742 778."
      },
      {
        q: "Is there a long-term contract required?",
        a: "No credit vetting or long-term contracts are required for standard subscriptions. Simply pay the monthly monitoring fee for as long as you require the service. A 36-month debit order option is available and offers a reduced monthly rate."
      }
    ]
  },
  {
    category: "Platform & App",
    data: [
      {
        q: "How do I view satellite images of my vehicle's location?",
        a: "Satellite images can be viewed via the Selftrack Mobile App (Android & iOS) or through the Web User Interface at selftrack.co.za. Simply log in and select the satellite view option on your map."
      },
      {
        q: "What alerts and reports are available on my subscription?",
        a: "Depending on your plan, you can receive alerts for: speeding, unauthorised movement, battery tamper, panic, crash, towing and geo-fencing. Reports include trip history, SARS Tax Logbook, driving behaviour, fuel and more."
      }
    ]
  }
];

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return FAQS;
    const lowerTerm = searchTerm.toLowerCase();
    return FAQS.map(cat => ({
      ...cat,
      data: cat.data.filter(q => 
        q.q.toLowerCase().includes(lowerTerm) || 
        q.a.toLowerCase().includes(lowerTerm)
      )
    })).filter(cat => cat.data.length > 0);
  }, [searchTerm]);

  const handleSearchTagClick = (tag: string) => {
    setSearchTerm(tag);
    setOpenFaq(null);
  };

  return (
    <div className="bg-[#f4f6f0] flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-1 w-full">
        {/* SECTION 1 - DARK HERO WITH SEARCH */}
        <section className="bg-[#555759] py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-white text-[44px] font-[900] mb-8 tracking-tight font-sans">How Can We Help?</h1>
            <p className="text-white/60 text-lg mb-8 font-sans">Search our knowledge base for quick answers</p>
            
            <div className="relative w-full max-w-[560px] mx-auto mb-6 flex flex-col sm:flex-row gap-0 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-lg">
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions, topics, keywords..."
                className="flex-1 bg-white border-2 border-white/90 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none py-4 px-5 font-['Inter'] text-[14px] text-[#1a2010] placeholder-[#9aaa88] w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] outline-none"
              />
              <button className="bg-[#9ACA3C] text-white font-['Space_Grotesk'] text-[13px] font-[800] uppercase py-4 px-6 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-[#4e7a1a] transition-colors flex items-center justify-center whitespace-nowrap">
                Search &rarr;
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <span className="text-white/60 text-sm py-2 font-sans">Popular Searches:</span>
              {['Vehicle Theft', 'Mobile App', 'Installation', 'Billing', 'Recovery'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => handleSearchTagClick(tag)}
                  className="bg-transparent border border-[#9ACA3C] text-[#9ACA3C] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#9ACA3C] hover:text-white transition-colors font-sans"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 - BROWSE BY TOPIC CARDS */}
        <section className="py-24 px-6 bg-surface-container-lowest font-sans">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[32px] font-[900] mb-12 text-[#555759]">Browse by Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TOPIC_CARDS.map((card, idx) => (
                <div key={idx} className="bg-surface-container-low p-8 rounded-xl transition-all hover:-translate-y-1 group cursor-pointer border-none shadow-none">
                  <div className="text-[#9ACA3C] mb-4">
                    <card.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-[900] text-[#555759] mb-3">{card.title}</h3>
                  <p className="text-[#555759]/70 mb-6 font-normal leading-relaxed">{card.desc}</p>
                  <div className="text-[#9ACA3C] font-bold flex items-center justify-start gap-2 group-hover:gap-4 transition-all">
                    Browse <span className="material-symbols-outlined text-[1.25rem]">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - STILL NEED HELP ROW */}
        <section className="py-24 px-6 bg-surface-container-low font-sans">
          <div className="max-[1200px] mx-auto text-center w-full">
            <h2 className="text-[32px] font-[900] mb-12 text-[#555759]">Still Need Help? We're Here.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
              {/* Call Us */}
              <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-between shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-green-500 text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>phone</span>
                  <h3 className="text-xl font-bold mb-1 text-[#555759]">Call Us</h3>
                  <p className="text-green-600 text-sm font-bold tracking-wider mb-1">0861 742 778</p>
                  <p className="text-[#555759]/60 text-xs mb-4">Mon–Fri 08:00–17:00</p>
                </div>
                <button className="w-full py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors">Call Now</button>
              </div>
              {/* Live Chat */}
              <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-between shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[#9ACA3C] text-5xl mb-4">forum</span>
                  <h3 className="text-xl font-bold mb-1 text-[#555759]">Live Chat</h3>
                  <p className="text-[#9ACA3C] text-sm font-bold tracking-wider mb-1">Chat with an agent</p>
                  <p className="text-[#555759]/60 text-xs mb-4">Average wait: 2 minutes</p>
                </div>
                <button className="w-full py-3 bg-[#9ACA3C] text-white rounded-lg font-bold hover:bg-[#86b134] transition-colors">Start Chat</button>
              </div>
              {/* Email */}
              <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-between shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[#555759] text-5xl mb-4">mail</span>
                  <h3 className="text-xl font-bold mb-1 text-[#555759]">Send a Message</h3>
                  <p className="text-[#555759] text-sm font-bold tracking-wider mb-1">info@selftrack.co.za</p>
                  <p className="text-[#555759]/60 text-xs mb-4">We reply within 24 hours</p>
                </div>
                <button className="w-full py-3 border-2 border-[#555759] text-[#555759] rounded-lg font-bold hover:bg-[#555759] hover:text-white transition-all">Email Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - ACCORDION FAQ LIST */}
        <section className="py-24 px-6 bg-surface-container-lowest font-sans">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[32px] font-[900] mb-12 text-[#555759] text-center">Most Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center text-[#555759]/70 font-sans">No results found for "{searchTerm}"</div>
              ) : (
                filteredFaqs.map((cat, cidx) => (
                  <div key={cidx} className="mb-10">
                    <h3 className="text-lg font-[900] text-[#555759] mb-4 uppercase tracking-widest">{cat.category}</h3>
                    <div className="space-y-4">
                      {cat.data.map((faq, fidx) => {
                        const key = `${cidx}-${fidx}`;
                        const isOpen = openFaq === key;
                        return (
                          <div key={fidx} className="bg-surface-container-low rounded-xl overflow-hidden transition-all hover:bg-[#ebecec]">
                            <div 
                              onClick={() => setOpenFaq(isOpen ? null : key)}
                              className="flex justify-between items-center p-6 cursor-pointer"
                            >
                              <span className="text-lg font-bold text-[#555759] pr-4">{faq.q}</span>
                              <ChevronDown size={24} className={`text-[#9ACA3C] transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                            <div 
                              className="transition-all duration-300 ease-in-out overflow-hidden" 
                              style={{ maxHeight: isOpen ? '500px' : '0' }}
                            >
                              <div className="px-6 pb-6 text-[#555759]/80 font-normal leading-relaxed border-t border-black/5 mt-2 pt-4">
                                {faq.a}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5 - DARK FOOTER CTA BAR */}
        <section className="bg-[#9ACA3C] py-16 px-6 font-sans">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-[900] text-white uppercase tracking-tight mb-2">Already a Selftrack Customer?</h2>
              <p className="text-white/90 text-lg font-medium">Manage your account, devices and subscriptions online</p>
            </div>
            <button className="bg-white text-[#9ACA3C] px-10 py-4 rounded-lg font-[900] text-lg uppercase tracking-tight hover:shadow-xl transition-all shadow-md">
              Login to Your Portal
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

