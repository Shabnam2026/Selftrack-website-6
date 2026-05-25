import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCheckoutStore, Subscription } from './store/useCheckoutStore';
import { PlanCard } from './components/PlanCard';
import DeviceStepper from './components/DeviceStepper';
import { pricingData, VEHICLE_PLANS, MOTORBIKE_PLANS } from './config/pricing';
import { PERSON_PLANS } from './config/personPricing';
import { Car, Bike, User } from 'lucide-react';

export default function Step2() {
  const hardware = useCheckoutStore(s => s.hardware);
  const subscriptions = useCheckoutStore(s => s.subscriptions);
  const addSubscription = useCheckoutStore(s => s.setSubscription);
  const setSubscriptions = useCheckoutStore(s => s.setSubscriptions);
  const nextStep = useCheckoutStore(s => s.nextStep);
  const currentDeviceIndex = useCheckoutStore(s => s.currentDeviceIdx);
  const setCurrentDeviceIndex = useCheckoutStore(s => s.setCurrentDeviceIdx);

  const deviceQueue = useMemo(() => {
    const queue: { deviceType: 'vehicle' | 'motorbike' | 'person', deviceIndex: number, displayName: string, icon: string }[] = [];
    
    for (let i = 0; i < hardware.vehicle.quantity; i++) {
      queue.push({ 
        deviceType: "vehicle", 
        deviceIndex: i,
        displayName: hardware.vehicle.quantity > 1 ? `Vehicle ${i + 1}` : "Vehicle",
        icon: "Car"
      });
    }
    
    for (let i = 0; i < hardware.motorbike.quantity; i++) {
      queue.push({ 
        deviceType: "motorbike", 
        deviceIndex: i,
        displayName: hardware.motorbike.quantity > 1 ? `Motorbike ${i + 1}` : "Motorbike",
        icon: "Bike"
      });
    }
    
    for (let i = 0; i < hardware.person.quantity; i++) {
      queue.push({ 
        deviceType: "person", 
        deviceIndex: i,
        displayName: hardware.person.quantity > 1 ? `Person ${i + 1}` : "Person",
        icon: "User"
      });
    }
    
    return queue;
  }, [hardware]);

  const totalDevices = deviceQueue.length;
  const currentDevice = deviceQueue[currentDeviceIndex];

  useEffect(() => {
    console.log("[Step2] Render state:", {
      currentDeviceIndex,
      currentDevice,
      totalDevices,
      subscriptionsCount: subscriptions?.length || 0,
      subscriptions,
    });
  }, [currentDeviceIndex, currentDevice, totalDevices, subscriptions]);

  useEffect(() => {
    const validSubs = subscriptions.filter(sub => {
      const hwQty = hardware[sub.deviceType]?.quantity || 0;
      return sub.deviceIndex < hwQty;
    });
    
    if (validSubs.length !== subscriptions.length) {
      console.warn("[Step2] Cleaning orphaned subscriptions:", subscriptions.length - validSubs.length);
      setSubscriptions(validSubs);
    }

    if (subscriptions.length >= totalDevices && totalDevices > 0) {
      setCurrentDeviceIndex(totalDevices - 1);
    }
  }, []);

  useEffect(() => {
    const recommendedEl = document.getElementById('plan-card-ADVANCED');
    if (recommendedEl && window.innerWidth < 1280) {
      setTimeout(() => {
        recommendedEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }, 300);
    }
  }, [currentDeviceIndex]);

  if (totalDevices === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No devices selected. Please go back to Step 1.</p>
      </div>
    );
  }

  if (!currentDevice) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 mb-4">All devices configured!</p>
        <button onClick={() => nextStep()} className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
          Continue to Add-Ons →
        </button>
      </div>
    );
  }

  const plans = currentDevice.deviceType === 'vehicle' 
    ? VEHICLE_PLANS 
    : currentDevice.deviceType === 'motorbike' 
      ? MOTORBIKE_PLANS 
      : PERSON_PLANS;

  const Icon = currentDevice.deviceType === 'vehicle' ? Car : currentDevice.deviceType === 'motorbike' ? Bike : User;

  const handleSelectPlan = (planName: string, price: number) => {
    let deviceModel = pricingData.deviceModels[currentDevice.deviceType];
    
    addSubscription({
      deviceType: currentDevice.deviceType,
      deviceIndex: currentDevice.deviceIndex,
      plan: planName,
      billingModel: "annual",
      price,
      applicableDevice: deviceModel,
      deviceModel: deviceModel
    });

    console.log("[Step2] Plan selected (billing TBD on Step 4):", {
      device: currentDevice.displayName,
      plan: planName,
      nextIndex: currentDeviceIndex + 1,
      totalDevices,
    });

    if (currentDeviceIndex + 1 < totalDevices) {
      setCurrentDeviceIndex(currentDeviceIndex + 1);
    } else {
      nextStep();
    }
  };

  const currentSub = subscriptions.find(s => s.deviceType === currentDevice.deviceType && s.deviceIndex === currentDevice.deviceIndex);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-600">Pick a tracking plan tailored to your needs.</p>
      </div>

      <DeviceStepper
        deviceQueue={deviceQueue}
        currentDeviceIndex={currentDeviceIndex}
        subscriptions={subscriptions}
        onJumpToDevice={(idx) => setCurrentDeviceIndex(idx)}
      />

      <div className="flex items-center justify-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-emerald-600" />
        <span className="text-base font-medium text-gray-700">
          Subscription for {currentDevice.displayName} 
          {totalDevices > 1 && ` (${currentDeviceIndex + 1} of ${totalDevices})`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentDevice.deviceType}-${currentDevice.deviceIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop: 4-column grid (≥ 1280px / xl breakpoint) */}
          <div className="hidden xl:grid xl:grid-cols-4 gap-4 items-stretch">
            {plans.map((plan: any) => {
              const pricesConfig: any = pricingData.subscriptions[currentDevice.deviceType];
              const priceObj = pricesConfig[plan.name];
              const price = priceObj ? priceObj['annual'] : 0;
              const isSelected = currentSub?.plan === plan.name;

              return (
                <PlanCard 
                  key={plan.name}
                  name={plan.name}
                  tagline={plan.tagline}
                  price={price}
                  features={plan.features}
                  allPlans={plans}
                  isRecommended={plan.isRecommended}
                  selected={isSelected}
                  onSelect={() => handleSelectPlan(plan.name, price)}
                />
              );
            })}
          </div>

          {/* Tablet & Mobile: horizontal scroll */}
          <div className="xl:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {plans.map((plan: any) => {
                const pricesConfig: any = pricingData.subscriptions[currentDevice.deviceType];
                const priceObj = pricesConfig[plan.name];
                const price = priceObj ? priceObj['annual'] : 0;
                const isSelected = currentSub?.plan === plan.name;

                return (
                  <div 
                    key={plan.name}
                    id={`plan-card-${plan.name}`}
                    className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] snap-center"
                  >
                    <PlanCard 
                      name={plan.name}
                      tagline={plan.tagline}
                      price={price}
                      features={plan.features}
                      allPlans={plans}
                      isRecommended={plan.isRecommended}
                      selected={isSelected}
                      onSelect={() => handleSelectPlan(plan.name, price)}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Scroll hint indicator */}
            <p className="text-xs text-gray-500 text-center mt-2">
              ← Swipe to see all plans →
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
