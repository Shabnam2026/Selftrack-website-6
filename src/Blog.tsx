import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Truck, ShieldCheck, LocateFixed, Newspaper, BarChart2, Award, Lock, Smartphone, Globe, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  "All Posts", "Fleet Management", "Vehicle Security", "GPS Technology", "Industry News", "Company Updates"
];

const POSTS = [
  {
    id: 1,
    category: "Fleet Management",
    gradient: "linear-gradient(135deg, #1a3a0a, #2d5c12)",
    icon: Truck,
    title: "5 Ways Real-Time GPS Tracking Improves Fleet Efficiency",
    excerpt: "From eliminating unauthorised vehicle use to optimising delivery routes, discover how Selftrack's platform helps South African fleet managers cut costs and boost driver accountability in 2024.",
    date: "Jan 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    category: "Vehicle Security",
    gradient: "linear-gradient(135deg, #2a1a0a, #5c3212)",
    icon: ShieldCheck,
    title: "What to Do Immediately When Your Vehicle is Stolen",
    excerpt: "Speed is critical during vehicle theft. This step-by-step guide covers exactly what to do — from contacting Afrisist's 24/7 recovery line 0861 742 778 to working with law enforcement for rapid recovery.",
    date: "Feb 2024",
    readTime: "4 min read"
  },
  {
    id: 3,
    category: "GPS Technology",
    gradient: "linear-gradient(135deg, #0a1a3a, #12305c)",
    icon: LocateFixed,
    title: "OBD vs Hardwired Trackers: Which is Right for Your Vehicle?",
    excerpt: "The Selftrack MeTrack plugs directly into your OBD-II port for instant self-installation, while hardwired devices offer deeper vehicle integration. We break down the pros and cons of each option.",
    date: "Feb 2024",
    readTime: "6 min read"
  },
  {
    id: 4,
    category: "Industry News",
    gradient: "linear-gradient(135deg, #1a1a2a, #32325c)",
    icon: Newspaper,
    title: "SARS Tax Logbook Requirements: How Selftrack Keeps You Compliant",
    excerpt: "South African tax law requires a detailed logbook for business mileage claims. Selftrack automatically generates SARS-compliant digital logbooks — saving you hours of manual record-keeping every month.",
    date: "Mar 2024",
    readTime: "5 min read"
  },
  {
    id: 5,
    category: "Fleet Management",
    gradient: "linear-gradient(135deg, #1a3a0a, #2d5c12)",
    icon: BarChart2,
    title: "Reducing Fuel Theft in Your Fleet with Selftrack Monitoring",
    excerpt: "Fuel theft costs South African businesses millions annually. Selftrack's fuel monitoring solution tracks real-time consumption, flags irregularities and provides tamper alerts to protect your fleet budget.",
    date: "Mar 2024",
    readTime: "7 min read"
  },
  {
    id: 6,
    category: "Company Updates",
    gradient: "linear-gradient(135deg, #1a2a0a, #9ACA3C)",
    icon: Award,
    title: "Selftrack Achieves VESA Accreditation Renewal for 2024",
    excerpt: "We are proud to announce the renewal of our VESA (Vehicle Security Association of South Africa) accreditation, confirming that Selftrack devices continue to meet the highest national tracking and recovery standards.",
    date: "Apr 2024",
    readTime: "3 min read"
  },
  {
    id: 7,
    category: "Vehicle Security",
    gradient: "linear-gradient(135deg, #2a1a0a, #5c3212)",
    icon: Lock,
    title: "Does GPS Tracking Actually Help Recover Stolen Vehicles?",
    excerpt: "Selftrack has assisted in hundreds of vehicle recoveries across South Africa since 2007. We look at how our 24/7 partnership with Afrisist works in practice and what makes the difference between recovery and loss.",
    date: "Apr 2024",
    readTime: "5 min read"
  },
  {
    id: 8,
    category: "GPS Technology",
    gradient: "linear-gradient(135deg, #0a1a3a, #12305c)",
    icon: Smartphone,
    title: "Getting the Most Out of the Selftrack Mobile App",
    excerpt: "The Selftrack mobile app puts real-time tracking, alerts, trip history and geofence management in your pocket. This guide walks through every feature available on iOS and Android for new and existing customers.",
    date: "May 2024",
    readTime: "6 min read"
  },
  {
    id: 9,
    category: "Industry News",
    gradient: "linear-gradient(135deg, #1a1a2a, #32325c)",
    icon: Globe,
    title: "How Telematics is Transforming SME Fleet Management in SA",
    excerpt: "Small and medium enterprises are increasingly adopting telematics solutions to compete with larger operators. We explore how affordable GPS tracking from Selftrack is levelling the playing field for South African SMEs.",
    date: "May 2024",
    readTime: "8 min read"
  }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchLower) || post.excerpt.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-surface-container-low min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* SECTION 1 - DARK HERO BANNER */}
        <section className="bg-[#555759] pt-16 pb-14 px-6 text-center">
          <div className="text-[#9ACA3C] text-[11px] font-[900] uppercase tracking-[2px] mb-4 font-sans">
            INSIGHTS & UPDATES
          </div>
          <h1 className="text-white text-[44px] font-[900] tracking-tight mb-4 font-sans">
            The SelfTrack Blog
          </h1>
          <p className="text-white/60 text-lg max-w-[560px] mx-auto font-sans leading-relaxed">
            Expert insights on GPS tracking, fleet management, vehicle security and industry news from South Africa's leading telematics provider.
          </p>

          <div className="relative w-full max-w-[560px] mx-auto mt-12 mb-8 flex flex-col sm:flex-row gap-0 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-lg">
            <input 
              type="text"
              placeholder="Search articles, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-white border-2 border-white/90 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none py-4 px-5 font-sans text-[14px] text-[#555759] placeholder-[#555759]/60 w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] outline-none"
            />
            <button 
              onClick={() => {}} // Could trigger search, but with React it filters live
              className="bg-[#9ACA3C] text-white font-sans text-[13px] font-[800] uppercase py-4 px-6 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-[#8ab830] transition-colors flex items-center justify-center whitespace-nowrap tracking-tight"
            >
              SEARCH &rarr;
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-10 flex-wrap font-sans">
            <div>
              <div className="text-[24px] font-[900] text-[#9ACA3C]">18+</div>
              <div className="text-[12px] text-white/50 mt-1 font-bold">Articles</div>
            </div>
            <div>
              <div className="text-[24px] font-[900] text-[#9ACA3C]">5</div>
              <div className="text-[12px] text-white/50 mt-1 font-bold">Categories</div>
            </div>
            <div>
              <div className="text-[24px] font-[900] text-[#9ACA3C]">Since 2007</div>
              <div className="text-[12px] text-white/50 mt-1 font-bold">Tracking Experts</div>
            </div>
          </div>
        </section>

        {/* SECTION 2 - CATEGORY FILTER TABS */}
        <section className="bg-white border-b border-surface-variant px-6">
          <div className="max-w-[1100px] mx-auto flex gap-0 overflow-x-auto scrollbar-none hide-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setSearchQuery(''); }}
                className={`px-5 py-4 font-sans text-[13px] font-bold whitespace-nowrap transition-colors flex-shrink-0 border-b-2 bg-transparent ${
                  activeCategory === category 
                    ? 'border-[#9ACA3C] text-[#9ACA3C]' 
                    : 'border-transparent text-[#555759]/70 hover:text-[#555759]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 3 - FEATURED POST & SECTION 4 - GRID */}
        <div className="bg-surface-container-lowest">

          {/* FEATURED POST (HERO CARD) - Only show if no search query and "All Posts" is selected */}
          {activeCategory === "All Posts" && !searchQuery && (
            <section className="pt-16 px-6">
              <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row group bg-surface-container-low rounded-xl overflow-hidden border-none shadow-sm font-sans cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-full md:w-[45%] flex items-center justify-center relative bg-[#555759] min-h-[320px]">
                    <div className="absolute top-6 left-6 bg-[#9ACA3C] text-white text-[10px] font-bold uppercase py-1 px-3 rounded-full tracking-wide border border-white/20">
                      FEATURED
                    </div>
                    <MapPin size={80} className="text-white/80" strokeWidth={1} />
                  </div>
                  <div className="w-full md:w-[55%] p-10">
                    <div className="inline-block bg-white text-[#9ACA3C] text-[11px] font-bold uppercase tracking-wide py-1 px-3 rounded-full border border-black/5">
                      Fleet Management
                    </div>
                    <h2 className="text-[26px] font-[900] text-[#555759] mt-4 leading-tight">
                      How GPS Fleet Tracking Reduces Operational Costs by Up to 30%
                    </h2>
                    <p className="text-[14px] text-[#555759]/70 leading-relaxed mt-4">
                      South African fleet operators face rising fuel costs, vehicle wear and driver accountability challenges. Selftrack's real-time GPS fleet tracking platform gives fleet managers complete visibility — from live location and route history to fuel consumption and driving behaviour scoring.
                    </p>
                    <div className="mt-6 flex items-center flex-wrap gap-4 text-[#555759]/70 text-[12px]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#9ACA3C] font-bold border border-black/5">
                          ST
                        </div>
                        <span className="font-bold text-[#555759]">Selftrack Team</span>
                      </div>
                      <span>&middot;</span>
                      <span className="font-bold">15 March 2024</span>
                      <span>&middot;</span>
                      <span className="font-bold">6 min read</span>
                    </div>
                    <a href="#" className="font-bold text-[#9ACA3C] mt-6 inline-block no-underline hover:text-[#555759] transition-colors">
                      Read Full Article &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* BLOG CARDS GRID */}
          <section className="py-16 px-6 font-sans">
            <div className="max-w-[1100px] mx-auto">
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, idx) => (
                    <div 
                      key={post.id} 
                      className="group animate-in fade-in slide-in-from-bottom-[8px] duration-300"
                      style={{ 
                        animationDelay: `${idx * 50}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="bg-surface-container-low rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-md h-full flex flex-col transition-all duration-200 cursor-pointer shadow-sm border-none">
                        <div className="h-[180px] bg-[#555759] flex items-center justify-center relative">
                          <div className="absolute top-4 left-4 bg-white/90 text-[#555759] text-[10px] font-bold uppercase tracking-wide py-1 px-3 rounded-full">
                            {post.category}
                          </div>
                          <post.icon size={56} className="text-[#9ACA3C]" strokeWidth={1.6} />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-[17px] font-[900] text-[#555759] leading-snug mb-2 group-hover:text-[#9ACA3C] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-[13px] text-[#555759]/70 leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto">
                            <div className="h-[1px] bg-black/5 mb-4"></div>
                            <div className="flex justify-between items-center text-[12px]">
                              <div className="text-[#555759]/60 font-bold">
                                {post.date} &middot; {post.readTime}
                              </div>
                              <div className="font-[900] text-[#9ACA3C]">
                                Read &rarr;
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-container-low rounded-xl p-10 text-center border-none shadow-sm">
                  <p className="text-[15px] text-[#555759]/80 font-bold mb-4">
                    No articles found for "{searchQuery}" &mdash; try a different search
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="bg-transparent border-2 border-[#9ACA3C] text-[#9ACA3C] px-6 py-2 rounded-lg text-[13px] font-[900] hover:bg-[#9ACA3C] hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Clear search
                  </button>
                </div>
              )}

            </div>
          </section>
        </div>

        {/* SECTION 5 - NEWSLETTER SIGNUP BAND */}
        <section className="bg-surface-container-low py-16 px-6 text-center font-sans border-y border-black/5">
          <div className="max-w-[600px] mx-auto">
            <Mail size={48} className="text-[#9ACA3C] mx-auto mb-4" />
            <h2 className="text-[28px] font-[900] text-[#555759]">
              Stay Ahead of the Fleet
            </h2>
            <p className="text-[15px] text-[#555759]/70 mt-3 leading-relaxed font-medium">
              Get the latest GPS tracking insights, product updates and industry news delivered to your inbox. No spam &mdash; unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="animate-in fade-in zoom-in duration-300 mt-6 text-[#9ACA3C] text-[16px] font-[900]">
                &check; You're subscribed! Check your inbox for a confirmation email.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row mt-8 max-w-[460px] mx-auto shadow-sm">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border border-transparent focus:border-[#9ACA3C] rounded-lg sm:rounded-r-none sm:rounded-l-lg px-4 py-3 text-[14px] text-[#555759] font-medium outline-none transition-colors"
                />
                <button 
                  type="submit"
                  className="bg-[#9ACA3C] text-white text-[13px] font-[900] uppercase tracking-wide px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg mt-2 sm:mt-0 hover:bg-[#8ab830] transition-colors"
                >
                  SUBSCRIBE &rarr;
                </button>
              </form>
            )}

            <div className="text-[12px] text-[#555759]/60 font-bold mt-4">
              &#128274; We respect your privacy. Unsubscribe anytime.
            </div>
          </div>
        </section>

        {/* SECTION 6 - DARK FOOTER CTA BAR */}
        <section className="bg-[#9ACA3C] py-16 px-6 font-sans">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-[24px] md:text-[28px] font-[900] text-white uppercase tracking-tight mb-2">Ready to Start Tracking?</h2>
              <p className="text-white/90 text-lg font-bold">Join thousands of South African businesses already using Selftrack</p>
            </div>
            <Link to="/contact">
              <button className="bg-white text-[#9ACA3C] px-10 py-4 rounded-lg font-[900] text-[15px] uppercase tracking-wide hover:shadow-xl transition-all shadow-md">
                GET STARTED TODAY &rarr;
              </button>
            </Link>
          </div>
          <div className="max-w-[1200px] mx-auto mt-10 border-t border-black/10 pt-8 text-center font-sans">
            <div className="text-white font-[900] text-[15px] tracking-widest mb-2">
              RECOVERY: 0861 742 778 | 021 834 9750
            </div>
            <div className="text-black/50 font-[900] text-[12px] uppercase tracking-wider">
              Head Office: 012 460 1495 &middot; Customer Care: 066 480 5375 &middot; Sales: 071 604 6133
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
