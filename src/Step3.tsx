import React, { useEffect } from 'react';
import { Sparkles, Check, Siren, ShieldAlert, ShieldOff, Video, Locate, BatteryCharging, ChevronLeft } from 'lucide-react';
import { useCheckoutStore } from './store/useCheckoutStore';
import { AddOnCard } from './components/AddOnCard';
import { pricingData } from './config/pricing';

export default function Step3() {
  const { hardware, addOns, updateAddOn, nextStep, prevStep, hasPremiumVehiclePlan, requiredBackupTrackerCount } = useCheckoutStore();

  const totalDevices = hardware.vehicle.quantity + hardware.motorbike.quantity + hardware.person.quantity;
  const vehicleCount = hardware.vehicle.quantity;
  const personCount = hardware.person.quantity;

  const requiredBackupTrackers = requiredBackupTrackerCount();
  const subscriptions = useCheckoutStore(s => s.subscriptions);
  const advPremCount = subscriptions.filter(s => 
    s.plan === "ADVANCED" || s.plan === "PREMIUM"
  ).length;
  const hasPremium = advPremCount > 0;

  // Initialize mandatory backup trackers
  useEffect(() => {
    if (addOns.backupTracker < requiredBackupTrackers) {
      updateAddOn('backupTracker', requiredBackupTrackers);
    }
  }, [requiredBackupTrackers, addOns.backupTracker, updateAddOn]);

  function getPanicButtonTotalQty(addOnsObj: any) {
    const pb = addOnsObj?.panicButton;
    if (typeof pb === 'object' && pb !== null) {
      return (pb.vehicle || 0) + (pb.person || 0);
    }
    return pb || 0;
  }

  return (
    <div className="flex flex-col h-full min-h-full">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Optional Add-Ons</h2>
          <p className="text-neutral-500">Enhance your tracking experience with powerful add-ons. Choose what works best for you.</p>
        </div>
      </div>

      <div 
        className="grid gap-5 pb-8 flex-1" 
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
      >
        {vehicleCount > 0 && (
          <VehiclePanicButtonCard
            subscriptions={subscriptions}
            quantity={addOns?.panicButton?.vehicle || 0}
            maxQty={vehicleCount}
            onQtyChange={(qty) => {
              console.log("[Step3] Vehicle Panic qty change:", qty);
              updateAddOn('panicButton', qty, 'vehicle');
            }}
          />
        )}

        {personCount > 0 && (
          <PersonPanicButtonCard
            subscriptions={subscriptions}
            quantity={addOns?.panicButton?.person || 0}
            maxQty={personCount}
            onQtyChange={(qty) => {
              console.log("[Step3] Person Panic qty change:", qty);
              updateAddOn('panicButton', qty, 'person');
            }}
          />
        )}
        
        {(vehicleCount > 0 || hardware.motorbike.quantity > 0) && (
          <AddOnCard
            title="Remote Immobilizer"
            description="Remotely disable your vehicle's engine in case of theft."
            icon={ShieldOff}
            iconTheme="amber"
            onceOff={pricingData.addOns.immobilizer.onceOff}
            monthly={pricingData.addOns.immobilizer.monthly}
            monthlyInfo={hasPremium ? "First N FREE per Advanced/Premium device. Additional units charged R16/mo each." : "Monthly fee applies with Starter/Recovery plans."}
            quantity={addOns.immobilizer}
            maxQuantity={vehicleCount + hardware.motorbike.quantity}
            onQuantityChange={(qty) => {
              console.log("[Step3] Immobilizer qty change:", qty);
              updateAddOn('immobilizer', qty);
            }}
            isFreeMonthly={hasPremium}
            planContext={hasPremium ? "ADVANCED" : undefined}
            advPremCount={advPremCount}
          />
        )}

        {vehicleCount > 0 && (
          <AddOnCard
            title="Driver Recorder"
            description="Record every journey with in-cabin video for added safety and evidence."
            icon={Video}
            iconTheme="blue"
            onceOff={pricingData.addOns.driverRecorder.onceOff}
            monthly={pricingData.addOns.driverRecorder.monthly}
            quantity={addOns.driverRecorder}
            maxQuantity={vehicleCount}
            onQuantityChange={(qty) => updateAddOn('driverRecorder', qty)}
          />
        )}

        {vehicleCount > 0 && (
          <AddOnCard
            title="Backup Tracker"
            description="A hidden backup tracker that keeps you covered if your device is removed."
            icon={Locate}
            iconTheme="slate"
            onceOff={pricingData.addOns.backupTracker.onceOff}
            monthly="From R45"
            quantity={addOns.backupTracker}
            maxQuantity={vehicleCount}
            minQuantity={requiredBackupTrackers}
            requiredTooltip={requiredBackupTrackers > 0 ? "Required for high-risk vehicle insurance" : undefined}
            isLocked={requiredBackupTrackers > 0}
            lockedSubtitle={requiredBackupTrackers > 0 ? `Auto-added for ${requiredBackupTrackers} high-risk vehicle(s)` : undefined}
            onQuantityChange={(qty) => updateAddOn('backupTracker', qty)}
          />
        )}

        {personCount > 0 && (
          <AddOnCard
            title="Extended Battery Life"
            description="Upgrade to a long-life battery for extended tracking performance."
            icon={BatteryCharging}
            iconTheme="emerald"
            onceOff={pricingData.addOns.extendedBattery.onceOff}
            monthly={pricingData.addOns.extendedBattery.monthly}
            quantity={addOns.extendedBattery}
            maxQuantity={personCount}
            onQuantityChange={(qty) => updateAddOn('extendedBattery', qty)}
          />
        )}
      </div>

      <div className="sticky bottom-0 -mx-4 px-4 sm:mx-0 sm:px-6 py-4 bg-neutral-50/95 backdrop-blur-md border-t border-neutral-200 mt-auto rounded-t-xl z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-medium px-4 py-2 justify-center rounded-lg flex items-center gap-2 mb-4 border border-emerald-100 w-fit mx-auto">
           <Check size={16} className="shrink-0" />
           <span>All add-ons are easy to install and work seamlessly with your device.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <button
             onClick={prevStep}
             className="hidden sm:flex text-neutral-500 hover:text-neutral-700 font-medium items-center gap-2 transition-colors cursor-pointer px-2"
           >
             <ChevronLeft size={20} /> Back
           </button>

           <p className="text-xs text-neutral-400 hidden lg:block text-center flex-1 pr-12">
             You can manage or add these later from your account.
           </p>
           
           <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
             <button 
               onClick={nextStep}
               className="flex-1 sm:flex-none px-6 py-3 whitespace-nowrap rounded-xl font-bold bg-emerald-500 text-white shadow-md hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
             >
               CONTINUE <span aria-hidden="true">→</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function PersonPanicButtonCard({ subscriptions, quantity, maxQty, onQtyChange }: { subscriptions: any[], quantity: number, maxQty: number, onQtyChange: (qty: number) => void }) {
  // NO HOOKS — pure component
  
  // Count Person Advanced subs
  const personAdvCount = (subscriptions || []).filter(s => 
    s.deviceType === 'person' && s.plan === "ADVANCED"
  ).length;
  
  const hasAnyAdv = personAdvCount > 0;
  
  return (
    <div className="flex flex-col border-2 rounded-xl p-6 hover:border-emerald-500 transition-colors relative bg-white border-neutral-200 shadow-sm min-h-[320px]">
      {/* Built-in badge in top-right */}
      <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-emerald-200">
        <Sparkles className="w-3 h-3" />
        Built-In
      </div>
      
      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-red-50 text-red-600 transition-colors mb-4">
        <ShieldAlert size={28} strokeWidth={2.25} />
      </div>

      <h3 className="font-bold text-lg text-neutral-800 mb-2 leading-tight flex items-center gap-2">
        Panic Button
        <span className="text-xs font-normal text-gray-500">
          (Person)
        </span>
      </h3>
      <p className="text-neutral-500 text-sm flex-1 break-words">
        Built into your Person tracker — instant SOS alerts
      </p>
      
      <div className="mb-6 space-y-1 shrink-0 mt-4 text-sm">
        <div className="flex gap-2 justify-between items-center text-sm mb-2">
          <span className="text-neutral-500 whitespace-nowrap">Once off:</span>
          <span className="font-bold text-neutral-700 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
              R0
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                INCLUDED
              </span>
            </span>
          </span>
        </div>
        
        <div className="flex flex-col gap-2 w-full text-sm">
          <span className="text-neutral-500 whitespace-nowrap">Monthly:</span>
          {hasAnyAdv ? (
            <div className="pl-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">• First {personAdvCount}:</span>
                <span className="font-semibold text-emerald-600 inline-flex items-center gap-1">
                  R0 
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                    FREE
                  </span>
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">• Additional:</span>
                <span className="font-semibold text-neutral-700">R16/mo each</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-end w-full">
              <span className="font-bold text-neutral-700 whitespace-nowrap">R16/mo each</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Quantity stepper */}
      <div className="flex flex-col gap-1 items-center shrink-0 w-full mt-auto">
        <div className="flex items-center justify-between bg-neutral-50 rounded-full p-1 border border-neutral-200 w-full shadow-sm">
          <button 
            type="button"
            onClick={() => onQtyChange(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-lg font-medium"
          >
            −
          </button>
          <span className="flex-1 text-center font-bold flex items-center justify-center text-lg text-neutral-800">{quantity}</span>
          <button 
            type="button"
            onClick={() => onQtyChange(Math.min(maxQty, quantity + 1))}
            disabled={quantity >= maxQty}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-lg font-medium"
          >
            +
          </button>
        </div>
        
        {quantity > 0 ? (
          <span className="text-xs text-neutral-400 font-medium mt-1">Max: {maxQty}</span>
        ) : (
          <span className="text-xs text-transparent font-medium select-none mt-1">Max: {maxQty}</span>
        )}
      </div>
    </div>
  );
}

function VehiclePanicButtonCard({ subscriptions, quantity, maxQty, onQtyChange }: { subscriptions: any[], quantity: number, maxQty: number, onQtyChange: (qty: number) => void }) {
  // NO HOOKS — pure component
  
  const HARDWARE_PRICE = 195;
  
  // Count Vehicle/Motorbike Advanced/Premium subs for smart pricing
  const vehicleAdvPremCount = (subscriptions || []).filter(s => 
    (s.deviceType === 'vehicle' || s.deviceType === 'motorbike') &&
    (s.plan === "ADVANCED" || s.plan === "PREMIUM")
  ).length;
  
  const hasAnyAdvPrem = vehicleAdvPremCount > 0;
  
  return (
    <div className="flex flex-col border-2 rounded-xl p-6 hover:border-emerald-500 transition-colors relative bg-white border-neutral-200 shadow-sm min-h-[320px]">
      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 bg-red-50 text-red-600 transition-colors mb-4">
        <Siren size={28} strokeWidth={2.25} />
      </div>
      
      <h3 className="font-bold text-lg text-neutral-800 mb-2 leading-tight flex items-center gap-2">
        Panic Button
        <span className="text-xs font-normal text-gray-500">
          (Vehicle)
        </span>
        {hasAnyAdvPrem && (
          <span title="First N FREE per Advanced/Premium Vehicle. Additional units charged R16/mo each." className="text-xs text-emerald-600 cursor-help">
            ℹ️
          </span>
        )}
      </h3>
      <p className="text-neutral-500 text-sm flex-1 break-words">
        Emergency SOS button for vehicle alerts
      </p>
      
      <div className="mb-6 space-y-1 shrink-0 mt-4 text-sm">
        <div className="flex gap-2 justify-between items-center text-sm mb-2">
          <span className="text-neutral-500 whitespace-nowrap">Hardware:</span>
          <span className="font-bold text-neutral-700 whitespace-nowrap">
            R{HARDWARE_PRICE} each
          </span>
        </div>
        
        <div className="flex flex-col gap-2 w-full text-sm">
          <span className="text-neutral-500 whitespace-nowrap">Monthly:</span>
          {hasAnyAdvPrem ? (
            <div className="pl-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">• First {vehicleAdvPremCount}:</span>
                <span className="font-semibold text-emerald-600 inline-flex items-center gap-1">
                  R0 
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                    FREE
                  </span>
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">• Additional:</span>
                <span className="font-semibold text-neutral-700">R16/mo each</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-end w-full">
              <span className="font-bold text-neutral-700 whitespace-nowrap">R16/mo each</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Quantity stepper */}
      <div className="flex flex-col gap-1 items-center shrink-0 w-full mt-auto">
        <div className="flex items-center justify-between bg-neutral-50 rounded-full p-1 border border-neutral-200 w-full shadow-sm">
          <button 
            type="button"
            onClick={() => onQtyChange(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-lg font-medium"
          >
            −
          </button>
          <span className="flex-1 text-center font-bold flex items-center justify-center text-lg text-neutral-800">{quantity}</span>
          <button 
            type="button"
            onClick={() => onQtyChange(Math.min(maxQty, quantity + 1))}
            disabled={quantity >= maxQty}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-600 shadow-sm border border-neutral-200 hover:text-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer text-lg font-medium"
          >
            +
          </button>
        </div>
        
        {quantity > 0 ? (
           <span className="text-xs text-neutral-400 font-medium mt-1">Max: {maxQty}</span>
        ) : (
           <span className="text-xs text-transparent font-medium select-none mt-1">Max: {maxQty}</span>
        )}
      </div>
    </div>
  );
}
