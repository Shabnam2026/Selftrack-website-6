import React from 'react';
import { useCheckoutStore } from '../store/useCheckoutStore';
import { CheckCircle, Package, Tag, CreditCard, ShoppingCart, Check, Car, Puzzle } from 'lucide-react';

export function ProgressBar() {
  const { currentStep, setStep, subscriptions, hardware } = useCheckoutStore();

  const STEPS = [
    { title: "Hardware", short: "Hardware", icon: Car },
    { title: "Subscriptions", short: "Plans", icon: Package },
    { title: "Add-Ons", short: "Add-ons", icon: Puzzle },
    { title: "Payment", short: "Payment", icon: CreditCard },
    { title: "Review", short: "Review", icon: ShoppingCart },
    { title: "Complete", short: "Complete", icon: CheckCircle },
  ];

  /* Can navigate to a step if all previous steps are done.
     Step 1 -> always true
     Step 2 -> hardware is valid
     Step 3 -> subscriptions are valid
     Step 4 -> add-ons are optional so always valid if 3 is reached
     Step 5 -> customer and payment setup
   */
  const canNavigateToStep = (targetStep: number) => {
     if (currentStep === 6 && targetStep < 6) return false; // Lock out edits on completion
     if (targetStep === currentStep) return true;
     if (targetStep < currentStep) return true; // Can always go back
     
     const totalDevices = hardware.vehicle.quantity + hardware.motorbike.quantity + hardware.person.quantity;
     const hasDevice = totalDevices > 0;
     const allVehiclesValid = hardware.vehicle.details.every(v => v.brand && v.model && v.year && v.colour);

     if (targetStep === 2) return hasDevice && allVehiclesValid;
     if (targetStep === 3) return hasDevice && allVehiclesValid && subscriptions.length === totalDevices;
     if (targetStep === 4) return hasDevice && allVehiclesValid && subscriptions.length === totalDevices; // Add-ons are optional
     
     if (targetStep === 5) {
       const { customer } = useCheckoutStore.getState();
       const isCustomerValid = 
         customer.firstName.trim().length > 0 &&
         customer.surname.trim().length > 0 &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) &&
         /^\d{9}$/.test(customer.phone) &&
         /^([A-Za-z0-9]{6,13})$/.test(customer.idNumber);
       return hasDevice && allVehiclesValid && subscriptions.length === totalDevices && isCustomerValid;
     }

     return false; // Can never skip to 6 manually
  };

  const handleStepClick = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex + 1)) {
       setStep(stepIndex + 1);
    }
  };

  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-10">
        
        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center justify-between relative px-4">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full -z-10" />
          
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full transition-all duration-500 ease-out -z-10"
            style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - ${currentStep === 1 ? '0rem' : '1rem'})`, maxWidth: 'calc(100% - 2rem)' }}
          />

          {STEPS.map((step, index) => {
            const isCompleted = currentStep > index + 1 || currentStep === 6;
            const isCurrent = currentStep === index + 1 && currentStep !== 6;
            const isClickable = canNavigateToStep(index + 1);
            const Icon = step.icon;
            
            let circleOuter = "border-gray-200 bg-white";
            let circleInner = "bg-gray-100 text-gray-400";
            let labelStyle = "text-gray-400 font-medium";
            
            if (isCurrent) {
              circleOuter = "border-emerald-500 bg-white shadow-sm shadow-emerald-100";
              circleInner = "bg-emerald-500 text-white";
              labelStyle = "text-emerald-600 font-bold";
            } else if (isCompleted) {
              circleOuter = "border-emerald-500 bg-emerald-50";
              circleInner = "bg-emerald-500 text-white";
              labelStyle = "text-emerald-600 font-medium";
            }

            return (
              <button 
                key={index} 
                className={`relative flex flex-col items-center group outline-none ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                aria-label={step.title}
              >
                <div 
                  className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center transition-all ${circleOuter}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${circleInner}`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : <Icon className="w-5 h-5" />}
                  </div>
                </div>
                <span 
                  className={`absolute -bottom-8 whitespace-nowrap text-xs uppercase tracking-wide transition-colors ${labelStyle}`}
                >
                  {step.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden">
           <div className="flex justify-between items-end mb-2">
              <div className="font-bold text-neutral-800 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shadow-sm">
                   {currentStep === 6 ? <Check size={16} strokeWidth={3} /> : currentStep}
                 </span>
                 <span className="tracking-tight">{STEPS[currentStep - 1].title}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                 Step {currentStep} of {STEPS.length}
              </div>
           </div>
           <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
               style={{ width: `${((currentStep) / STEPS.length) * 100}%` }}
             />
           </div>
        </div>
      </div>
    </div>
  );
}
