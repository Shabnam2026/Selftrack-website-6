import React from 'react';
import { Car, Bike, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCheckoutStore } from './store/useCheckoutStore';
import { DeviceCard } from './components/DeviceCard';
import { VehicleDetailsRow } from './components/VehicleDetailsRow';

export default function Step1() {
  const { hardware, updateHardwareQuantity, updateVehicleDetail } = useCheckoutStore();

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Hardware Selection</h2>
        <p className="text-neutral-500">Choose the type of tracking device you need and select the quantity for a complete solution.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DeviceCard 
          title="Vehicle"
          icon={Car}
          quantity={hardware.vehicle.quantity}
          onQuantityChange={(qty) => updateHardwareQuantity('vehicle', qty)}
        />
        <DeviceCard 
          title="Motorbike"
          icon={Bike}
          quantity={hardware.motorbike.quantity}
          onQuantityChange={(qty) => updateHardwareQuantity('motorbike', qty)}
        />
        <DeviceCard 
          title="Person"
          icon={User}
          quantity={hardware.person.quantity}
          onQuantityChange={(qty) => updateHardwareQuantity('person', qty)}
        />
      </div>

      <AnimatePresence>
        {hardware.vehicle.quantity > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-neutral-200 mt-2">
              {hardware.vehicle.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VehicleDetailsRow 
                    index={index} 
                    details={detail} 
                    onChange={(newDetail) => updateVehicleDetail(index, newDetail)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
