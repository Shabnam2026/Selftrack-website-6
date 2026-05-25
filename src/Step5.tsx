import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Info, FileText } from 'lucide-react';
import { useCheckoutStore } from './store/useCheckoutStore';
import { pricingData } from './config/pricing';
import { ReviewInvoice } from './components/ReviewInvoice';
import { OrderTotals } from './components/OrderTotals';
import { CheckoutForm } from './components/CheckoutForm';

export default function Step5() {
  const store = useCheckoutStore();
  const subscriptions = store.subscriptions || [];
  const setStep = store.setStep;
  const nextStep = store.nextStep;
  const compliance = store.compliance;
  
  const [view, setView] = useState<'review' | 'checkout'>('review');
  const [showValidation, setShowValidation] = useState(false);

  React.useEffect(() => {
    console.log("[Step5] Mounted with:", {
      subscriptionsCount: subscriptions.length,
      has36M: subscriptions.some(s => s?.billingModel === '36M'),
    });
  }, [subscriptions]);
  
  const has36M = subscriptions.some(s => s?.billingModel === '36M');
  const all36M = subscriptions.every(s => s?.billingModel === '36M');
  const ficaConsent = store.compliance?.ficaConsent || false;
  const contractTermsAccepted = store.compliance?.contractTermsAccepted || false;
  const setCompliance = store.setCompliance;
  
  const canComplete = React.useMemo(() => {
    const defaultValid = compliance?.acknowledgeAccuracy && compliance?.agreeTerms;
    if (!defaultValid) return false;
    
    if (has36M) {
      if (!ficaConsent || !contractTermsAccepted) return false;
    }
    
    return true;
  }, [compliance, has36M, ficaConsent, contractTermsAccepted]);

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg">
        <p className="text-neutral-500 font-medium">No items in cart. Please go back to Step 1.</p>
        <button onClick={() => setStep(1)} className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-semibold cursor-pointer transition-colors block mx-auto">
          Return to Hardware
        </button>
      </div>
    );
  }

  const handleCompleteOrder = () => {
    if (has36M && (!ficaConsent || !contractTermsAccepted)) {
      setShowValidation(true);
      return;
    }
    if (!canComplete) return;
    nextStep();
  };

  const handleBackToEdit = () => {
     setStep(1);
  };

  const dueToday = store.getOnceOffTotal();

  function formatPrice(value: any) {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn('[Step5] Invalid price value detected:', value);
      return 'R0';
    }
    return `R${value.toLocaleString()}`;
  }

  return (
    <div className="flex flex-col h-full min-h-full pb-32">
      <AnimatePresence mode="wait">
        
        {view === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Review Your Order</h2>
              <p className="text-neutral-500">Please check all details before proceeding to checkout.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
               <div className="flex-1 w-full min-w-0">
                  <ReviewInvoice />
               </div>
               <div className="w-full lg:w-96 shrink-0">
                  <OrderTotals />
               </div>
            </div>
          </motion.div>
        )}

        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Checkout</h2>
              <p className="text-neutral-500">Complete your secure payment and confirm compliance.</p>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
               
               {/* RIGHT COLUMN - Payment & Compliance */}
               <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
                 
                 {has36M && (
                   <>
                     <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
                        <Info className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-amber-900 mb-1">Contract Application Pending</h4>
                           <p className="text-sm font-medium text-amber-800">
                             {formatPrice(dueToday)} will be processed today. 36-Month Contract items require application approval — a payment link will be emailed to you once approved.
                           </p>
                        </div>
                     </div>
                     
                     <section
                       aria-labelledby="compliance-heading"
                       className="rounded-2xl border border-gray-200 bg-white p-6"
                     >
                       <header className="flex items-center gap-2 mb-4">
                         <FileText className="w-5 h-5 text-emerald-600" />
                         <h3
                           id="compliance-heading"
                           className="text-lg font-semibold text-emerald-700"
                         >
                           Compliance &amp; Agreements
                         </h3>
                       </header>
                   
                       {showValidation && (!ficaConsent || !contractTermsAccepted) && (
                         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                           Please complete all required agreements below to continue.
                         </div>
                       )}

                       <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                         <input
                           type="checkbox"
                           checked={ficaConsent}
                           onChange={(e) => {
                             setCompliance('ficaConsent', e.target.checked);
                             if (e.target.checked && contractTermsAccepted) setShowValidation(false);
                           }}
                           className={[
                             'mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600',
                             'focus:ring-emerald-500 cursor-pointer',
                             showValidation && !ficaConsent ? 'ring-2 ring-red-400' : ''
                           ].join(' ')}
                           aria-invalid={showValidation && !ficaConsent}
                         />
                         <span className="text-sm text-gray-800 select-none">
                           I consent to FICA compliance verification checks
                         </span>
                       </label>
                   
                       <label className="flex items-start gap-3 cursor-pointer group">
                         <input
                           type="checkbox"
                           checked={contractTermsAccepted}
                           onChange={(e) => {
                             setCompliance('contractTermsAccepted', e.target.checked);
                             if (ficaConsent && e.target.checked) setShowValidation(false);
                           }}
                           className={[
                             'mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600',
                             'focus:ring-emerald-500 cursor-pointer',
                             showValidation && !contractTermsAccepted ? 'ring-2 ring-red-400' : ''
                           ].join(' ')}
                           aria-invalid={showValidation && !contractTermsAccepted}
                         />
                         <span className="text-sm text-gray-800 select-none">
                           I understand and agree to the terms of my 36-Month Contract
                         </span>
                       </label>
                     </section>
                   </>
                 )}

                 {!all36M && <CheckoutForm />}
               </div>

               {/* LEFT COLUMN - Compact Summary Sidebar */}
               <div className="w-full lg:w-[350px] shrink-0 order-last lg:order-none">
                  <div className="sticky top-24">
                     <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 px-1">Order Summary</p>
                     <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden text-sm">
                        <div className="max-h-[500px] overflow-y-auto overflow-x-hidden p-0 border-b border-neutral-200">
                           <div className="scale-95 origin-top min-w-[105%] -ml-[2.5%] pb-4">
                              <ReviewInvoice showContactDetails={false} />
                           </div>
                        </div>
                        <div className="bg-emerald-50 p-5 p-r-0">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-emerald-900 text-base">Due Today</span>
                              <span className="text-2xl font-bold text-emerald-600">{formatPrice(dueToday)}</span>
                           </div>
                           <p className="text-xs text-emerald-700/70 font-medium">Includes hardware, add-ons, and upfront subs</p>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* CUSTOM FOOTER FOR STEP 5 */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-neutral-200 z-50 p-4 sm:px-8 pb-safe">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           {view === 'review' ? (
              <>
                 <button 
                   onClick={handleBackToEdit}
                   className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-sm sm:text-base"
                 >
                   <ChevronLeft size={20} /> <span className="hidden sm:inline">Back to Edit</span><span className="sm:hidden">Edit</span>
                 </button>
                 
                 <button 
                   onClick={() => setView('checkout')}
                   className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-bold bg-emerald-500 text-white shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all cursor-pointer text-sm sm:text-base"
                 >
                   Proceed to Checkout <ChevronRight size={20} />
                 </button>
              </>
           ) : (
              <>
                 <button 
                   onClick={() => setView('review')}
                   className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer text-sm sm:text-base"
                 >
                   <ChevronLeft size={20} /> <span className="hidden sm:inline">Back to Review</span><span className="sm:hidden">Review</span>
                 </button>
                 
                 <button 
                   onClick={handleCompleteOrder}
                   className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-bold shadow-md transition-all ${
                     canComplete 
                       ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg cursor-pointer' 
                       : 'bg-neutral-200 text-neutral-400 shadow-none cursor-not-allowed'
                   } text-sm sm:text-base`}
                 >
                   <Check size={20} className={canComplete ? 'text-white' : 'text-neutral-400'} />
                   Complete Order
                 </button>
              </>
           )}
        </div>
      </div>
    </div>
  );
}
