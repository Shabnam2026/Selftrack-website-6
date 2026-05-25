import React, { useMemo, useState, useEffect } from 'react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import PersonPaymentBreakdown from './PersonPaymentBreakdown';
import PersonContractConfirmationBanner from './PersonContractConfirmationBanner';
import BillingSelector from '../BillingSelector';
import { PERSON_PLANS } from '../../config/personPricing';

function PersonStep4Payment() {
  const lead = usePersonCheckoutStore(s => s.lead);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const setBillingForSubscription = usePersonCheckoutStore(s => s.setBillingForSubscription);
  const isBillingSet = usePersonCheckoutStore(s => s.isBillingSet());
  
  const selectedBilling = subscription?.billingModel || null;
  const hardware = usePersonCheckoutStore(s => s.hardware);
  const addOns = usePersonCheckoutStore(s => s.addOns);
  const PERSON_HARDWARE_PRICE = 1695; // Configured in personPricing, but hardcoding since we can't easily import if it's not exported
  
  const planPricesForSelector = useMemo(() => {
    if (!subscription?.plan) return null;
    const plan = PERSON_PLANS.find(p => p.id === subscription.plan);
    return plan?.prices || null;
  }, [subscription?.plan]);
  
  const monthlyUpfrontTotal = useMemo(() => {
    const hwCost = hardware.quantity * PERSON_HARDWARE_PRICE;
    const batteryOnceOff = (addOns.extendedBattery || 0) * 399;
    const firstMonthRate = planPricesForSelector?.Monthly || 0;
    return hwCost + batteryOnceOff + firstMonthRate;
  }, [hardware.quantity, addOns.extendedBattery, planPricesForSelector?.Monthly]);
  
  const handleBillingSelect = (billingModel: string) => {
    setBillingForSubscription(billingModel);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Payment</h1>
        <p className="text-gray-600 text-sm">
          Review your order and select your preferred billing option.
        </p>
      </div>
      
      <BillingSelector
        selectedBilling={selectedBilling}
        onSelect={handleBillingSelect}
        planPrices={{
          Annual: planPricesForSelector?.Annual,
          Monthly: planPricesForSelector?.Monthly,
          '36M': planPricesForSelector?.['36M']
        }}
        planName={subscription?.plan || undefined}
        monthlyUpfrontFeeText={`+ R${monthlyUpfrontTotal.toLocaleString()} upfront (hardware & setup)`}
      />
      
      {isBillingSet ? (
        <>
          <PersonPaymentBreakdown />
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

export default PersonStep4Payment;
