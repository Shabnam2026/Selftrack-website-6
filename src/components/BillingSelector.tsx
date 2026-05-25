import React from 'react';
import { Check } from 'lucide-react';

interface BillingSelectorProps {
  selectedBilling: string | null;
  onSelect: (billingModel: string) => void;
  planPrices: { Annual?: number; annual?: number; Monthly?: number; monthly?: number; '36M'?: number } | null;
  planName?: string;
  isMultiDevice?: boolean;
  multiDeviceTotals?: { Annual?: number; annual?: number; Monthly?: number; monthly?: number; '36M'?: number } | null;
  monthlyUpfrontFeeText?: string;
}

function BillingSelector({ selectedBilling, onSelect, planPrices, planName, isMultiDevice = false, multiDeviceTotals = null, monthlyUpfrontFeeText }: BillingSelectorProps) {
  if (!planPrices && !isMultiDevice) {
    return (
      <div className="text-center text-gray-500 p-8">
        Loading billing options...
      </div>
    );
  }
  
  // Calculate prices to display based on cart type
  const annualMonthly = isMultiDevice 
    ? (multiDeviceTotals?.Annual || multiDeviceTotals?.annual || 0)
    : (planPrices?.Annual || planPrices?.annual || 0);
  
  const monthlyAmount = isMultiDevice 
    ? (multiDeviceTotals?.Monthly || multiDeviceTotals?.monthly || 0)
    : (planPrices?.Monthly || planPrices?.monthly || 0);
  
  const contract36M = isMultiDevice 
    ? (multiDeviceTotals?.["36M"] || 0)
    : (planPrices?.["36M"] || 0);
  
  const annualPrepayTotal = annualMonthly * 12;
  const total36MContract = contract36M * 35;
  
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Billing Plan</h2>
        <p className="text-gray-600 text-sm">
          Select how you'd like to pay for your subscription
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ANNUAL OPTION */}
        <BillingOption
          id="annual"
          isSelected={selectedBilling === "annual" || selectedBilling === "Annual"}
          onClick={() => onSelect("annual")}
          title="ANNUAL"
          badge="Save 15%"
          price={annualMonthly}
          annualPrepayTotal={annualPrepayTotal}
          isMultiDevice={isMultiDevice}
          priceLabel="/mo"
          subtext="Billed annually upfront"
          buttonText="Choose Annual"
        />
        
        {/* MONTHLY OPTION */}
        <BillingOption
          id="monthly"
          isSelected={selectedBilling === "monthly" || selectedBilling === "Monthly"}
          onClick={() => onSelect("monthly")}
          title="MONTHLY"
          badge={null}
          price={monthlyAmount}
          isMultiDevice={isMultiDevice}
          priceLabel="/mo"
          subtext="Pay month-to-month"
          buttonText="Choose Monthly"
          upfrontFeeText={monthlyUpfrontFeeText}
        />
        
        {/* 36-MONTH OPTION (with magnets) */}
        <BillingOption36M
          id="36M"
          isSelected={selectedBilling === "36M"}
          onClick={() => onSelect("36M")}
          monthlyPrice={contract36M}
          totalContract={total36MContract}
          isMultiDevice={isMultiDevice}
        />
      </div>
    </div>
  );
}

// Standard billing option card (Annual & Monthly)
function BillingOption({ id, isSelected, onClick, title, badge, price, annualPrepayTotal, isMultiDevice, priceLabel, subtext, buttonText, upfrontFeeText }: any) {
  return (
    <div
      className={`border-2 rounded-lg p-6 transition-all cursor-pointer flex flex-col h-full
        ${isSelected 
          ? 'border-emerald-500 bg-emerald-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4 h-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
          {title}
        </h3>
        {badge && (
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        {isMultiDevice ? (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">
                R{(id === 'annual' ? annualPrepayTotal : price).toLocaleString()}
              </span>
              {id === 'monthly' && <span className="text-sm text-gray-500">/mo</span>}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {id === 'annual' ? 'prepaid annually' : 'across all devices'}
            </p>
            {id === 'monthly' && upfrontFeeText && (
              <p className="text-xs text-gray-500 italic mt-2 font-medium">
                {upfrontFeeText}
              </p>
            )}
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              See breakdown below ↓
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">R{price}</span>
              <span className="text-sm text-gray-500">{priceLabel}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{subtext}</p>
            {id === 'monthly' && upfrontFeeText && (
              <p className="text-xs text-gray-500 italic mt-2 font-medium">
                {upfrontFeeText}
              </p>
            )}
            {id === 'monthly' && upfrontFeeText && (
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                Then R{price}/mo thereafter
              </p>
            )}
          </>
        )}
      </div>
      
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors mt-auto
          ${isSelected
            ? 'bg-emerald-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        {isSelected ? '✓ Selected' : buttonText}
      </button>
    </div>
  );
}

// 36-Month option (featured with magnets)
function BillingOption36M({ id, isSelected, onClick, monthlyPrice, totalContract, isMultiDevice }: any) {
  return (
    <div
      className={`relative border-2 rounded-lg p-6 transition-all cursor-pointer
        ${isSelected 
          ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
          : 'border-emerald-300 bg-white hover:border-emerald-500 hover:shadow-md'}`}
      onClick={onClick}
    >
      {/* "Best Value" badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 
                      bg-emerald-500 text-white text-xs font-bold 
                      uppercase tracking-wider px-3 py-1 rounded-full 
                      shadow-md whitespace-nowrap">
        ⭐ Best Value
      </div>
      
      <div className="flex items-center justify-between mb-4 h-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700">
          36-Month
        </h3>
      </div>
      
      {/* R0 to Start framing */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-emerald-600">R0</div>
        <p className="text-xs text-gray-600 mt-1">to start — no upfront cost</p>
      </div>
      
      {/* Magnets */}
      <div className="space-y-1.5 mb-4 bg-emerald-50 p-2 rounded">
        <div className="flex items-center gap-2 text-xs text-emerald-700">
          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="font-medium">First Month FREE</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-700">
          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="font-medium">Hardware Included</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-700">
          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="font-medium">No Installation Fee</span>
        </div>
      </div>
      
      {/* Recurring details — differs for single vs multi */}
      {isMultiDevice ? (
        <p className="text-xs text-gray-600 mb-4">
          Then R{monthlyPrice.toLocaleString()}/mo for 35 months
          <br />
          <span className="text-emerald-600 font-medium">
            across all devices · See breakdown below ↓
          </span>
        </p>
      ) : (
        <p className="text-xs text-gray-600 mb-4">
          Then R{monthlyPrice}/mo for 35 months
          <br />
          <span className="text-gray-400">
            Total: R{totalContract.toLocaleString()}
          </span>
        </p>
      )}
      
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors
          ${isSelected
            ? 'bg-emerald-500 text-white'
            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
      >
        {isSelected ? '✓ Selected' : 'Get Started — R0 →'}
      </button>
      
      <p className="text-xs text-gray-400 italic text-center mt-2">
        *Subject to credit approval
      </p>
    </div>
  );
}

export default BillingSelector;
