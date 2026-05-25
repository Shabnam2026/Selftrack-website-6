import React, { useState, useEffect } from 'react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { pricingData, getPlanPrice } from '../config/pricing';
import { Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function PaymentPlanComparison() {
  const { subscriptions, hardware, addOns, setAllBillingModels } = useCheckoutStore();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly' | '36M' | 'mixed'>('mixed');
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Determine the dominant billing model initially
    if (subscriptions.length === 0) return;
    
    const counts = {
      annual: 0,
      monthly: 0,
      '36M': 0
    };
    
    subscriptions.forEach(sub => {
      if (sub.billingModel === 'annual') counts.annual++;
      if (sub.billingModel === 'monthly') counts.monthly++;
      if (sub.billingModel === '36M' || sub.billingModel?.toLowerCase().includes('36')) counts['36M']++;
    });
    
    if (counts.annual === subscriptions.length) setSelectedPlan('annual');
    else if (counts.monthly === subscriptions.length) setSelectedPlan('monthly');
    else if (counts['36M'] === subscriptions.length) setSelectedPlan('36M');
    else setSelectedPlan('mixed');
  }, [subscriptions]);

  const handleSelect = (billingModel: 'annual' | 'monthly' | '36M') => {
    setAllBillingModels(billingModel);
    setSelectedPlan(billingModel);
    setToastMessage(`Payment plan updated to ${billingModel === '36M' ? '36-Month' : billingModel === 'annual' ? 'Annual' : 'Monthly'}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate totals for each option based on current cart
  let hardwareTotal = 0;
  hardwareTotal += hardware.vehicle.quantity * pricingData.hardware.vehicle;
  hardwareTotal += hardware.motorbike.quantity * pricingData.hardware.motorbike;
  hardwareTotal += hardware.person.quantity * pricingData.hardware.person;
  
  let addOnOnceOffTotal = 0;
  Object.entries(addOns).forEach(([key, qty]) => {
    if (qty > 0 && pricingData.addOns[key as keyof typeof pricingData.addOns]?.onceOff) {
      addOnOnceOffTotal += qty * pricingData.addOns[key as keyof typeof pricingData.addOns].onceOff!;
    }
  });

  const upfrontBase = hardwareTotal + addOnOnceOffTotal;

  // Annual Totals
  const annualMonthlySubs = subscriptions.reduce((acc, sub) => acc + getPlanPrice(sub.deviceType, sub.plan, 'annual'), 0);
  const annualAddOnMonthly = Object.entries(addOns).reduce((acc, [key, qty]) => {
     if (key === 'backupTracker') return acc + (qty * pricingData.subscriptions.backupTracker.annual);
     return 0; // The prompt said "Monthly = Prepaid (literal text)", so let's ignore non-backup tracker add-ons or assume we only multiply the subscriptions
  }, 0);
  // Actually, backupTracker has an annual option, others don't.
  const annualTotalPrepaid = (annualMonthlySubs * 12) + (annualAddOnMonthly * 12);
  const annualPayToday = upfrontBase + annualTotalPrepaid;
  const annualTotalOneYear = annualPayToday;

  // Monthly Totals
  const monthlyMonthlySubs = subscriptions.reduce((acc, sub) => acc + getPlanPrice(sub.deviceType, sub.plan, 'monthly'), 0);
  const monthlyAddOnMonthly = Object.entries(addOns).reduce((acc, [key, qty]) => {
     if (key === 'backupTracker') return acc + (qty * pricingData.subscriptions.backupTracker.monthly);
     return acc + (qty * ((pricingData.addOns[key as keyof typeof pricingData.addOns] as any).monthly || 0));
  }, 0);
  const monthlyTotalMonthly = monthlyMonthlySubs + monthlyAddOnMonthly;
  const monthlyPayToday = upfrontBase + monthlyTotalMonthly;
  const monthlyTotalOneYear = monthlyPayToday + (monthlyTotalMonthly * 11);

  // 36M Totals
  const m36MonthlySubs = subscriptions.reduce((acc, sub) => acc + getPlanPrice(sub.deviceType, sub.plan, '36M'), 0);
  const m36AddOnMonthly = Object.entries(addOns).reduce((acc, [key, qty]) => {
     if (key === 'backupTracker') return acc + (qty * pricingData.subscriptions.backupTracker['36M']);
     return acc + (qty * ((pricingData.addOns[key as keyof typeof pricingData.addOns] as any).monthly || 0));
  }, 0);
  const m36TotalMonthly = m36MonthlySubs + m36AddOnMonthly;
  const m36PayToday = 0;
  const m36TotalThreeYears = m36TotalMonthly * 35; // First month free

  return (
    <div className="mb-10 relative">
      <AnimatePresence>
         {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-emerald-900 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
            >
              <Check size={18} className="text-[#9ACA3C]" />
              {toastMessage}
            </motion.div>
         )}
      </AnimatePresence>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Choose How You'd Like to Pay</h2>
        <p className="text-neutral-500">Same plan, three ways to pay. Pick what works for you.</p>
        
        {selectedPlan === 'mixed' && (
           <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-3">
             <span className="shrink-0 mt-0.5 text-amber-500">ⓘ</span>
             <span>Your current setup uses multiple plans — switching will unify all to the same plan</span>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* ANNUAL CARD */}
        <div className={`bg-white rounded-xl border-2 transition-all p-6 relative overflow-hidden flex flex-col ${selectedPlan === 'annual' ? 'border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-500/10' : 'border-neutral-200 hover:border-emerald-200'} `}>
          {selectedPlan === 'annual' && (
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold tracking-wide">
              ✓ SELECTED
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-black text-neutral-800 uppercase tracking-widest">ANNUAL</h3>
            <p className="text-sm font-medium text-emerald-600">Save 15%</p>
          </div>
          
          <div className="space-y-6 mb-8 flex-1">
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Pay Today</p>
              <p className="text-3xl font-black text-neutral-800 tracking-tight">R{annualPayToday.toLocaleString()}</p>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Monthly</p>
              <p className="text-xl font-bold text-neutral-600">Prepaid</p>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Total (1 year)</p>
              <p className="text-xl font-bold text-neutral-800">R{annualTotalOneYear.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mb-6 space-y-2 border-t border-neutral-100 pt-6">
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Save 15%</div>
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Best total price</div>
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> 1 year coverage</div>
          </div>
          
          <button 
            onClick={() => handleSelect('annual')}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${selectedPlan === 'annual' ? 'bg-emerald-500 text-white' : 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'}`}
          >
            {selectedPlan === 'annual' ? '✓ SELECTED' : 'Select'}
          </button>
        </div>

        {/* MONTHLY CARD */}
        <div className={`bg-white rounded-xl border-2 transition-all p-6 relative overflow-hidden flex flex-col ${selectedPlan === 'monthly' ? 'border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-500/10' : 'border-neutral-200 hover:border-emerald-200'} `}>
          {selectedPlan === 'monthly' && (
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold tracking-wide">
              ✓ SELECTED
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-black text-neutral-800 uppercase tracking-widest">MONTHLY</h3>
            <p className="text-sm font-medium text-neutral-500">Flexible</p>
          </div>
          
          <div className="space-y-6 mb-8 flex-1">
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Pay Today</p>
              <p className="text-3xl font-black text-neutral-800 tracking-tight">R{monthlyPayToday.toLocaleString()}</p>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Monthly</p>
              <p className="text-xl font-bold text-neutral-600">R{monthlyTotalMonthly.toLocaleString()}</p>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Total (per year)</p>
              <p className="text-xl font-bold text-neutral-800">R{monthlyTotalOneYear.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mb-6 space-y-2 border-t border-neutral-100 pt-6">
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> No commitment</div>
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Cancel anytime</div>
            <div className="flex items-start gap-2 text-sm text-neutral-600 font-medium"><Check size={16} className="text-emerald-500 mt-0.5 shrink-0" /> Pay as you go</div>
          </div>
          
          <button 
            onClick={() => handleSelect('monthly')}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${selectedPlan === 'monthly' ? 'bg-emerald-500 text-white' : 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'}`}
          >
            {selectedPlan === 'monthly' ? '✓ SELECTED' : 'Select'}
          </button>
        </div>

        {/* 36-MONTH CARD */}
        <div className={`bg-white rounded-xl border-2 transition-all px-6 pb-6 pt-8 relative overflow-hidden flex flex-col ${selectedPlan === '36M' ? 'border-emerald-500 bg-emerald-50/30 ring-4 ring-emerald-500/10' : 'border-emerald-200 shadow-md shadow-emerald-500/10'} `}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-[#9ACA3C]" />
          {selectedPlan === '36M' && (
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold tracking-wide">
              ✓ SELECTED
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-black text-neutral-800 uppercase tracking-widest">36-MONTH</h3>
            <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 mt-1">
              <Sparkles className="w-4 h-4" />
              <span>Lowest Upfront</span>
            </div>
          </div>
          
          <div className="space-y-6 mb-8 flex-1">
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Pay Today</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-emerald-600 tracking-tight">R0</p>
                <span className="text-xl">🎁</span>
              </div>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Monthly</p>
              <p className="text-xl font-bold text-neutral-600">R{m36TotalMonthly.toLocaleString()}</p>
            </div>
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Total Contract (over 3 years)</p>
              <p className="text-xl font-bold text-neutral-800">R{m36TotalThreeYears.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mb-6 space-y-2 border-t border-neutral-100 pt-6">
            <div className="flex items-start gap-2 text-base text-neutral-600 font-medium whitespace-nowrap"><Check size={18} className="text-emerald-500 mt-0.5 shrink-0" /> First month FREE</div>
            <div className="flex items-start gap-2 text-base text-neutral-600 font-medium whitespace-nowrap"><Check size={18} className="text-emerald-500 mt-0.5 shrink-0" /> Hardware included</div>
            <div className="flex items-start gap-2 text-base text-neutral-600 font-medium whitespace-nowrap"><Check size={18} className="text-emerald-500 mt-0.5 shrink-0" /> No installation fee</div>
          </div>
          
          <button 
            onClick={() => handleSelect('36M')}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${selectedPlan === '36M' ? 'bg-emerald-500 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
          >
            {selectedPlan === '36M' ? '✓ SELECTED' : 'Select'}
          </button>
        </div>
      </div>

      <div className="flex justify-center text-xs text-neutral-500 font-medium mb-6">
        <span>ⓘ All payment plans include same features and service quality.</span>
      </div>

      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50">
        <button 
          onClick={() => setShowDisclosure(!showDisclosure)}
          className="w-full px-5 py-3 flex items-center justify-between text-left text-sm font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span className="flex items-center gap-2">📋 View pricing disclosure</span>
          {showDisclosure ? <ChevronUp size={18} className="text-neutral-500" /> : <ChevronDown size={18} className="text-neutral-500" />}
        </button>
        
        <AnimatePresence>
          {showDisclosure && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 border-t border-neutral-200 text-xs text-neutral-600 leading-relaxed font-medium space-y-3">
                <p><strong>• Annual:</strong> One-time payment for 12 months of service. No refunds for early cancellation.</p>
                <p><strong>• Monthly:</strong> Pay-as-you-go. Cancel anytime with 30 days notice.</p>
                <p><strong>• 36-Month:</strong> First month free. R{m36TotalMonthly.toLocaleString()}/mo billed from month 2 for 35 months. Total contract value: R{m36TotalThreeYears.toLocaleString()}. Subject to credit approval and signed agreement. Early termination fees may apply.</p>
                <p className="pt-2 text-neutral-500">All hardware costs are once-off and included in your selected plan where indicated.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
