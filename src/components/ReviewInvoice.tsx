import React, { useMemo } from 'react';
import { SquarePen } from 'lucide-react';
import { useCheckoutStore, DeviceType, Subscription } from '../store/useCheckoutStore';
import { pricingData } from '../config/pricing';
import { computeAddOnAllocation } from '../utils/addOnAllocation';
import { is36Month } from '../utils/totalsSelectors';
import IncludedCheckIcon from './IncludedCheckIcon';

export function EditSectionButton({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex flex-shrink-0 items-center justify-center w-8 h-8 rounded-full 
                 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 
                 transition-colors cursor-pointer ml-4 origin-right"
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      <SquarePen className="w-4 h-4" strokeWidth={2.25} />
    </button>
  );
}

export function IncludedBadge({ text = "INCLUDED" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-wider">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      {text}
    </span>
  );
}

export function ReviewInvoice({ showContactDetails = true }: { showContactDetails?: boolean }) {
  const store = useCheckoutStore();
  const { hardware, subscriptions, addOns, hasPremiumVehiclePlan, requiredBackupTrackerCount, setStep, customer } = store;

  const hasPremium = hasPremiumVehiclePlan();
  const is36M = is36Month(store);

  const addOnAllocation = useMemo(() => {
    return computeAddOnAllocation(subscriptions, addOns);
  }, [subscriptions, addOns]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  
  // SECTION 1: HARDWARE
  const hardwareRows: { name: string; qty: number; unitPrice: number; total: number; children: string[] }[] = [];
  
  (['vehicle', 'motorbike', 'person'] as const).forEach(type => {
    const qty = type === 'vehicle' ? hardware.vehicle.quantity : type === 'motorbike' ? hardware.motorbike.quantity : hardware.person.quantity;
    if (qty > 0) {
      const unitPrice = pricingData.hardware[type];
      const children: string[] = [];
      
      if (type === 'vehicle') {
        hardware.vehicle.details.forEach((v, idx) => {
          if (v.brand && v.model) {
            children.push(`Vehicle ${idx + 1}: ${v.brand} ${v.model}, ${v.year}, ${v.colour}`);
          } else {
             children.push(`Vehicle ${idx + 1}`);
          }
        });
      } else {
        for (let i = 0; i < qty; i++) {
           children.push(`${capitalize(type)} ${i + 1}`);
        }
      }

      const upfrontSubs = subscriptions.filter(s => s.deviceType === type && s.billingModel !== '36M');
      const m36Subs = subscriptions.filter(s => s.deviceType === type && s.billingModel === '36M');

      if (upfrontSubs.length > 0) {
         const upfrontChildren = children.filter((_, idx) => subscriptions.find(s => s.deviceType === type && s.deviceIndex === idx)?.billingModel !== '36M');
         hardwareRows.push({
           name: `${capitalize(type)} Tracker`,
           qty: upfrontSubs.length,
           unitPrice,
           total: unitPrice * upfrontSubs.length,
           children: upfrontChildren
         });
      }
      
      if (m36Subs.length > 0) {
         const m36Children = children.filter((_, idx) => subscriptions.find(s => s.deviceType === type && s.deviceIndex === idx)?.billingModel === '36M');
         hardwareRows.push({
           name: `${capitalize(type)} Tracker (Financed)`,
           qty: m36Subs.length,
           unitPrice: 0,
           total: 0,
           children: m36Children
         });
      }
    }
  });

  const section1Total = hardwareRows.reduce((sum, r) => sum + r.total, 0);

  // SECTION 2: SUBSCRIPTIONS
  const subRows = subscriptions.map(sub => {
    const planPrices = (pricingData.subscriptions[sub.deviceType] as any)[sub.plan];
    const priceText = sub.billingModel === 'annual' 
        ? `R${planPrices.annual}/mo` 
        : sub.billingModel === '36M' ? `R${planPrices['36M']}/mo` : `R${planPrices.monthly}/mo`;
    
    return {
      device: `${capitalize(sub.deviceType)} ${sub.deviceIndex + 1}`,
      plan: sub.plan,
      billing: sub.billingModel === 'annual' ? 'Annual' : sub.billingModel === '36M' ? '36-Month' : 'Monthly',
      priceText,
      is36M: sub.billingModel === '36M'
    };
  });

  // SECTION 3: ADD-ONS
  const addOnRows: { name: React.ReactNode; qty: number; onceOff: number; monthly: number; children?: string[] }[] = [];
  
  const pb = addOns?.panicButton;
  const pbVehicle = (typeof pb === 'object' && pb !== null)
    ? (pb.vehicle || 0)
    : (typeof pb === 'number' && !isNaN(pb) ? pb : 0);
  const pbPerson = (typeof pb === 'object' && pb !== null)
    ? (pb.person || 0)
    : 0;

  if (pbVehicle > 0) {
    const onceOff = pricingData.addOns.panicButton.onceOff * pbVehicle;
    const monthly = addOnAllocation.panicButtonVehicle.reduce((sum, item) => sum + item.monthly, 0);
    addOnRows.push({
      name: (
        <span>
          Panic Button
          <span className="text-xs text-neutral-500 ml-1">(vehicle)</span>
          {monthly < (pbVehicle * 16) && (
             <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium inline-block">Includes FREE units</span>
          )}
        </span>
      ),
      qty: pbVehicle,
      onceOff,
      monthly
    });
  }

  if (pbPerson > 0) {
    const monthly = addOnAllocation.panicButtonPerson.reduce((sum, item) => sum + item.monthly, 0);
    addOnRows.push({
      name: (
        <span>
          Panic Button
          <span className="text-xs text-neutral-500 ml-1">(person, built-in)</span>
          <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium inline-block">INCLUDED</span>
        </span>
      ),
      qty: pbPerson,
      onceOff: 0,
      monthly
    });
  }
  if (addOns.immobilizer > 0) {
    const totalImmobilizerMonthly = addOnAllocation.immobilizer.reduce((sum, item) => sum + item.monthly, 0);
    addOnRows.push({ 
      name: (
        <span>
          Remote Immobilizer
          {totalImmobilizerMonthly < (addOns.immobilizer * 16) && (
             <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium inline-block">Includes FREE units</span>
          )}
        </span>
      ),
      qty: addOns.immobilizer, 
      onceOff: pricingData.addOns.immobilizer.onceOff * addOns.immobilizer, 
      monthly: totalImmobilizerMonthly
    });
  }
  if (addOns.driverRecorder > 0) {
    addOnRows.push({ name: 'Driver Behavior Recorder', qty: addOns.driverRecorder, onceOff: pricingData.addOns.driverRecorder.onceOff * addOns.driverRecorder, monthly: pricingData.addOns.driverRecorder.monthly * addOns.driverRecorder });
  }
  if (addOns.backupTracker > 0) {
    const children: string[] = [];
    hardware.vehicle.details.forEach((v, i) => {
       if (v.brand && v.model && v.requiresBackupTracker) {
          children.push(`Required for high-risk vehicle (${v.brand} ${v.model})`);
       }
    });
    
    // Backup Tracker monthly billing (from primary sub billing)
    let backupTrackersToAllocate = addOns.backupTracker;
    let backupTrackerRecurringTotal = 0;
    
    subscriptions.filter(s => s.deviceType === 'vehicle').forEach(s => {
      if (backupTrackersToAllocate > 0) {
        if (s.billingModel === 'annual') {
           backupTrackerRecurringTotal += pricingData.subscriptions.backupTracker.annual;
        } else if (s.billingModel === '36M' || s.billingModel?.toLowerCase().includes('36')) {
           backupTrackerRecurringTotal += pricingData.subscriptions.backupTracker['36M'];
        } else {
           backupTrackerRecurringTotal += pricingData.subscriptions.backupTracker.monthly;
        }
        backupTrackersToAllocate--;
      }
    });
    if (backupTrackersToAllocate > 0) {
      backupTrackerRecurringTotal += backupTrackersToAllocate * pricingData.subscriptions.backupTracker.monthly;
    }

    addOnRows.push({ name: 'Wireless Backup Tracker', qty: addOns.backupTracker, onceOff: pricingData.addOns.backupTracker.onceOff * addOns.backupTracker, monthly: backupTrackerRecurringTotal, children: children.length > 0 ? children : undefined });
  }
  if (addOns.extendedBattery > 0) {
    addOnRows.push({ name: 'Extended Battery Life', qty: addOns.extendedBattery, onceOff: pricingData.addOns.extendedBattery.onceOff * addOns.extendedBattery, monthly: pricingData.addOns.extendedBattery.monthly * addOns.extendedBattery });
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      
      {/* SECTION 1: HARDWARE */}
      <div className="p-6 sm:p-8 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-widest">Hardware (Once-off)</h3>
          <EditSectionButton onClick={() => setStep(1)} ariaLabel="Edit hardware selection" />
        </div>
        {hardwareRows.length > 0 ? (
          <div className="space-y-4">
             <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-100">
               <div className="col-span-6">Item</div>
               <div className="col-span-2 text-center">Qty</div>
               <div className="col-span-2 text-right">Unit Price</div>
               <div className="col-span-2 text-right">Line Total</div>
             </div>
             
             {hardwareRows.map((r, i) => {
                const isFinanced = r.name.includes('(Financed)');
                const originalUnitPrice = r.unitPrice === 0 && isFinanced ? 
                  (r.name.includes('Vehicle') ? pricingData.hardware.vehicle : 
                   r.name.includes('Motorbike') ? pricingData.hardware.motorbike : 
                   pricingData.hardware.person) : r.unitPrice;
                   
                return (
                  <div key={i} className="mb-4">
                    <div className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center py-2 text-sm">
                      <div className="col-span-6 font-semibold text-neutral-800">{r.name}</div>
                      <div className="col-span-2 text-neutral-500 sm:text-center mt-1 sm:mt-0 whitespace-nowrap">Qty: {r.qty}</div>
                      <div className="col-span-2 text-neutral-500 sm:text-right hidden sm:block">
                        {is36M && isFinanced ? (
                          <span className="line-through text-gray-400">
                            R{originalUnitPrice.toLocaleString()}
                          </span>
                        ) : (
                          `R${r.unitPrice.toLocaleString()}`
                        )}
                      </div>
                      <div className="col-span-2 font-bold text-neutral-800 sm:text-right mt-1 sm:mt-0 flex sm:block justify-start items-center">
                        {is36M && isFinanced ? (
                          <IncludedCheckIcon label="Included" />
                        ) : (
                          `R${r.total.toLocaleString()}`
                        )}
                      </div>
                    </div>
                    {r.children.length > 0 && (
                      <div className="ml-0 sm:ml-4 pl-4 border-l-2 border-neutral-100 mt-2 space-y-1">
                        {r.children.map((c, idx) => (
                           <div key={idx} className="text-xs text-neutral-500 flex items-center gap-2">
                             <span className="w-1 h-1 rounded-full bg-neutral-300"></span> {c}
                           </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
             })}

             <div className="pt-4 flex justify-between items-center border-t border-neutral-100">
                <span className="text-sm font-semibold text-neutral-500">Hardware Subtotal</span>
                {is36M ? (
                  <span className="font-bold text-neutral-800 flex items-center gap-2">
                    <span className="line-through text-gray-400 font-normal">
                      R{hardwareRows.reduce((sum, r) => {
                        const originalUnitPrice = r.unitPrice === 0 && r.name.includes('(Financed)') ? 
                          (r.name.includes('Vehicle') ? pricingData.hardware.vehicle : 
                           r.name.includes('Motorbike') ? pricingData.hardware.motorbike : 
                           pricingData.hardware.person) : r.unitPrice;
                        return sum + (originalUnitPrice * r.qty);
                      }, 0).toLocaleString()}
                    </span>
                    <IncludedCheckIcon label="All Included" />
                  </span>
                ) : (
                  <span className="font-bold text-neutral-800">R{section1Total.toLocaleString()}</span>
                )}
             </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No upfront hardware costs.</p>
        )}
      </div>

      {/* SECTION 2: SUBSCRIPTIONS */}
      <div className="p-6 sm:p-8 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-widest">Subscriptions (Monthly Costs)</h3>
          <EditSectionButton onClick={() => setStep(2)} ariaLabel="Edit subscription plans" />
        </div>
        
        <div className="space-y-4">
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-100">
               <div className="col-span-4">Device</div>
               <div className="col-span-4">Plan</div>
               <div className="col-span-2">Billing</div>
               <div className="col-span-2 text-right">Price</div>
             </div>

             {subRows.map((r, i) => (
                <div key={i} className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center py-2 text-sm border-b sm:border-b-0 border-neutral-100 pb-4 sm:pb-2 last:border-0 last:pb-0">
                  <div className="col-span-4 font-semibold text-neutral-800">{r.device}</div>
                  <div className="col-span-4 font-medium text-emerald-600 tracking-wide mt-1 sm:mt-0">{r.plan}</div>
                  <div className="col-span-2 text-neutral-500 mt-1 sm:mt-0">
                     <span className="bg-neutral-100 px-2 py-0.5 rounded text-xs font-bold">{r.billing}</span>
                  </div>
                  <div className="col-span-2 font-bold text-neutral-800 sm:text-right mt-2 sm:mt-0 flex items-center justify-between sm:justify-end gap-2">
                    {r.priceText}
                  </div>
                </div>
             ))}
        </div>
      </div>

      {/* SECTION 3: ADD-ONS */}
      {addOnRows.length > 0 && (
         <div className="p-6 sm:p-8 border-b border-neutral-200 last:border-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-widest">Add-ons</h3>
              <EditSectionButton onClick={() => setStep(3)} ariaLabel="Edit add-ons" />
            </div>
            
            <div className="space-y-4">
                <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-100">
                  <div className="col-span-4">Add-on</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-3 text-right whitespace-nowrap">Once-off</div>
                  <div className="col-span-3 text-right">Monthly</div>
                </div>

                {addOnRows.map((r, i) => (
                   <div key={i} className="mb-4">
                     <div className="flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center py-2 text-sm">
                       <div className="col-span-4 font-semibold text-neutral-800">{r.name}</div>
                       <div className="col-span-2 text-neutral-500 sm:text-center mt-1 sm:mt-0 whitespace-nowrap">Qty: {r.qty}</div>
                       <div className="col-span-3 text-neutral-500 sm:text-right mt-1 sm:mt-0 flex flex-col sm:items-end justify-center whitespace-nowrap">
                         {is36M && r.onceOff > 0 ? (
                           <div className="flex items-center gap-2 sm:justify-end">
                             <span className="line-through text-gray-400">
                               R{r.onceOff.toLocaleString()}
                             </span>
                             <IncludedCheckIcon label="Included" />
                           </div>
                         ) : (
                           r.onceOff > 0 ? `R${r.onceOff.toLocaleString()}` : '-'
                         )}
                       </div>
                       <div className="col-span-3 font-medium text-emerald-600 sm:text-right mt-1 sm:mt-0 flex items-center justify-start sm:justify-end">
                         {r.monthly > 0 ? `+ R${r.monthly.toLocaleString()}/mo` : '-'}
                       </div>
                     </div>
                     {r.children && r.children.length > 0 && (
                       <div className="ml-0 sm:ml-4 pl-4 border-l-2 border-neutral-100 mt-2 space-y-1">
                         {r.children.map((c, idx) => (
                            <div key={idx} className="text-xs text-neutral-500 flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-neutral-300"></span> {c}
                            </div>
                         ))}
                       </div>
                     )}
                   </div>
                ))}
            </div>
         </div>
      )}

      {/* SECTION 4: CONTACT DETAILS */}
      {showContactDetails && customer?.firstName && (
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-neutral-800 uppercase tracking-widest">Contact Details</h3>
            <EditSectionButton onClick={() => setStep(4)} ariaLabel="Edit contact details" />
          </div>
          
          <div className="space-y-2 text-sm text-neutral-700">
            <div>
              <span className="text-neutral-500 font-medium">Name: </span>
              <span className="font-semibold text-neutral-900">
                {customer?.firstName} {customer?.surname}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Email: </span>
              <span className="font-semibold text-neutral-900">{customer?.email}</span>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Phone: </span>
              <span className="font-semibold text-neutral-900">+27 {customer?.phone}</span>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">ID/Passport: </span>
              <span className="font-semibold text-neutral-900">{customer?.idNumber}</span>
            </div>
            {customer?.cityProvince && (
              <div>
                <span className="text-neutral-500 font-medium">City/Province: </span>
                <span className="font-semibold text-neutral-900">{customer.cityProvince}</span>
              </div>
            )}
            <div>
              <span className="text-neutral-500 font-medium">Address: </span>
              <span className="font-semibold text-neutral-900">{customer?.address}</span>
            </div>
            <div>
              <span className="text-neutral-500 font-medium">Postal Code: </span>
              <span className="font-semibold text-neutral-900">{customer?.postalCode}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
