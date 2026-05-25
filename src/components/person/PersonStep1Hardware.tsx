import React from 'react';
import { User } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';

function PersonStep1Hardware() {
  const hardware = usePersonCheckoutStore(s => s.hardware);
  const setHardwareQuantity = usePersonCheckoutStore(s => s.setHardwareQuantity);
  
  const canDecrement = hardware.quantity > 1;
  const canIncrement = hardware.quantity < 10;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-2">Personal Tracking Device</h1>
      <p className="text-gray-600 mb-8">
        Choose how many personal trackers you need.
      </p>
      
      <div className="max-w-sm mx-auto">
        <div className="border-2 border-emerald-500 bg-emerald-50 rounded-lg p-6 relative">
          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            ✓ SELECTED
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h3 className="text-lg font-bold mb-6">Person</h3>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => canDecrement && setHardwareQuantity(hardware.quantity - 1)}
                disabled={!canDecrement}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
                  ${canDecrement 
                    ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
                    : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
                aria-label="Decrease quantity"
              >
                −
              </button>
              
              <span className="text-xl font-bold w-10 text-center">
                {hardware.quantity}
              </span>
              
              <button
                type="button"
                onClick={() => canIncrement && setHardwareQuantity(hardware.quantity + 1)}
                disabled={!canIncrement}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors
                  ${canIncrement 
                    ? 'border-gray-300 hover:bg-gray-100 cursor-pointer' 
                    : 'border-gray-200 opacity-30 cursor-not-allowed'}`}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            {!canDecrement && (
              <p className="text-xs text-gray-500 mt-3">
                Minimum 1 tracker required
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonStep1Hardware;
