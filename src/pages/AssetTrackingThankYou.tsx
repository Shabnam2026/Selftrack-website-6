import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Phone, CheckCircle, Car, Truck, Smartphone, Shield, ChevronDown } from 'lucide-react';
import { useLeadFunnelStore } from '../store/useLeadFunnelStore';

export default function AssetTrackingThankYou() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('leadId');
  const [leadData, setLeadData] = useState<any>(null);
  const { reset } = useLeadFunnelStore();

  useEffect(() => {
    console.log("[lead_funnel] thank_you_viewed", { leadId });
    if (leadId) {
      const stored = localStorage.getItem('selftrack_leads');
      if (stored) {
        const leads = JSON.parse(stored);
        const match = leads.find((l: any) => l.leadId === leadId);
        if (match) {
          setLeadData(match);
        }
      }
    }
  }, [leadId]);

  const handleRestart = () => {
    console.log("[lead_funnel] new_enquiry_started");
    reset();
    navigate('/asset-tracking/quote');
  };

  const handleCrossSell = (destination: string) => {
    console.log("[lead_funnel] cross_sell_clicked", { destination });
  };

  const isUrgent = leadData?.contactInfo?.urgency === 'Immediately';

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* SECTION 1: Success Header */}
          <section className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 max-w-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <Check className="w-10 h-10 text-emerald-600 relative z-10" strokeWidth={3} />
            </motion.div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black text-neutral-800 tracking-tight">
                {leadData ? "Thank You — We've Got Your Enquiry" : "Thanks for your interest!"}
              </h1>
              {leadId && leadData && (
                <p className="text-lg text-neutral-500 font-bold">
                  Your reference: {leadId}
                </p>
              )}
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-medium leading-relaxed">
                {leadData ? "Our asset tracking specialist will review your requirements and contact you within 48 hours with a personalised solution." : "If you've submitted an enquiry, we'll be in touch within 48 hours."}
              </p>
            </div>
          </section>

          {/* SECTION 4: Urgent Box (Conditional) */}
          {isUrgent && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="text-4xl">⚡</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-black text-amber-900 mb-2">Need Help Sooner?</h3>
                  <p className="text-amber-800 mb-4">You indicated you need a solution immediately. Call our sales team directly:</p>
                  <p className="text-2xl font-black text-amber-900 flex items-center justify-center sm:justify-start gap-3">
                    <Phone className="w-6 h-6" /> +27 71 604 6133
                  </p>
                  <p className="text-sm text-amber-700 mt-2 font-medium">(Mon–Fri, 8am–5pm SAST)</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* SECTION 2: Enquiry Summary */}
          {leadData && (
            <section className="bg-white rounded-3xl border border-neutral-200 shadow-md p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-100">
                <span className="text-2xl">📋</span>
                <h2 className="text-2xl font-black text-neutral-800">Your Enquiry Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-black text-emerald-600 mb-4">Asset Requirements</h3>
                  <div className="grid grid-cols-[110px_1fr] gap-2 text-sm">
                    <span className="text-neutral-500 font-medium">Asset Type(s):</span>
                    <span className="font-bold text-neutral-800 capitalize">{leadData.assetTypes.join(', ')} {leadData.customAssetDescription ? `(${leadData.customAssetDescription})` : ''}</span>
                    
                    <span className="text-neutral-500 font-medium">Quantity:</span>
                    <span className="font-bold text-neutral-800">{leadData.assetDetails.quantity}</span>
                    
                    <span className="text-neutral-500 font-medium">Use Type:</span>
                    <span className="font-bold text-neutral-800">{leadData.assetDetails.useType}</span>
                    
                    <span className="text-neutral-500 font-medium">Approx. Value:</span>
                    <span className="font-bold text-neutral-800">{leadData.assetDetails.approximateValue}</span>
                    
                    <span className="text-neutral-500 font-medium">Location:</span>
                    <span className="font-bold text-neutral-800">{leadData.assetDetails.mainLocation}</span>
                    
                    <span className="text-neutral-500 font-medium">Urgency:</span>
                    <span className="font-bold text-neutral-800">{leadData.contactInfo.urgency}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs uppercase tracking-widest font-black text-emerald-600 mb-4">Contact Detail</h3>
                   <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                    <span className="text-neutral-500 font-medium">Name:</span>
                    <span className="font-bold text-neutral-800">{leadData.contactInfo.name}</span>
                    
                    {leadData.contactInfo.companyName && (
                      <>
                        <span className="text-neutral-500 font-medium">Company:</span>
                        <span className="font-bold text-neutral-800">{leadData.contactInfo.companyName}</span>
                      </>
                    )}
                    
                    <span className="text-neutral-500 font-medium">Phone:</span>
                    <span className="font-bold text-neutral-800">+27 {leadData.contactInfo.phone}</span>
                    
                    <span className="text-neutral-500 font-medium">Email:</span>
                    <span className="font-bold text-neutral-800">{leadData.contactInfo.email}</span>
                    
                    <span className="text-neutral-500 font-medium">Preferred:</span>
                    <span className="font-bold text-neutral-800">{leadData.contactInfo.preferredContact}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 3: Timeline */}
          <section className="py-8">
             <h2 className="text-2xl font-black text-center text-neutral-800 mb-12">What Happens Next</h2>
             <div className="relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-neutral-100 -z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                   {/* Stage 1 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.15 }}
                     className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-lg shadow-neutral-200/50 flex flex-col items-center text-center relative overflow-hidden"
                   >
                     <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                        <Mail className="w-8 h-8 text-emerald-500" />
                     </div>
                     <h3 className="text-lg font-black text-neutral-800 mb-3">Confirmation Email Sent</h3>
                     <p className="text-sm text-neutral-500 font-medium mb-6">Check your inbox for confirmation. If you don't see it, please check your spam folder.</p>
                     
                     {/* simulated email */}
                     {leadData && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 1.5, duration: 0.5 }}
                         className="w-full bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-left relative"
                       >
                          <div className="text-[10px] text-neutral-400 font-medium mb-2 border-b border-neutral-200 pb-2 space-y-1">
                            <div><span className="text-neutral-500">From:</span> hello@selftrack.co.za</div>
                            <div><span className="text-neutral-500">To:</span> {leadData.contactInfo.email}</div>
                            <div className="font-bold text-neutral-600 truncate">Subject: Your Asset Tracking Enquiry ({leadId})</div>
                          </div>
                          <p className="text-[11px] text-neutral-600 font-medium">Hi {leadData.contactInfo.name.split(' ')[0]},<br/>We received your enquiry...</p>
                       </motion.div>
                     )}
                   </motion.div>

                   {/* Stage 2 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-lg shadow-neutral-200/50 flex flex-col items-center text-center"
                   >
                     <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                        <Phone className="w-8 h-8 text-emerald-500" />
                     </div>
                     <h3 className="text-lg font-black text-neutral-800 mb-3">Our Specialist Contacts You</h3>
                     <p className="text-sm text-neutral-500 font-medium">
                        Our asset tracking expert will reach out via your preferred method ({leadData ? leadData.contactInfo.preferredContact.toLowerCase() : 'phone or email'}) with a personalised recommendation.
                     </p>
                   </motion.div>

                   {/* Stage 3 */}
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.45 }}
                     className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-lg shadow-neutral-200/50 flex flex-col items-center text-center"
                   >
                     <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                     </div>
                     <h3 className="text-lg font-black text-neutral-800 mb-3">We Find Your Perfect Solution</h3>
                     <p className="text-sm text-neutral-500 font-medium">
                        Together we'll choose the right tracker, plan, and installation option for your needs.
                     </p>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* SECTION 5: Cross Promotion */}
          <section className="bg-neutral-50 -mx-6 px-6 py-16 border-y border-neutral-200">
             <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-black text-neutral-800 mb-2">While You Wait — Explore More</h2>
                  <p className="text-neutral-500 font-medium">See how Selftrack protects assets across South Africa.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <Link to="/vehicle-tracking" onClick={() => handleCrossSell('vehicle-tracking')} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                        <Car className="w-6 h-6 text-neutral-600 group-hover:text-emerald-600" />
                     </div>
                     <h3 className="font-black text-neutral-800 mb-2">Vehicle Tracking</h3>
                     <p className="text-sm text-neutral-500 mb-4 font-medium">Protect your vehicles from theft</p>
                     <span className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn <span aria-hidden="true">&rarr;</span></span>
                   </Link>

                   <Link to="/fleet-tracking" onClick={() => handleCrossSell('fleet-tracking')} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                        <Truck className="w-6 h-6 text-neutral-600 group-hover:text-emerald-600" />
                     </div>
                     <h3 className="font-black text-neutral-800 mb-2">Fleet Tracking</h3>
                     <p className="text-sm text-neutral-500 mb-4 font-medium">Manage your entire fleet in one place</p>
                     <span className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn <span aria-hidden="true">&rarr;</span></span>
                   </Link>

                   <Link to="#" onClick={() => handleCrossSell('mobile-app')} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                        <Smartphone className="w-6 h-6 text-neutral-600 group-hover:text-emerald-600" />
                     </div>
                     <h3 className="font-black text-neutral-800 mb-2">Mobile App</h3>
                     <p className="text-sm text-neutral-500 mb-4 font-medium">Track from anywhere</p>
                     <span className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn <span aria-hidden="true">&rarr;</span></span>
                   </Link>

                   <Link to="#" onClick={() => handleCrossSell('recovery')} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-50 transition-colors">
                        <Shield className="w-6 h-6 text-neutral-600 group-hover:text-emerald-600" />
                     </div>
                     <h3 className="font-black text-neutral-800 mb-2">Recovery Services</h3>
                     <p className="text-sm text-neutral-500 mb-4 font-medium">24/7 stolen asset recovery</p>
                     <span className="text-emerald-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Learn <span aria-hidden="true">&rarr;</span></span>
                   </Link>
                </div>
             </div>
          </section>

          {/* SECTION 6: FAQ Teaser */}
          <section className="py-8">
             <h2 className="text-2xl font-black text-center text-neutral-800 mb-10">Common Questions</h2>
             <div className="max-w-2xl mx-auto space-y-4">
                <FAQItem 
                  question="How quickly will I be contacted?" 
                  answer="Our specialist will reach out within 48 hours via your preferred contact method." 
                  isOpenDefault={true}
                />
                <FAQItem 
                  question="Will I receive a quote or proposal?" 
                  answer="Yes. After understanding your specific needs, we'll send you a detailed proposal with pricing tailored to your assets." 
                />
                <FAQItem 
                  question="Is installation included?" 
                  answer="Installation options vary by asset type. Your specialist will discuss the best approach for your situation." 
                />
                <FAQItem 
                  question="Can I cancel or change my mind?" 
                  answer="Absolutely. There's no obligation to proceed after receiving your quote. We respect your decision." 
                />
             </div>
          </section>

          {/* SECTION 7: Bottom Actions */}
          <section className="pt-8 border-t border-neutral-200 relative z-50">
            <div className="flex flex-col items-center gap-4 mt-12 mb-8 relative z-50 pointer-events-auto isolate">
              <Link
                to="/asset-tracking/quote"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("[ThankYou] Submit Another Enquiry clicked");
                  handleRestart();
                }}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl uppercase tracking-widest text-sm transition-colors shadow-md hover:shadow-lg text-center cursor-pointer"
              >
                {leadData ? "Submit Another Enquiry →" : "Submit a new enquiry →"}
              </Link>
              
              <Link
                to="/asset"
                onClick={() => console.log("[ThankYou] Back to Asset Tracking clicked")}
                className="w-full sm:w-auto text-gray-600 font-bold hover:text-emerald-600 underline transition-colors text-center cursor-pointer"
              >
                Back to Asset Tracking
              </Link>
            </div>
             
             {leadData && (
                <p className="text-center text-xs text-neutral-400 font-medium">
                  Order placed on {new Date(leadData.submittedAt).toLocaleDateString()} · Reference: {leadId}
                </p>
             )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer, isOpenDefault = false }: { question: string, answer: string, isOpenDefault?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-bold text-neutral-800">{question}</span>
        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden"
           >
              <div className="px-6 pb-5 text-neutral-600 font-medium text-sm leading-relaxed">
                 {answer}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
