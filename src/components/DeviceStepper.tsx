import React from 'react';
import { Car, Bike, User, Check } from 'lucide-react';
import { Subscription } from '../store/useCheckoutStore';

const ICON_MAP: Record<string, any> = { Car, Bike, User };

interface DeviceStep {
  deviceType: 'vehicle' | 'motorbike' | 'person';
  deviceIndex: number;
  displayName: string;
  icon: string;
}

interface DeviceStepperProps {
  deviceQueue: DeviceStep[];
  currentDeviceIndex: number;
  subscriptions: Subscription[];
  onJumpToDevice: (idx: number) => void;
}

function DeviceStepper({ deviceQueue, currentDeviceIndex, subscriptions, onJumpToDevice }: DeviceStepperProps) {
  const isConfigured = (device: DeviceStep) => {
    return subscriptions.some(s => 
      s.deviceType === device.deviceType && 
      s.deviceIndex === device.deviceIndex
    );
  };
  
  if (deviceQueue.length <= 1) return null;
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-1 md:gap-3 flex-wrap">
        {deviceQueue.map((device, idx) => {
          const Icon = ICON_MAP[device.icon] || User;
          const completed = isConfigured(device);
          const isCurrent = idx === currentDeviceIndex;
          const isPending = idx > currentDeviceIndex && !completed;
          
          return (
            <div key={`${device.deviceType}-${device.deviceIndex}`} className="flex items-center">
              {/* Device button */}
              <button
                type="button"
                onClick={() => (completed || isCurrent) && onJumpToDevice(idx)}
                disabled={isPending}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all focus:outline-none ${
                  isCurrent ? 'bg-emerald-50 ring-2 ring-emerald-500' : ''
                } ${
                  completed ? 'cursor-pointer hover:bg-gray-100' : ''
                } ${
                  isPending ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCurrent ? 'bg-emerald-500 text-white' : ''
                } ${
                  completed && !isCurrent ? 'bg-emerald-100 text-emerald-700' : ''
                } ${
                  isPending ? 'bg-gray-200 text-gray-400' : ''
                }`}>
                  {completed && !isCurrent ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  isCurrent ? 'text-emerald-700' : ''
                } ${
                  completed && !isCurrent ? 'text-gray-600' : ''
                } ${
                  isPending ? 'text-gray-400' : ''
                }`}>
                  {device.displayName}
                </span>
              </button>
              
              {/* Connector line */}
              {idx < deviceQueue.length - 1 && (
                <div className={`hidden md:block w-8 h-0.5 mx-1 ${
                  idx < currentDeviceIndex || isConfigured(deviceQueue[idx]) 
                    ? 'bg-emerald-500' 
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">
          {subscriptions.filter(s => 
            deviceQueue.some(d => 
              d.deviceType === s.deviceType && d.deviceIndex === s.deviceIndex
            )
          ).length} of {deviceQueue.length} devices configured
        </span>
      </div>
    </div>
  );
}

export default DeviceStepper;
