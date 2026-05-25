import React from 'react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { pricingData } from '../config/pricing';
import { is36Month, selectPayTodayTotal, selectMonthlyDebitTotal, selectFirstMonthFreeAmount, selectTotalContractValue } from '../utils/totalsSelectors';

export function OrderTotals() {
  const store = useCheckoutStore();
  const { hardware, subscriptions, addOns, hasPremiumVehiclePlan } = store;
  
  const payToday = selectPayTodayTotal(store);
  const monthlyDebit = selectMonthlyDebitTotal(store);
  const firstMonthFree = selectFirstMonthFreeAmount(store);
  const totalContract = selectTotalContractValue(store);
  const is36M = is36Month(store);

  function formatPrice(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn('[OrderTotals] Invalid price value detected:', value);
      return 'R0';
    }
    return `R${value.toLocaleString()}`;
  }

  // --- Calculate non-36M breakdown components ---
  let hardwareOnceOff = 0;
  (['vehicle', 'motorbike', 'person'] as const).forEach(type => {
      const typeSubs = subscriptions.filter(s => s.deviceType === type && s.billingModel !== '36M');
      hardwareOnceOff += typeSubs.length * pricingData.hardware[type];
  });

  const pb = addOns?.panicButton;
  const pbVehicle = (typeof pb === 'object' && pb !== null) ? (pb.vehicle || 0) : (typeof pb === 'number' && !isNaN(pb) ? pb : 0);

  const addOnsOnceOff = 
    pbVehicle * pricingData.addOns.panicButton.onceOff +
    addOns.immobilizer * pricingData.addOns.immobilizer.onceOff +
    addOns.driverRecorder * pricingData.addOns.driverRecorder.onceOff +
    addOns.backupTracker * pricingData.addOns.backupTracker.onceOff +
    addOns.extendedBattery * pricingData.addOns.extendedBattery.onceOff;

  const totalOnceOff = is36M ? 0 : hardwareOnceOff + addOnsOnceOff;

  let backupTrackersToAllocate = addOns.backupTracker;
  let backupTrackerAnnualUpfront = 0;
  subscriptions.filter(s => s.deviceType === 'vehicle').forEach(s => {
    if (backupTrackersToAllocate > 0) {
      if (s.billingModel === 'annual') {
         backupTrackerAnnualUpfront += pricingData.subscriptions.backupTracker.annual * 12;
      }
      backupTrackersToAllocate--;
    }
  });

  let annualPrepayment = backupTrackerAnnualUpfront;
  subscriptions.filter(s => s.billingModel === 'annual').forEach(s => {
      annualPrepayment += ((pricingData.subscriptions[s.deviceType] as any)[s.plan].annual) * 12;
  });

  let firstMonthSub = 0;
  subscriptions.filter(s => s.billingModel === 'monthly').forEach(s => {
      firstMonthSub += ((pricingData.subscriptions[s.deviceType] as any)[s.plan].monthly);
  });

  return (
    <div className="bg-emerald-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-emerald-900/20 sticky top-24">
       <h3 className="text-xl font-bold mb-6 tracking-wide uppercase">Order Totals</h3>
       
       <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm font-medium text-emerald-100">
             <span>Once-off Total</span>
             <span className="text-white">{formatPrice(totalOnceOff)}</span>
          </div>
          
          {annualPrepayment > 0 && (
            <div className="flex justify-between items-center text-sm font-medium text-emerald-100">
               <span>Annual Prepayment</span>
               <span className="text-white">{formatPrice(annualPrepayment)}</span>
            </div>
          )}

          {firstMonthSub > 0 && (
            <div className="flex justify-between items-center text-sm font-medium text-emerald-100">
               <span>First Month Subscriptions</span>
               <span className="text-white">{formatPrice(firstMonthSub)}</span>
            </div>
          )}
       </div>

       <div className="pt-6 border-t border-emerald-700 mb-8">
          <div className="flex justify-between items-end mb-2">
             <span className="text-base font-bold uppercase tracking-widest text-emerald-300">Due Today</span>
             <span className="text-4xl font-bold tracking-tight">{formatPrice(payToday || 0)}</span>
          </div>
       </div>

       {monthlyDebit > 0 && (
         <div className="bg-emerald-900/50 rounded-xl p-4 border border-emerald-700/50">
            <div className="flex justify-between items-center mb-1">
               <span className="text-sm font-bold text-emerald-200 uppercase tracking-widest">Ongoing Monthly</span>
               <span className="text-lg font-bold text-white tracking-tight"> {formatPrice(monthlyDebit)}/mo</span>
            </div>
            <p className="text-xs text-emerald-400 font-medium">Starts after installation</p>
         </div>
       )}

       {is36M && (
          <div className="mt-4 bg-[#9ACA3C]/10 border border-[#9ACA3C]/20 p-4 rounded-xl text-emerald-100 text-sm font-medium">
             <div className="mb-2 pb-2 border-b border-[#9ACA3C]/20 flex justify-between">
                <span>Subtotal (36 months):</span>
                <span>{formatPrice((monthlyDebit || 0) * 36)}</span>
             </div>
             <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 my-3">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <span className="text-lg">🎁</span>
                     <span className="font-bold text-emerald-700">
                       First Month FREE
                     </span>
                   </div>
                   <span className="font-bold text-emerald-700 text-lg">
                     -{formatPrice(firstMonthFree || 0)}
                   </span>
                </div>
                <p className="text-xs text-emerald-600 mt-1 italic">
                   Applies once across your whole order
                </p>
             </div>
             <div className="pt-2 border-t border-[#9ACA3C]/20 flex justify-between font-bold text-white text-base">
                <span>Total Contract Value:</span>
                <span>{formatPrice(totalContract || 0)}</span>
             </div>
          </div>
       )}
    </div>
  );
}
