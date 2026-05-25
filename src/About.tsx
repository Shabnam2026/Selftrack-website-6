import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FileText, ChevronDown, ChevronUp, MapPin, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function About() {
  const [activeTab, setActiveTab] = useState('All');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const swipeThreshold = 50;
    if (distance > swipeThreshold) nextTestimonial();
    if (distance < -swipeThreshold) prevTestimonial();
    setTouchStart(0);
    setTouchEnd(0);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      name: "Vivien de Klerk",
      company: "Fleet Customer",
      type: "VERIFIED BUSINESS",
      quote: "After many years of using various different companies for our fleet tracking we gave Selftrack a chance. Best decision we have ever made for our business. Pieter the owner is one of the most “genuine“ people I have met in my life and he Nd his staff not only promise the extra mile, they walk it."
    },
    {
      name: "Johan L Craven",
      type: "INDIVIDUAL",
      quote: "I am very satisfied with the vehicle tracking product as well as the service I received. I would recommend Selftrack to anyone who needs such a product."
    },
    {
      name: "Adriaan Du Toit",
      company: "Hlokomelang",
      type: "VERIFIED BUSINESS",
      quote: "Hlokomelang subscribed to Selftrack’s services in June 2013, and has since benefitted from Selftrack’s very easy to use tracking and monitoring platform. We would recommend Selftrack’s service!"
    },
    {
      name: "Johan Labuschagne",
      company: "BMW",
      type: "VERIFIED BUSINESS",
      quote: "It has been our utmost pleasure to work with Selftrack during the annual Hot Climate Prototype testing in the Northern and Western Cape and throughout ZA over the past few years. The service we have received from Selftrack over the years has been nothing but exemplary and I would highly recommend them to any future users."
    },
    {
      name: "Dr HJC van Niekerk",
      type: "INDIVIDUAL",
      quote: "Hiermee wil ek net bevestig dat ek tevrede is met Selftrack se produk en ook me die diens wat aan my gelewer is."
    },
    {
      name: "Marlene Botha",
      company: "Smart Retail",
      type: "VERIFIED BUSINESS",
      quote: "We have been a client of Selftrack now for a while and are very happy with the service they provide. We have our company as well as our private vehicles with them."
    },
    {
      name: "Edith Ngobeni",
      company: "Dept of Traditional Affairs",
      type: "VERIFIED BUSINESS",
      quote: "Selftrack was appointed by the Department of Traditional Affairs for vehicle Tracking devices on some official vehicles. Since then, we have been working so well with the company and the services that they provide to the Department is exceptional. We enjoying the relationship that we have with them."
    },
    {
      name: "Elize Nieman",
      company: "Black Pearl",
      type: "VERIFIED BUSINESS",
      quote: "Shu Selftrack se mense is op top formaat! Kliente diens is puik van almal, dis regtig baie lekker om met sulke mense besigheid te doen. Gelukkig kyk die proffesionele span na alles. Baiie baie dankie -"
    },
    {
      name: "C. Brett",
      company: "Performance Plant Hire",
      type: "VERIFIED BUSINESS",
      quote: "I would like to commend Selftrack and their team for successfully recovering our vehicle which was hijacked in an armed robbery. We at Performance Plant Hire appreciate your quick response and the professional way that your personnel handled the recovery. Thank you."
    },
    {
      name: "Janine Rowley",
      company: "Woman Against Rape (WAR)",
      type: "VERIFIED NPO",
      quote: "Selftrack donated a state-of-the-art GPS tracking system for the delivery vehicle of our NPO, Woman Against Rape (WAR). The vehicle is in daily use and exposed to some of the most dangerous geographical areas in and around Pretoria. Since the installation, we had so much more confidence to travel where we need to be. Without Selftrack’s most valued donation, we would not have been able to operate with complete peace of mind."
    },
    {
      name: "Martin Middleton",
      type: "INDIVIDUAL",
      quote: "Thank you to Pieter Coetzee, Gerald and Anthony for excellent service over many years! Anthony the technician is installing my 4th unit today. I would recommend them to everybody!"
    },
    {
      name: "Juane van Heerden",
      type: "INDIVIDUAL",
      quote: "Quick, efficient and managed to recover our vehicle! Thank you Selftrack!"
    },
    {
      name: "Moses Matsepane",
      type: "INDIVIDUAL",
      quote: "Great company, great people."
    },
    {
      name: "Jacques van der Westhuizen",
      type: "INDIVIDUAL",
      quote: "Best service provider by far."
    },
    {
      name: "Rudolf Viljoen",
      type: "INDIVIDUAL",
      quote: "Definitely a product one needs for your company’s fleet of vehicles and own car for that matter"
    },
    {
      name: "Allen Rossouw",
      type: "INDIVIDUAL",
      quote: "The service I have received is awesome."
    },
    {
      name: "Frans Labuschagne",
      type: "INDIVIDUAL",
      quote: "Excellent tracking system and peace of mind."
    },
    {
      name: "Cornel Jonker",
      type: "INDIVIDUAL",
      quote: "Very reliable and fast recovery. Five stars!"
    },
    {
      name: "Pieter Saunders",
      type: "INDIVIDUAL",
      quote: "The best fleet management tool we have used."
    },
    {
      name: "Nwagezani Magoda",
      type: "INDIVIDUAL",
      quote: "Highly recommended for personal tracking and safety."
    },
    {
      name: "Magdeline Mdaka",
      type: "INDIVIDUAL",
      quote: "Great customer service and very user friendly interface."
    },
    {
      name: "Marius van der Merwe",
      type: "INDIVIDUAL",
      quote: "Exceptional platform for large fleets and business monitoring."
    },
    {
      name: "Otto Jaftha",
      type: "INDIVIDUAL",
      quote: "I honestly feel safer knowing Selftrack is monitoring my vehicles."
    },
    {
      name: "Mandla Bangwa",
      type: "INDIVIDUAL",
      quote: "I have had only great service from Selftrack, from inception to recovery, the service is constantly great and on point. I recently got hijacked in Mamelodi and my vehicle was recovered within 30 minutes of reporting the incident."
    },
    {
      name: "Ryno Botha",
      type: "INDIVIDUAL",
      quote: "Excellent service and support from the entire Selftrack team! They are very efficient and always quick to respond to any queries or requests. Their professionalism and dedication make the whole experience seamless and stress-free. I am extremely satisfied with their service and will definitely recommend Selftrack to anyone looking for reliable tracking solutions."
    },
    {
      name: "Elrika Visser",
      type: "INDIVIDUAL",
      quote: "Baie dankie Selftrack vir die Hilux se eenheid. Julle instaleerder, Anthony, is baie aangenaam en professioneel."
    }
  ];

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  React.useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  React.useEffect(() => {
    if (maxIndex <= 0 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIndex, isHovered]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevTestimonial();
    if (e.key === 'ArrowRight') nextTestimonial();
  };

  return (
    <div className="bg-white font-sans text-[#555759] min-h-screen flex flex-col antialiased">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* SECTION 1: START WITH WHY */}
        <section className="relative bg-white min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-32 px-8">
          <div className="max-w-4xl mx-auto text-center z-10 w-full">
            <span className="inline-block text-[#9ACA3C] font-black tracking-widest text-sm mb-4 uppercase">Our Philosophy</span>
            <h1 className="text-5xl md:text-7xl font-black text-[#555759] leading-[1.1] tracking-tight mb-8">
              Start with <span className="text-[#9ACA3C]">WHY!</span>
            </h1>
            <p className="text-xl text-[#555759]/70 font-regular max-w-2xl mx-auto mb-10 leading-relaxed">
              At Selftrack we believe in an alternative perspective and like to start our business thinking with WHY, before we decide on HOW and WHAT to do! As explained by Simon Sinek, it provides clarity, discipline and consistency. Communication is not about speaking, it is about listening. We believe that this approach defines the core business of our business philosophy, namely, to serve our customers in the best way we possibly can.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <a href="#" className="inline-flex items-center gap-2 bg-[#9ACA3C] text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-[#496800] transition-all shadow-2xl shadow-[#9ACA3C]/20 text-center">
                <FileText size={20} />
                Selftrack Company Profile PDF
              </a>
            </div>
          </div>
          <div className="absolute -top-20 -right-20 w-[120%] h-[120%] bg-[#f3f3f6] rounded-full opacity-50 blur-3xl -z-10"></div>
        </section>

        {/* SECTION 2: VISION / MISSION / STRATEGIES / VALUES */}
        <section className="bg-[#f3f3f6] py-32 px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#edeef0] group hover:bg-[#9ACA3C] hover:border-[#9ACA3C] transition-all duration-300">
                <h2 className="text-2xl font-black mb-4 uppercase text-[#555759] group-hover:text-white">Vision</h2>
                <p className="text-[#555759]/70 group-hover:text-white/90 text-xl leading-relaxed font-regular">
                  Providing Self Managed Affordable Solutions using Reliable Technologies world-wide
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#edeef0] group hover:bg-[#9ACA3C] hover:border-[#9ACA3C] transition-all duration-300">
                <h2 className="text-2xl font-black mb-4 uppercase text-[#555759] group-hover:text-white">Mission</h2>
                <p className="text-[#555759]/70 group-hover:text-white/90 text-xl leading-relaxed font-regular">
                  To provide S-M-A-R-T Fleet Monitoring and Tracking Solutions to a wide range of Users across the globe
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#edeef0] group hover:bg-[#9ACA3C] hover:border-[#9ACA3C] transition-all duration-300">
                <h2 className="text-2xl font-black mb-4 uppercase text-[#555759] group-hover:text-white">Strategies</h2>
                <ul className="text-[#555759]/70 group-hover:text-white/90 text-lg space-y-3 list-none font-regular">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Business renewal</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Product & Technology</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Sales & Marketing</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Human Capital</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#edeef0] group hover:bg-[#9ACA3C] hover:border-[#9ACA3C] transition-all duration-300">
                <h2 className="text-2xl font-black mb-4 uppercase text-[#555759] group-hover:text-white">Values</h2>
                <ul className="text-[#555759]/70 group-hover:text-white/90 text-lg space-y-3 list-none font-regular">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Business Ethics</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Business Acumen</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Creativity</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9ACA3C] rounded-full group-hover:bg-white"></div> Collaboration</li>
                </ul>
              </div>
            </div>

            {/* IMAGE SLIDER (3 CARDS BELOW VALUES) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-zinc-100 shadow-sm border border-[#edeef0]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white relative z-10 group-hover:-translate-y-2 transition-transform duration-300 uppercase italic tracking-tighter">Using our abilities & talents</h3>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-zinc-100 shadow-sm border border-[#edeef0]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white relative z-10 group-hover:-translate-y-2 transition-transform duration-300 uppercase italic tracking-tighter">Independence / Our Values</h3>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-zinc-100 shadow-sm border border-[#edeef0]">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white relative z-10 group-hover:-translate-y-2 transition-transform duration-300 uppercase italic tracking-tighter">Business ethics / Team member</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMPANY OVERVIEW */}
        <section className="bg-white py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-5xl md:text-6xl font-black text-[#555759] mb-8 tracking-tight uppercase italic">About Selftrack</h2>
             <div className="w-24 h-2 bg-[#9ACA3C] mx-auto mb-10"></div>
             <p className="text-xl text-[#555759]/80 leading-relaxed font-regular">
               Selftrack was established in 2007 as a specialised fleet management and telematics solutions provider. It focuses on servicing SME, mid-corporate, and commercial markets internationally. While our fleet management services assist large fleet customers in operating more efficiently, our telematics products and related solutions are also available to private individuals, offering enhanced safety, security, and peace of mind.
             </p>
          </div>
        </section>

        {/* SECTION 4: UNIFIED TESTIMONIAL SLIDER */}
        <section 
          className="w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ACA3C] focus-visible:ring-inset py-32 bg-[#555759]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div className="max-w-[1440px] mx-auto px-8 relative">
            <div className="text-center mb-16">
              <p className="font-sans text-sm font-black uppercase tracking-widest text-[#9ACA3C] mb-4">Real stories from our valued community</p>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">Voices of Trust</h2>
              <div className="w-24 h-2 bg-[#9ACA3C] mx-auto mb-12"></div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-visible md:overflow-hidden" style={{ marginRight: '0' }}>
                <div
                  className="flex items-stretch transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{ transform: `translateX(calc(-${currentIndex} * ${100 / itemsPerPage}%))` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {testimonials.map((testimonial, idx) => (
                    <div 
                      key={idx}
                      className="flex-shrink-0"
                      style={{
                        flex: itemsPerPage === 3 ? '0 0 calc(33.3333% - 16px)' : itemsPerPage === 2 ? '0 0 calc(50% - 16px)' : '0 0 100%',
                        margin: itemsPerPage === 1 ? '0' : '0 8px'
                      }}
                    >
                      <div className="h-full bg-white border-2 border-transparent rounded-[24px] p-8 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-[#9ACA3C] shadow-sm">
                        <div className="w-[52px] h-[52px] rounded-full flex-shrink-0 flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, #9ACA3C, #7ca82b)', boxShadow: '0 4px 14px rgba(154,202,60,0.3)' }}>
                          <span className="text-white text-[26px] leading-[1] mt-1" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
                        </div>
                        
                        <div className="flex gap-[3px] justify-center mb-4">
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          ))}
                        </div>
                        
                        <p className="font-sans text-base font-regular italic text-[#555759]/80 leading-relaxed text-center flex-1 mb-0" style={testimonial.quote.length > 200 ? { display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}}>
                          {testimonial.quote}
                        </p>
                        
                        <div className="w-[40px] h-[2px] rounded-full mt-6 mb-6 bg-[#edeef0]"></div>
                        
                        <div className="w-[48px] h-[48px] rounded-full flex-shrink-0 flex items-center justify-center mb-4 border-2 border-[#9ACA3C]/20 bg-[#f3f3f6] text-[#555759]">
                          <span className="text-xl font-black">{testimonial.name[0]}</span>
                        </div>
                        
                        <h4 className="text-sm font-black uppercase text-[#555759] tracking-widest mb-1">{testimonial.name}</h4>
                        
                        {testimonial.company && (
                          <p className="font-sans text-[11px] font-bold text-[#555759]/60 tracking-[0.3px] mb-3">
                            {testimonial.company}
                          </p>
                        )}
                        
                        {testimonial.type !== 'INDIVIDUAL' && (
                          <div className="inline-flex items-center gap-[5px] border-[1.5px] border-[#9ACA3C] rounded-[20px] px-[12px] py-[4px] bg-[#9ACA3C]/10 mt-auto">
                            <div className="w-[14px] h-[14px] rounded-full bg-[#9ACA3C] flex flex-shrink-0 items-center justify-center">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="font-sans text-[9px] font-[800] uppercase tracking-[1px] text-[#7ca82b]">
                              {testimonial.type}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-14 xl:-left-16 z-10 hidden sm:block">
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:bg-[#9ACA3C] hover:border-[#9ACA3C] group"
                  aria-label="Previous testimonial"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555759" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-14 xl:-right-16 z-10 hidden sm:block">
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:bg-[#9ACA3C] hover:border-[#9ACA3C] group"
                  aria-label="Next testimonial"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555759" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-[7px] mt-[36px] flex-wrap relative z-10">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  autoFocus={false}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 border-none ${i === currentIndex ? 'w-[28px] rounded-[4px] bg-[#9ACA3C]' : 'w-2 bg-white/20 hover:bg-[#9ACA3C]/40'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
