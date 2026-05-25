import React from 'react';
import { CreditCard, Calendar, SquarePen } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { PERSON_HARDWARE_PRICE } from '../../config/personPricing';

function EditSubscriptionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-semibold 
                 text-emerald-600 hover:text-emerald-700 normal-case 
                 transition-colors px-2 py-1 rounded hover:bg-emerald-50 cursor-pointer"
      title="Change your plan"
      aria-label="Edit subscription"
    >
      <SquarePen className="w-3.5 h-3.5" strokeWidth={2.25} />
      Edit
    </button>
  );
}

function PersonPaymentBreakdown() {
  const hardware = usePersonCheckoutStore(s => s.hardware);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const addOns = usePersonCheckoutStore(s => s.addOns);
  const onceOffTotal = usePersonCheckoutStore(s => s.getOnceOffTotal());
  const monthlyTotal = usePersonCheckoutStore(s => s.getMonthlyTotal());
  const setStep = usePersonCheckoutStore(s => s.setStep);

  const handleEditSubscription = () => {
    console.log("[PersonPaymentBreakdown] Edit subscription — navigating to Step 2");
    setStep(2);
  };
  
  const billingModel = subscription?.billingModel || "Annual";
  const planName = subscription?.plan || "—";
  const price = subscription?.price || 0;
  
  const isAnnual = billingModel === "Annual";
  const isMonthly = billingModel === "Monthly";
  const is36M = billingModel === "36M";
  
  const hardwareCost = hardware.quantity * PERSON_HARDWARE_PRICE;
  const batteryOnceOff = (addOns.extendedBattery || 0) * 399;
  const annualPrepay = isAnnual ? price * 12 : 0;
  const firstMonth = isMonthly ? price : 0;
  
  const batteryMonthly = (addOns.extendedBattery || 0) * 59;
  
  const personPlan = subscription?.plan;
  const isAdvanced = personPlan === "ADVANCED";
  const panicMonthlyPrice = isAdvanced ? 0 : 16;
  const panicMonthlyTotal = addOns.panicButton * panicMonthlyPrice;

  const totalAddOnsMonthly = batteryMonthly + panicMonthlyTotal;
  const annualizedAddOnsTotal = isAnnual ? totalAddOnsMonthly * 12 : 0;
  
  const finalOnceOffTotal = onceOffTotal + annualizedAddOnsTotal;
  
  return (
    <div className={`grid grid-cols-1 ${!isAnnual ? 'md:grid-cols-2' : ''} gap-6`}>
      <div className="border-2 border-emerald-500 rounded-lg overflow-hidden">
        <div className="bg-emerald-500 text-white px-4 py-3 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pay Upfront Today
        </div>
        
        {is36M ? (
          <div className="p-5 space-y-4">
            <div className="text-center pb-3">
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="text-lg font-bold text-emerald-700">
                Nothing to pay today!
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Your 36-Month Contract includes everything below
              </p>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-3">
                Hardware (Included with 36M)
              </div>
              
              <div className="flex items-center justify-between bg-emerald-50 
                              rounded p-2.5">
                <div className="text-sm">
                  <span className="font-medium text-neutral-800">
                    {hardware.quantity}× Person Tracker
                  </span>
                  <span className="text-gray-500 ml-2">
                    R{hardwareCost.toLocaleString()}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-500 
                                 text-white text-[10px] font-bold px-2 py-1 
                                 rounded-full whitespace-nowrap uppercase tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Included
                </span>
              </div>
            </div>
            
            {(addOns.panicButton > 0 || addOns.extendedBattery > 0) && (
              <div className="pt-2">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-3">
                  Add-On Hardware (Included with 36M)
                </div>
              </div>
            )}
            
            {addOns.panicButton > 0 && (
              <div className="flex items-center justify-between bg-emerald-50 rounded p-2.5 mt-2">
                <div className="text-sm">
                  <span className="font-medium text-neutral-800">
                    {addOns.panicButton}× Panic Button
                  </span>
                  <span className="text-gray-500 ml-2">
                    R0
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-500 
                                 text-white text-[10px] font-bold px-2 py-1 
                                 rounded-full whitespace-nowrap uppercase tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  BUILT-IN
                </span>
              </div>
            )}
            
            {addOns.extendedBattery > 0 && (
              <div className="flex items-center justify-between bg-emerald-50 rounded p-2.5 mt-2">
                <div className="text-sm">
                  <span className="font-medium text-neutral-800">
                    {addOns.extendedBattery}× Extended Battery Life
                  </span>
                  <span className="text-gray-500 ml-2">
                    <span className="line-through opacity-70">
                      R{(addOns.extendedBattery * 399).toLocaleString()}
                    </span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-500 
                                 text-white text-[10px] font-bold px-2 py-1 
                                 rounded-full whitespace-nowrap uppercase tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Included
                </span>
              </div>
            )}
            
            {hardware.quantity >= 1 && (
              <div className="border-t border-gray-200 pt-3 flex items-center justify-between mt-2">
                <div className="text-sm">
                  <span className="text-gray-600">Hardware Value: </span>
                  <span className="font-bold text-neutral-800">R{(hardwareCost + (addOns.extendedBattery * 399)).toLocaleString()}</span>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-500 
                                 text-white text-[10px] font-bold px-2 py-1 
                                 rounded-full whitespace-nowrap uppercase tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  All Included
                </span>
              </div>
            )}
            
            <div className="bg-emerald-50 rounded-lg p-3 space-y-2 mt-auto">
              <div className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="16" height="16" className="text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span className="font-medium">First Month FREE</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-800">
                <svg width="16" height="16" className="text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span className="font-medium">No Installation Fee</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-4">
              <div className="flex justify-between items-center text-base">
                <span className="font-bold text-neutral-800 uppercase tracking-widest text-sm">Total Due Today</span>
                <span className="text-3xl font-bold text-emerald-600 tracking-tight">R0</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3 text-sm">
            <div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
                Hardware (Once-off)
              </div>
              <div className="flex justify-between">
                <span>{hardware.quantity}× Person Tracker</span>
                <span>R{hardwareCost.toLocaleString()}</span>
              </div>
            </div>
            
            {(addOns.panicButton > 0 || batteryOnceOff > 0) && (
              <div>
                <div className="text-xs text-gray-500 uppercase font-semibold mb-2 mt-3">
                  Add-Ons (Once-off)
                </div>
                {addOns.panicButton > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {addOns.panicButton}× Panic Button
                      <span className="text-gray-500 ml-1 text-xs">(built-in)</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      R0
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">INCLUDED</span>
                    </span>
                  </div>
                )}
                {addOns.extendedBattery > 0 && (
                  <div className="flex justify-between">
                    <span>{addOns.extendedBattery}× Extended Battery</span>
                    <span>R{batteryOnceOff.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
            
            {isAnnual && (
              <div>
                <div className="flex items-center justify-between mb-2 mt-3 border-b border-neutral-100 pb-1">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    Annual Subscription (Prepaid 12 Months)
                  </div>
                  <EditSubscriptionButton onClick={handleEditSubscription} />
                </div>
                <div className="flex justify-between">
                  <span>{planName} Annual</span>
                  <span>R{annualPrepay.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            {isAnnual && annualizedAddOnsTotal > 0 && (
              <div>
                <div className="text-xs text-gray-500 uppercase font-semibold mb-2 mt-3">
                  Annual Add-Ons (Prepaid 12 Months)
                </div>
                {addOns.panicButton > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {addOns.panicButton}× Panic Button — annual
                      <span className="text-gray-500 ml-1 text-xs">({personPlan})</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      R{panicMonthlyTotal * 12}
                      {isAdvanced && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">FREE</span>
                      )}
                    </span>
                  </div>
                )}
                {addOns.extendedBattery > 0 && (
                  <div className="flex justify-between">
                    <span>{addOns.extendedBattery}× Extended Battery — annual</span>
                    <span>R{batteryMonthly * 12}</span>
                  </div>
                )}
              </div>
            )}
            
            {isMonthly && (
              <div>
                <div className="flex items-center justify-between mb-2 mt-3 border-b border-neutral-100 pb-1">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    First Month Subscription
                  </div>
                  <EditSubscriptionButton onClick={handleEditSubscription} />
                </div>
                <div className="flex justify-between">
                  <span>{planName} Monthly</span>
                  <span>R{firstMonth.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-bold text-base">
                <span>TOTAL DUE TODAY</span>
                <span className="text-emerald-600 font-bold text-lg">R{finalOnceOffTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!isAnnual && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 font-semibold uppercase tracking-wider text-sm flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5" />
            Ongoing Monthly Payments
          </div>
        
        <div className="p-4 space-y-3 text-sm">
          {(isMonthly || is36M) && (
            <div>
              <div className="flex items-center justify-between mb-2 border-b border-neutral-100 pb-1">
                <div className="text-xs text-gray-500 uppercase font-semibold">
                  Monthly Subscription
                </div>
                <EditSubscriptionButton onClick={handleEditSubscription} />
              </div>
              <div className="flex justify-between">
                <span>{planName} {is36M ? '(36M)' : 'Monthly'}</span>
                <span>R{price}/mo</span>
              </div>
              {is36M && (
                <p className="text-xs text-emerald-600 mt-1">
                  🎁 First month FREE — billed from month 2
                </p>
              )}
            </div>
          )}
          
          {(addOns.panicButton > 0 || batteryMonthly > 0) && (
            <div>
              <div className="text-xs text-gray-500 uppercase font-semibold mb-2 mt-3">
                Monthly Add-Ons
              </div>
              {addOns.panicButton > 0 && (() => {
                const personPlan = subscription?.plan;
                const isAdvanced = personPlan === "ADVANCED";
                const monthlyPrice = isAdvanced ? 0 : 16;
                const totalMonthly = addOns.panicButton * monthlyPrice;
                
                return (
                  <div className="flex justify-between text-sm py-1">
                    <span>
                      {addOns.panicButton}× Panic Button
                      <span className="text-gray-500 ml-1 text-xs">
                        ({personPlan})
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      R{totalMonthly}
                      {isAdvanced && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">FREE</span>
                      )}
                    </span>
                  </div>
                );
              })()}
              {addOns.extendedBattery > 0 && (
                <div className="flex justify-between">
                  <span>{addOns.extendedBattery}× Extended Battery</span>
                  <span>R{batteryMonthly}/mo</span>
                </div>
              )}
            </div>
          )}
          
          {monthlyTotal === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">
              No ongoing monthly payments
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-bold text-base">
                <span>Total Monthly Debit Order</span>
                <span>R{monthlyTotal.toLocaleString()}/mo</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Starts after installation</p>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default PersonPaymentBreakdown;
