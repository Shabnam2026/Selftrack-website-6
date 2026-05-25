import React from 'react';
import { ShieldAlert, BatteryCharging, LucideIcon, Sparkles } from 'lucide-react';
import usePersonCheckoutStore, { PersonAddOns } from '../../store/usePersonCheckoutStore';
import { PERSON_ADDONS } from '../../config/personPricing';

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldAlert,
  BatteryCharging,
};

function PersonStep3AddOns() {
  const addOns = usePersonCheckoutStore(s => s.addOns);
  const hardware = usePersonCheckoutStore(s => s.hardware);
  const subscription = usePersonCheckoutStore(s => s.subscription);
  const setAddOnQuantity = usePersonCheckoutStore(s => s.setAddOnQuantity);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Optional Add-Ons</h1>
        <p className="text-gray-600">
          Enhance your tracking experience with powerful add-ons.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {PERSON_ADDONS.map(addOn => (
          <AddOnCard
            key={addOn.id}
            addOn={addOn}
            quantity={addOns[addOn.id as keyof PersonAddOns]}
            maxQty={hardware.quantity}
            onChange={(qty: number) => setAddOnQuantity(addOn.id as keyof PersonAddOns, qty)}
            subscription={subscription}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
          ✓ All add-ons are easy to install and work seamlessly with your device.
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mt-6 text-center">
        You can manage or add these later from your account.
      </p>
    </div>
  );
}

const AddOnCard: React.FC<{ addOn: any, quantity: number, maxQty: number, onChange: (qty: number) => void, subscription?: any }> = ({ addOn, quantity, maxQty, onChange, subscription }) => {
  const Icon = ICON_MAP[addOn.icon] || ShieldAlert;
  const isSelected = quantity > 0;
  
  if (addOn.builtIn) {
    const personPlan = subscription?.plan;
    const isAdvanced = personPlan === "ADVANCED";
    const monthlyPrice = addOn.getMonthlyPrice ? addOn.getMonthlyPrice(personPlan) : 16;
    
    return (
      <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-emerald-500 transition-colors relative flex flex-col">
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          BUILT-IN
        </div>
        
        <div className="flex flex-col items-center text-center flex-1">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-600" strokeWidth={2.25} />
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{addOn.name}</h3>
          
          <p className="text-sm text-gray-500 mb-6 max-w-xs flex-1">
            {addOn.description}
          </p>
          
          <div className="space-y-2 mb-6 w-full max-w-xs text-sm">
            <div className="text-center">
              <span className="text-gray-600">Once off: </span>
              <span className="inline-flex items-center gap-1">
                <span className="font-semibold text-emerald-600">R0</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                  INCLUDED
                </span>
              </span>
            </div>
            
            <div className="text-center">
              <span className="text-gray-600">Monthly: </span>
              {isAdvanced ? (
                <span className="inline-flex items-center gap-1">
                  <span className="font-semibold text-emerald-600">R0</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                    FREE WITH ADVANCED
                  </span>
                </span>
              ) : (
                <span className="font-semibold">R{monthlyPrice}/mo</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={() => quantity > 0 && onChange(quantity - 1)}
              disabled={quantity === 0}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
                ${quantity > 0 
                  ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
                  : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
              aria-label="Decrease"
            >
              −
            </button>
            
            <span className="text-lg font-bold w-8 text-center">{quantity}</span>
            
            <button
              type="button"
              onClick={() => quantity < maxQty && onChange(quantity + 1)}
              disabled={quantity >= maxQty}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
                ${quantity < maxQty 
                  ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
                  : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
              aria-label="Increase"
            >
              +
            </button>
          </div>
          
          {quantity >= maxQty && maxQty > 0 && (
            <p className="text-center text-xs text-gray-400 mt-2">
              Max: {maxQty}
            </p>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`border-2 rounded-lg p-6 transition-all flex flex-col
      ${isSelected 
        ? 'border-emerald-500 bg-emerald-50' 
        : 'border-gray-200 hover:border-gray-300'}`}>
      
      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mb-4 mx-auto">
        <Icon className="w-5 h-5 text-emerald-600" strokeWidth={2.25} />
      </div>
      
      <h3 className="text-lg font-bold text-center mb-2">{addOn.name}</h3>
      <p className="text-sm text-gray-600 text-center mb-4 flex-1">
        {addOn.description}
      </p>
      
      <div className="text-sm text-gray-700 mb-4 text-center space-y-1">
        <div>Once off: <span className="font-semibold">R{addOn.onceOff}</span></div>
        <div>Monthly: <span className="font-semibold">R{addOn.monthly}</span></div>
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => quantity > 0 && onChange(quantity - 1)}
          disabled={quantity === 0}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
            ${quantity > 0 
              ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
              : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
          aria-label="Decrease"
        >
          −
        </button>
        
        <span className="text-lg font-bold w-8 text-center">{quantity}</span>
        
        <button
          type="button"
          onClick={() => quantity < maxQty && onChange(quantity + 1)}
          disabled={quantity >= maxQty}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
            ${quantity < maxQty 
              ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
              : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
          aria-label="Increase"
        >
          +
        </button>
      </div>
      
      {quantity >= maxQty && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Max: {maxQty}
        </p>
      )}
    </div>
  );
}

export default PersonStep3AddOns;
