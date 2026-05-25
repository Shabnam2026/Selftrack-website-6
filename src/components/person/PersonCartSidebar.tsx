import React from 'react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { selectPayTodayTotal, selectMonthlyDebitTotal } from '../../utils/totalsSelectors';

function PersonCartSidebar() {
  const store = usePersonCheckoutStore();
  const hardware = store.hardware;
  const subscription = store.subscription;
  const addOns = store.addOns;
  const currentStep = store.currentStep;
  const reset = store.reset;
  
  const onceOffTotal = selectPayTodayTotal(store);
  const monthlyTotal = selectMonthlyDebitTotal(store);
  
  // Hide totals on early steps (steps 1-3), show from step 4+
  const showTotals = currentStep >= 5;

  const isAnnual = subscription?.billingModel === "Annual" || subscription?.billingModel === "annual";
  
  // We need to compute totalAddOnsMonthly here since getMonthlyTotal includes it
  const isAdvanced = subscription?.plan === "ADVANCED";
  const panicMonthlyTotal = addOns.panicButton * (isAdvanced ? 0 : 16);
  const batteryMonthlyTotal = addOns.extendedBattery * 59;
  const totalAddOnsMonthly = panicMonthlyTotal + batteryMonthlyTotal;

  const finalOnceOffTotal = isAnnual ? onceOffTotal + (totalAddOnsMonthly * 12) : onceOffTotal;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          🛒 Your Selection
        </h3>
        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">
          {hardware.quantity} items
        </span>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <div className="font-medium">Hardware Devices</div>
          <div className="text-gray-500 text-xs">
            {hardware.quantity}× Person Tracker
          </div>
        </div>
        
        {subscription.plan && (
          <div>
            <div className="font-medium">Plan</div>
            <div className="text-gray-500 text-xs">
              {subscription.plan} ({subscription.billingModel})
            </div>
          </div>
        )}
        
        {(addOns.panicButton > 0 || addOns.extendedBattery > 0) && (
          <div>
            <div className="font-medium">Add-ons</div>
            {addOns.panicButton > 0 && (
              <div className="text-gray-500 text-xs">
                {addOns.panicButton}× Panic Button
              </div>
            )}
            {addOns.extendedBattery > 0 && (
              <div className="text-gray-500 text-xs">
                {addOns.extendedBattery}× Extended Battery
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4">
        {showTotals ? (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span>Pay Today</span>
              <span className="font-semibold">R{finalOnceOffTotal.toLocaleString()}</span>
            </div>
            {!isAnnual && (
              <div className="flex justify-between text-sm">
                <span>Monthly</span>
                <span className="font-semibold text-emerald-600">
                  R{monthlyTotal.toLocaleString()}/mo
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
            <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
              🔒 Final pricing shown at checkout
            </div>
          </div>
        )}
      </div>
      
      {process.env.NODE_ENV !== 'production' && (
        <button 
          type="button"
          onClick={() => {
            localStorage.removeItem("selftrack-person-checkout");
            window.location.href = "/checkout/person";
          }}
          className="text-xs text-red-500 hover:text-red-700 underline mt-4 w-full text-center"
        >
          🔄 Reset Cart (Dev Only)
        </button>
      )}
    </div>
  );
}

export default PersonCartSidebar;
