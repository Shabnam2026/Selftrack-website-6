import React, { useState, useEffect, useMemo } from 'react';
import { useCheckoutStore, Subscription } from './store/useCheckoutStore';
import { pricingData } from './config/pricing';
import { ApplicationRequiredCard } from './components/ApplicationRequiredCard';
import { PaymentSummaryCard } from './components/PaymentSummaryCard';
import BillingSelector from './components/BillingSelector';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { PaymentPlanComparison } from './components/PaymentPlanComparison';
import { computeAddOnAllocation } from './utils/addOnAllocation';

export default function Step4() {
  const { hardware, subscriptions, setSubscriptions, addOns, setCurrentDeviceIdx, setStep, lead } = useCheckoutStore();
  const setBillingForAllSubscriptions = useCheckoutStore(s => s.setBillingForAllSubscriptions);
  const isBillingSet = useCheckoutStore(s => s.isBillingSet());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const firstSubscription = subscriptions?.[0];
  const selectedBilling = firstSubscription?.billingModel || null;

  const isMultiDevice = (subscriptions?.length || 0) > 1;

  const addOnAllocation = useMemo(() => {
    return computeAddOnAllocation(subscriptions, addOns);
  }, [subscriptions, addOns]);

  const multiDeviceTotals = useMemo(() => {
    if (!isMultiDevice || !subscriptions?.length) return null;
    
    const totals = { Annual: 0, Monthly: 0, "36M": 0 };
    
    subscriptions.forEach(sub => {
      if (!sub?.plan || !sub?.deviceType) return;
      
      const plans = pricingData.subscriptions[sub.deviceType] as any;
      const plan = plans?.[sub.plan];
      if (!plan) return;
      
      totals.Annual += plan.annual || 0;
      totals.Monthly += plan.monthly || 0;
      totals["36M"] += plan["36M"] || 0;
    });
    
    return totals;
  }, [subscriptions, isMultiDevice]);

  const planPricesForSelector = useMemo(() => {
    if (isMultiDevice || !firstSubscription) return null;
    const plans = pricingData.subscriptions[firstSubscription.deviceType] as any;
    if (!plans) return null;
    const plan = plans[firstSubscription.plan];
    return plan || null;
  }, [firstSubscription, isMultiDevice]);

  useEffect(() => {
    console.log("[Step4] Mounted/billing changed:", {
      selectedBilling,
      isBillingSet,
      subscriptionsCount: subscriptions?.length || 0,
      isMultiDevice,
      multiDeviceTotals,
      planPricesForSelector,
    });
  }, [selectedBilling, isBillingSet, subscriptions?.length, isMultiDevice, multiDeviceTotals, planPricesForSelector]);

  useEffect(() => {
    const validSubs = subscriptions.filter(sub => {
      const hwQty = hardware[sub.deviceType as 'vehicle'|'motorbike'|'person']?.quantity || 0;
      return sub.deviceIndex < hwQty;
    });
    
    if (validSubs.length !== subscriptions.length) {
      console.warn("[Step4] Cleaning orphaned subscriptions");
      setSubscriptions(validSubs);
    }
  }, []);

  const handleBillingSelect = (billingModel: string) => {
    setBillingForAllSubscriptions(billingModel);
  };

  const totalDevices = subscriptions.length;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const getDeviceLabel = (sub: Subscription) => {
    return `${capitalize(sub.deviceType)} ${sub.deviceIndex + 1}`;
  };

  const getFlatIndex = (sub: Subscription) => {
     let offset = 0;
     if (sub.deviceType === 'vehicle') return sub.deviceIndex;
     offset += hardware.vehicle.quantity;
     if (sub.deviceType === 'motorbike') return offset + sub.deviceIndex;
     offset += hardware.motorbike.quantity;
     return offset + sub.deviceIndex;
  };

  const handleEditDevice = (sub: Subscription) => {
      setCurrentDeviceIdx(getFlatIndex(sub));
      setStep(2);
  };

  const has36MContract = subscriptions.some(s => 
    s.billingModel === '36M' || 
    s.billingModel === '36m' || 
    s.billingModel?.toLowerCase().includes('36')
  );

  const items36M = subscriptions.filter(s => 
    s.billingModel?.toLowerCase().includes('36')
  );

  // 1. UPFRONT: Hardware
  const hardwareLines: { label: string; price: number }[] = [];
  (['vehicle', 'motorbike', 'person'] as const).forEach(type => {
    const maxQty = hardware[type].quantity;
    if (maxQty > 0) {
       for (let i = 0; i < maxQty; i++) {
         const devSub = subscriptions.find(s => s.deviceType === type && s.deviceIndex === i);
         if (!devSub || !devSub.billingModel?.toLowerCase().includes('36')) {
           hardwareLines.push({
             label: `1× ${capitalize(type)} Tracker`,
             price: pricingData.hardware[type]
           });
         }
       }
    }
  });

  const groupedHardware: Record<string, { label: string; price: number, qty: number }> = {};
  hardwareLines.forEach(l => {
    if (!groupedHardware[l.label]) groupedHardware[l.label] = { label: l.label, price: l.price, qty: 0 };
    groupedHardware[l.label].qty++;
  });
  const upfHardwareFinal = Object.values(groupedHardware).map(g => ({
    label: `${g.qty}× ${g.label.replace('1× ', '')}`,
    price: g.price * g.qty
  }));
  const totalHardware = upfHardwareFinal.reduce((a, c) => a + c.price, 0);

  // 2. UPFRONT: Add-ons
  const addOnsOnceOffLines: { label: string; price: number }[] = [];
  
  // Panic Button hardware — per device (vehicle/motorbike)
  addOnAllocation.panicButtonVehicle.forEach((item: any) => {
    const context = item.deviceType ? ` (${item.deviceType})` : ``;
    addOnsOnceOffLines.push({
      label: `1× Panic Button${context}`,
      price: pricingData.addOns.panicButton.onceOff
    });
  });

  // Panic Button hardware — per device (person)
  addOnAllocation.panicButtonPerson.forEach((item: any) => {
    const context = item.deviceType ? ` (${item.deviceType})` : ``;
    addOnsOnceOffLines.push({
      label: `1× Panic Button${context}${!item.hardware ? ' (built-in)' : ''}`,
      price: item.hardware
    });
  });

  // Immobilizer hardware — per device
  addOnAllocation.immobilizer.forEach((item) => {
    const context = item.deviceType ? ` (${item.deviceType})` : ``;
    addOnsOnceOffLines.push({
      label: `1× Remote Immobilizer${context}`,
      price: pricingData.addOns.immobilizer.onceOff
    });
  });
  
  if (addOns.driverRecorder > 0) addOnsOnceOffLines.push({ label: `${addOns.driverRecorder}× Driver Behavior Recorder`, price: addOns.driverRecorder * pricingData.addOns.driverRecorder.onceOff });
  if (addOns.backupTracker > 0) addOnsOnceOffLines.push({ label: `${addOns.backupTracker}× Wireless Backup Tracker`, price: addOns.backupTracker * pricingData.addOns.backupTracker.onceOff });
  if (addOns.extendedBattery > 0) addOnsOnceOffLines.push({ label: `${addOns.extendedBattery}× Extended Battery Life`, price: addOns.extendedBattery * pricingData.addOns.extendedBattery.onceOff });
  const totalAddOnsOnceOff = addOnsOnceOffLines.reduce((a, c) => a + c.price, 0);

  // 3. UPFRONT: Annual Subs
  const annualSubsLines = subscriptions.filter(s => s.billingModel === 'annual' || s.billingModel === 'Annual').map(s => {
    const planPrices = (pricingData.subscriptions[s.deviceType] as any)[s.plan];
    return {
      label: `${getDeviceLabel(s)} — ${s.plan} Annual`,
      price: planPrices.annual * 12,
      onEdit: () => handleEditDevice(s)
    };
  });
  
  let backupTrackersToAllocate = addOns.backupTracker;
  let backupTrackerAnnualTotal = 0;
  let backupTrackerMonthlyTotal = 0;
  let backupTracker36MTotal = 0;
  
  subscriptions.filter(s => s.deviceType === 'vehicle').forEach(s => {
    if (backupTrackersToAllocate > 0) {
      if (s.billingModel === 'annual' || s.billingModel === 'Annual') {
         backupTrackerAnnualTotal += pricingData.subscriptions.backupTracker.annual * 12;
      } else if (s.billingModel === '36M' || s.billingModel?.toLowerCase().includes('36')) {
         backupTracker36MTotal += pricingData.subscriptions.backupTracker['36M'];
      } else {
         backupTrackerMonthlyTotal += pricingData.subscriptions.backupTracker.monthly;
      }
      backupTrackersToAllocate--;
    }
  });
  
  if (backupTrackersToAllocate > 0) {
    backupTrackerMonthlyTotal += backupTrackersToAllocate * pricingData.subscriptions.backupTracker.monthly;
  }
  
  if (backupTrackerAnnualTotal > 0) {
     annualSubsLines.push({
       label: `${addOns.backupTracker - (backupTrackerMonthlyTotal / pricingData.subscriptions.backupTracker.monthly) - (backupTracker36MTotal / pricingData.subscriptions.backupTracker['36M'])}× Backup Tracker Annual`,
       price: backupTrackerAnnualTotal,
       onEdit: () => {}
     });
  }
  
  const totalAnnualSubs = annualSubsLines.reduce((acc, curr) => acc + curr.price, 0);

  // 4. UPFRONT: First Month Subs
  const firstMonthSubsLines = subscriptions.filter(s => s.billingModel === 'monthly' || s.billingModel === 'Monthly').map(s => {
    const planPrices = (pricingData.subscriptions[s.deviceType] as any)[s.plan];
    return {
      label: `${getDeviceLabel(s)} — ${s.plan} Monthly`,
      price: planPrices.monthly,
      onEdit: () => handleEditDevice(s)
    };
  });
  const totalFirstMonthSubs = firstMonthSubsLines.reduce((acc, curr) => acc + curr.price, 0);

  const totalDueToday = totalHardware + totalAddOnsOnceOff + totalAnnualSubs + totalFirstMonthSubs;

  // 5. MONTHLY: Subs
  const monthlySubsLines = subscriptions.filter(s => s.billingModel === 'monthly' || s.billingModel === 'Monthly' || s.billingModel?.toLowerCase().includes('36')).map(s => {
    const planPrices = (pricingData.subscriptions[s.deviceType] as any)[s.plan];
    const is36M = s.billingModel?.toLowerCase().includes('36');
    const priceKey = is36M ? '36M' : 'monthly';
    const price = planPrices[priceKey];
    return {
      label: `${getDeviceLabel(s)} — ${s.plan} ${is36M ? '(36M)' : 'Monthly'}`,
      price,
      onEdit: () => handleEditDevice(s),
      ...(is36M ? {
        subtext: `🎁 First month FREE — billed from month 2\n35 months × R${price} = R${(price * 35).toLocaleString()} total`
      } : {})
    };
  });
  const totalMonthlySubs = monthlySubsLines.reduce((acc, curr) => acc + curr.price, 0);

  // 6. MONTHLY: Add-ons
  const addOnsMonthlyLines: { label: React.ReactNode; price: number; subtext?: React.ReactNode }[] = [];
  
  // Panic Button monthly — per device with FREE/PAID (Vehicle)
  addOnAllocation.panicButtonVehicle.forEach((item: any) => {
    const context = (item.deviceType && item.plan) ? ` (${item.deviceType}, ${item.plan})` : ``;
    addOnsMonthlyLines.push({
      label: (
        <span className="flex items-center gap-2">
          1× Panic Button{context}
          {item.isFree && (
             <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium leading-none">
               FREE
             </span>
          )}
        </span>
      ),
      price: item.monthly,
    });
  });

  // Panic Button monthly — per device with FREE/PAID (Person)
  addOnAllocation.panicButtonPerson.forEach((item: any) => {
    const context = (item.deviceType && item.plan) ? ` (${item.deviceType}, ${item.plan})` : ``;
    addOnsMonthlyLines.push({
      label: (
        <span className="flex items-center gap-2">
          1× Panic Button{context}
          {item.isFree && (
             <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium leading-none">
               FREE
             </span>
          )}
        </span>
      ),
      price: item.monthly,
    });
  });

  // Immobilizer monthly — per device with FREE/PAID
  addOnAllocation.immobilizer.forEach((item) => {
    const context = (item.deviceType && item.plan) ? ` (${item.deviceType}, ${item.plan})` : ``;
    addOnsMonthlyLines.push({
      label: (
        <span className="flex items-center gap-2">
          1× Remote Immobilizer{context}
          {item.isFree && (
             <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium leading-none">
               FREE
             </span>
          )}
        </span>
      ),
      price: item.monthly,
    });
  });

  if (addOns.driverRecorder > 0 && pricingData.addOns.driverRecorder.monthly > 0) addOnsMonthlyLines.push({ label: `${addOns.driverRecorder}× Driver Behavior Recorder`, price: addOns.driverRecorder * pricingData.addOns.driverRecorder.monthly });
  
  if (backupTrackerMonthlyTotal > 0 || backupTracker36MTotal > 0) {
     const qtyMonthly = backupTrackerMonthlyTotal / pricingData.subscriptions.backupTracker.monthly;
     const qty36M = backupTracker36MTotal / pricingData.subscriptions.backupTracker['36M'];
     
     if (qtyMonthly > 0) addOnsMonthlyLines.push({ label: `${qtyMonthly}× Wireless Backup Tracker (Monthly)`, price: backupTrackerMonthlyTotal });
     if (qty36M > 0) addOnsMonthlyLines.push({ label: `${qty36M}× Wireless Backup Tracker (36M)`, price: backupTracker36MTotal });
  }

  if (addOns.extendedBattery > 0 && pricingData.addOns.extendedBattery.monthly > 0) addOnsMonthlyLines.push({ label: `${addOns.extendedBattery}× Extended Battery Life`, price: addOns.extendedBattery * pricingData.addOns.extendedBattery.monthly });

  const totalAddOnsMonthly = addOnsMonthlyLines.reduce((a, c) => a + c.price, 0);

  const totalMonthlyDebit = totalMonthlySubs + totalAddOnsMonthly;

  const contractLines = items36M.map(s => {
     return { label: `${getDeviceLabel(s)} — ${s.plan} Plan`, sub: s };
  });

  const isAnnual = selectedBilling === 'annual' || selectedBilling === 'Annual';

  const annualizedAddOnsTotal = useMemo(() => {
    return (totalAddOnsMonthly || 0) * 12;
  }, [totalAddOnsMonthly]);

  const finalTotalDueToday = useMemo(() => {
    const base = (totalHardware || 0) + (totalAddOnsOnceOff || 0) + (totalAnnualSubs || 0) + (totalFirstMonthSubs || 0);
    if (isAnnual) {
      return base + (annualizedAddOnsTotal || 0);
    }
    return base;
  }, [totalHardware, totalAddOnsOnceOff, totalAnnualSubs, totalFirstMonthSubs, isAnnual, annualizedAddOnsTotal]);

  const addOnsAnnualLines = isAnnual ? addOnsMonthlyLines.map(l => ({
    label: (
      <span className="flex items-center justify-between w-full">
        <span>{l.label} — annual</span>
      </span>
    ),
    price: (l.price || 0) * 12
  })) : [];

  const addOnHardwareItems = useMemo(() => {
    const items = [];
    const panicVehicle = addOns?.panicButton?.vehicle || 0;
    const panicPerson  = addOns?.panicButton?.person || 0;
    
    const immobilizerRaw: any = addOns?.immobilizer;
    const immobilizerVehicle = typeof immobilizerRaw === 'object' && immobilizerRaw !== null
      ? (immobilizerRaw.vehicle || 0)
      : (typeof immobilizerRaw === 'number' ? immobilizerRaw : 0);
    const immobilizerMotorbike = typeof immobilizerRaw === 'object' && immobilizerRaw !== null
      ? (immobilizerRaw.motorbike || 0)
      : 0;
    
    const backupTracker = addOns?.backupTracker || 0;
    
    if (panicVehicle > 0) items.push({
      name: `Panic Button (vehicle)`,
      quantity: panicVehicle,
      unitPrice: pricingData.addOns.panicButton.onceOff,
    });
    if (panicPerson > 0) items.push({
      name: `Panic Button (person)`,
      quantity: panicPerson,
      unitPrice: 0,
    });
    if (immobilizerVehicle > 0) items.push({
      name: `Remote Immobilizer (vehicle)`,
      quantity: immobilizerVehicle,
      unitPrice: pricingData.addOns.immobilizer.onceOff,
    });
    if (immobilizerMotorbike > 0) items.push({
      name: `Remote Immobilizer (motorbike)`,
      quantity: immobilizerMotorbike,
      unitPrice: pricingData.addOns.immobilizer.onceOff,
    });
    if (backupTracker > 0) items.push({
      name: `Wireless Backup Tracker`,
      quantity: backupTracker,
      unitPrice: pricingData.addOns.backupTracker.onceOff,
    });
    
    return items;
  }, [addOns]);

  const finalUpfrontSections = [
    { title: 'Hardware (Once-off)', lines: upfHardwareFinal },
    { title: 'Add-ons (Once-off)', lines: addOnsOnceOffLines },
    { title: 'Annual Subscriptions (Prepaid 12 Months)', lines: annualSubsLines },
    ...(isAnnual && annualizedAddOnsTotal > 0 ? [{ title: 'Annual Add-ons (Prepaid 12 Months)', lines: addOnsAnnualLines }] : []),
    { title: 'First Month Subscriptions', lines: firstMonthSubsLines }
  ];

  const finalMonthlySections = isAnnual ? [] : [
    { title: 'Monthly Subscriptions', lines: monthlySubsLines },
    { title: 'Monthly Add-ons', lines: addOnsMonthlyLines }
  ];

  const hypotheticalMonthlyUpfront = (['vehicle', 'motorbike', 'person'] as const).reduce((sum, type) => sum + (hardware[type].quantity * pricingData.hardware[type]), 0) 
    + totalAddOnsOnceOff 
    + subscriptions.reduce((sum, s) => sum + ((pricingData.subscriptions[s.deviceType] as any)?.[s.plan]?.monthly || 0), 0);

  return (
    <div className="flex flex-col gap-8 pb-32 relative">
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

      <BillingSelector
        selectedBilling={selectedBilling}
        onSelect={handleBillingSelect}
        planPrices={{
          Annual: planPricesForSelector?.annual,
          Monthly: planPricesForSelector?.monthly,
          '36M': planPricesForSelector?.['36M']
        }}
        planName={firstSubscription?.plan}
        isMultiDevice={isMultiDevice}
        multiDeviceTotals={multiDeviceTotals}
        monthlyUpfrontFeeText={`+ R${hypotheticalMonthlyUpfront.toLocaleString()} upfront (hardware & setup)`}
      />

      {isBillingSet ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Payment Breakdown</h2>
            <p className="text-neutral-500">Review your payment summary and provide your details below.</p>
          </div>

          <PaymentSummaryCard 
            is36M={selectedBilling?.toUpperCase() === '36M'}
            hardwareItems={(['vehicle', 'motorbike', 'person'] as const).reduce((acc, type) => {
              const qty = hardware[type].quantity;
              if (qty > 0) {
                acc.push({
                  name: `${type.charAt(0).toUpperCase() + type.slice(1)} Tracker`,
                  quantity: qty,
                  unitPrice: pricingData.hardware[type]
                });
              }
              return acc;
            }, [] as { name: string; quantity: number; unitPrice: number }[])}
            totalHardwareValue={(['vehicle', 'motorbike', 'person'] as const).reduce((sum, type) => sum + (hardware[type].quantity * pricingData.hardware[type]), 0)}
            addOnHardwareItems={addOnHardwareItems}
            upfrontSections={finalUpfrontSections}
            totalDueToday={finalTotalDueToday}
            hideMonthly={isAnnual}
            monthlySections={finalMonthlySections}
            totalMonthlyDebit={isAnnual ? 0 : totalMonthlyDebit}
          />

          {selectedBilling === "36M" && (
            <ApplicationRequiredCard contractLines={contractLines} totalMonthlyDebit={totalMonthlyDebit} />
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm">
            👆 Select a billing plan above to see your payment breakdown
          </p>
        </div>
      )}
    </div>
  );
}
