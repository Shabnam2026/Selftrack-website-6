import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, ChevronUp, ChevronDown, PackageCheck, Lock } from 'lucide-react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { pricingData } from '../config/pricing';
import { motion, AnimatePresence } from 'motion/react';
import { selectPayTodayTotal, selectMonthlyDebitTotal } from '../utils/totalsSelectors';

export function CartSidebar() {
  const store = useCheckoutStore();
  const { currentStep, hardware, subscriptions, addOns, getAddOnCounts } = store;
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const addOnCounts = getAddOnCounts();

  const isComplete = currentStep === 7;

  const totalDevices = hardware.vehicle.quantity + hardware.motorbike.quantity + hardware.person.quantity;
  const configuredSubsCount = subscriptions.length;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // EXACT TOTALS CALCULATION
  let hardwareUpfrontTotal = 0;
  let addOnsOnceOff = 0;
  
  let monthlySubsTotal = 0;
  let monthlyAddOnsTotal = 0;

  // 1. Hardware sum (excluding 36M devices)
  const hardwareList: string[] = [];
  (['vehicle', 'motorbike', 'person'] as const).forEach(type => {
      const maxQty = hardware[type].quantity;
      if (maxQty > 0) {
         hardwareList.push(`${maxQty}× ${capitalize(type)} Tracker`);
         for (let i = 0; i < maxQty; i++) {
           const devSub = subscriptions.find(s => s.deviceType === type && s.deviceIndex === i);
           // If no sub yet, or sub is NOT 36M, count hardware prepay
           if (!devSub || !devSub.billingModel?.toLowerCase().includes('36')) {
             hardwareUpfrontTotal += pricingData.hardware[type];
           }
         }
      }
  });

  const hasPremium = subscriptions.some(s => s.deviceType === 'vehicle' && (s.plan === 'ADVANCED' || s.plan === 'PREMIUM'));

  // Add-ons counts
  const addOnsList: string[] = [];
  
  function getPanicButtonTotalQty(addOnsObj: any) {
    const pb = addOnsObj?.panicButton;
    if (typeof pb === 'object' && pb !== null) {
      return (pb.vehicle || 0) + (pb.person || 0);
    }
    return typeof pb === 'number' && !isNaN(pb) ? pb : 0;
  }
  const panicQty = getPanicButtonTotalQty(addOns);
  if (panicQty > 0) {
    const pbVehicle = (typeof addOns?.panicButton === 'object' && addOns.panicButton !== null) ? (addOns.panicButton.vehicle || 0) : (typeof addOns?.panicButton === 'number' && !isNaN(addOns.panicButton) ? addOns.panicButton : 0);
    const pbPerson = (typeof addOns?.panicButton === 'object' && addOns.panicButton !== null) ? (addOns.panicButton.person || 0) : 0;
    if (pbVehicle > 0 && pbPerson > 0) {
      addOnsList.push(`${panicQty}× Panic Button (${pbVehicle} vehicle + ${pbPerson} person)`);
    } else {
      addOnsList.push(`${panicQty}× Panic Button`);
    }
  }
  
  if (addOns.immobilizer > 0) {
     addOnsList.push(`${addOns.immobilizer}× Immobilizer`);
  }
  
  if (addOns.driverRecorder > 0) addOnsList.push(`${addOns.driverRecorder}× Dash Cam`);
  if (addOns.backupTracker > 0) addOnsList.push(`${addOns.backupTracker}× Backup Tracker`);
  if (addOns.extendedBattery > 0) addOnsList.push(`${addOns.extendedBattery}× Ext. Battery`);

  const onceOffTotal = selectPayTodayTotal(store);
  const recurringTotal = selectMonthlyDebitTotal(store);

  const cartItemsCount = totalDevices + addOnCounts.total;

  const { paymentSubStep } = useCheckoutStore();
  const hideTotals = currentStep <= 4;

  const isAnnual = subscriptions.length > 0 && subscriptions.every(s => s.billingModel?.toLowerCase() === 'annual');
  const finalOnceOffTotal = isAnnual ? onceOffTotal + recurringTotal * 12 : onceOffTotal;

  const renderContent = () => {
    if (isComplete) {
       return (
         <div className="flex flex-col items-center justify-center py-8 text-center h-full">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <PackageCheck size={32} />
            </div>
            <h4 className="font-bold text-lg text-neutral-800 mb-2">Order Complete</h4>
            <p className="text-sm text-neutral-500">Your secure checkout is finished.</p>
         </div>
       );
    }

    if (cartItemsCount === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center h-full text-neutral-400 font-medium">
          Cart is currently empty
        </div>
      );
    }

    return (
       <div className="h-full flex flex-col pt-1">
          <div className="space-y-3 text-sm flex-1">
              {hardwareList.length > 0 && (
                <div>
                   <div className="font-medium">Hardware Devices</div>
                   <div className="flex flex-col text-xs text-gray-500">
                     {hardwareList.map((item, idx) => <span key={idx}>{item}</span>)}
                   </div>
                </div>
              )}

              {addOnCounts.total > 0 && (
                 <div>
                   <div className="font-medium">Add-ons Selected</div>
                   <div className="flex flex-col text-xs text-gray-500">
                     {addOnsList.map((item, idx) => <span key={idx}>{item}</span>)}
                   </div>
                 </div>
              )}

              {currentStep > 1 && configuredSubsCount > 0 && (
                <div>
                  <div className="font-medium">Plans Configured</div>
                  <div className="text-xs text-gray-500">{configuredSubsCount} / {totalDevices}</div>
                </div>
              )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200">
             {hideTotals ? (
               <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                 <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                   <Lock size={14} className="text-emerald-500" />
                   Final pricing shown at checkout
                 </div>
               </div>
             ) : (
               <div className="space-y-4 pt-2">
                 <div className="flex justify-between text-sm mb-2">
                   <span>Pay Today</span>
                   <span className="font-semibold">R{finalOnceOffTotal.toLocaleString()}</span>
                 </div>
                 {!isAnnual && (
                   <div className="flex justify-between text-sm">
                     <span>Monthly</span>
                     <span className="font-semibold text-emerald-600">
                       R{recurringTotal.toLocaleString()}/mo
                     </span>
                   </div>
                 )}
               </div>
             )}
          </div>
       </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-40 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-neutral-200 p-6 overflow-hidden min-h-[300px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-semibold flex items-center gap-2">🛒 Your Selection</h3>
             {cartItemsCount > 0 && !isComplete && (
                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">
                  {cartItemsCount} items
                </span>
             )}
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Mobile Bottom Bar / Drawer */}
      <div className="block lg:hidden fixed bottom-[72px] sm:bottom-[76px] left-0 w-full z-40 px-4">
        <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-[0_-8px_30px_-4px_rgba(0,0,0,0.1)] border border-neutral-200 overflow-hidden mx-auto max-w-md transition-all divide-y divide-neutral-100">
          
          <button 
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="w-full px-4 py-3 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
          >
             <div className="flex items-center gap-2 font-bold text-neutral-800">
                <ShoppingBag size={18} className="text-emerald-600" /> 
                {isComplete ? 'Order Complete' : 'View Your Selection'}
                {!isComplete && cartItemsCount > 0 && (
                   <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ml-1">
                     {cartItemsCount}
                   </span>
                )}
             </div>
             {isOpenMobile ? <ChevronDown size={20} className="text-neutral-400" /> : <ChevronUp size={20} className="text-neutral-400" />}
          </button>

          <AnimatePresence>
            {isOpenMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-white"
              >
                 <div className="p-4 pt-4 pb-6 max-h-[40vh] overflow-y-auto">
                   {renderContent()}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

