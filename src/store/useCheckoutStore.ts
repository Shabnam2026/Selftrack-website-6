import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPlanPrice, pricingData } from '../config/pricing';

export interface VehicleDetails {
  brand: string;
  model: string;
  year: string;
  colour: string;
  requiresBackupTracker: boolean;
}

export type DeviceType = 'vehicle' | 'motorbike' | 'person';

export interface Subscription {
  deviceType: DeviceType;
  deviceIndex: number;
  plan: string;
  billingModel: string;
  price: number;
  applicableDevice: string;
  deviceModel?: string;
  firstMonthFree?: boolean;
  billedMonths?: number;
  upfrontCost?: number;
  totalContractCost?: number;
}

export interface LeadState {
  firstName: string;
  email: string;
  phone: string;
  wantsCallback: boolean;
  wantsEmailedQuote: boolean;
  capturedAt: string | null;
  skipped: boolean;
}

export interface CheckoutState {
  currentStep: number;
  paymentSubStep: 'leadCapture' | 'paymentMethod';
  currentDeviceIdx: number;
  hardware: {
    vehicle: { quantity: number; details: VehicleDetails[] };
    motorbike: { quantity: number };
    person: { quantity: number };
  };
  subscriptions: Subscription[];
  addOns: {
    panicButton: any;
    immobilizer: number;
    driverRecorder: number;
    backupTracker: number;
    extendedBattery: number;
  };
  customer: {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    idNumber: string;
    postalCode?: string;
    cityProvince?: string;
    address?: string;
  };
  compliance: {
    acknowledgeAccuracy: boolean;
    agreeTerms: boolean;
    ficaConsent?: boolean;
    contractTermsAccepted?: boolean;
  };
  payment: {
    method: string | null;
    agreedToTerms: boolean;
  };
  lead: LeadState;
  hasPremiumVehiclePlan: () => boolean;
  requiredBackupTrackerCount: () => number;
  getAddOnCounts: () => { paid: number; included: number; total: number };
  getOnceOffTotal: () => number;
  getMonthlyTotal: () => number;
  setStep: (step: number) => void;
  setPaymentSubStep: (subStep: 'leadCapture' | 'paymentMethod') => void;
  nextStep: () => void;
  prevStep: () => void;
  updateHardwareQuantity: (type: 'vehicle' | 'motorbike' | 'person', quantity: number) => void;
  updateVehicleDetail: (index: number, details: Partial<VehicleDetails>) => void;
  setSubscription: (sub: Subscription) => void;
  setSubscriptions: (subs: Subscription[]) => void;
  setAllBillingModels: (newBillingModel: 'annual' | 'monthly' | '36M') => void;
  setBillingForAllSubscriptions: (billingModel: string) => void;
  isBillingSet: () => boolean;
  updateAddOn: (key: string, qty: number, deviceType?: 'vehicle' | 'person' | null) => void;
  setCustomer: (customerData: any) => void;
  setCompliance: (key: string, value: boolean) => void;
  setPayment: (paymentData: any) => void;
  setLead: (leadData: Omit<LeadState, 'capturedAt' | 'skipped'>) => void;
  skipLeadCapture: () => void;
  setCurrentDeviceIdx: (idx: number) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  paymentSubStep: 'leadCapture' as const,
  currentDeviceIdx: 0,
  hardware: {
    vehicle: { quantity: 0, details: [] },
    motorbike: { quantity: 0 },
    person: { quantity: 0 }
  },
  subscriptions: [],
  addOns: {
    panicButton: { vehicle: 0, person: 0 },
    immobilizer: 0,
    driverRecorder: 0,
    backupTracker: 0,
    extendedBattery: 0
  },
  customer: { firstName: '', surname: '', email: '', phone: '', idNumber: '', postalCode: '', cityProvince: '', address: '' },
  compliance: { acknowledgeAccuracy: false, agreeTerms: false, ficaConsent: false, contractTermsAccepted: false },
  payment: { method: null, agreedToTerms: false },
  lead: {
    firstName: '',
    email: '',
    phone: '',
    wantsCallback: false,
    wantsEmailedQuote: true,
    capturedAt: null,
    skipped: false,
  }
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      ...initialState,
      isBillingSet: () => {
        const state = get();
        if (!state.subscriptions || state.subscriptions.length === 0) return false;
        return state.subscriptions.every(s => 
          s.billingModel && ["Annual", "Monthly", "36M", "annual", "monthly"].includes(s.billingModel)
        );
      },
      hasPremiumVehiclePlan: () => {
        const state = get();
        return state.subscriptions.some(
          s => s.plan === "ADVANCED" || s.plan === "PREMIUM"
        );
      },
      requiredBackupTrackerCount: () => {
        const state = get();
        return state.hardware.vehicle.details.filter(v => v.requiresBackupTracker).length;
      },
      getAddOnCounts: () => {
        const state = get();
        let paid = 0;
        let included = 0;
        
        const panicBtn = state.addOns?.panicButton;
        const panicQty = typeof panicBtn === 'object' && panicBtn !== null ? (panicBtn.vehicle || 0) + (panicBtn.person || 0) : (typeof panicBtn === 'number' ? panicBtn : 0);
        
        if (panicQty > 0) paid += panicQty;
        if (state.addOns.driverRecorder > 0) paid += state.addOns.driverRecorder;
        if (state.addOns.backupTracker > 0) paid += state.addOns.backupTracker;
        if (state.addOns.extendedBattery > 0) paid += state.addOns.extendedBattery;
        
        const hasPremiumPlan = state.subscriptions.some(
          s => s.plan === "ADVANCED" || s.plan === "PREMIUM"
        );
        
        // Let's reset paid and carefully recalculate panicButton inclusions since above added to paid already
        paid = 0;
        if (panicQty > 0) {
          if (hasPremiumPlan) included += panicQty;
          else paid += panicQty;
        }
        
        if (state.addOns.driverRecorder > 0) paid += state.addOns.driverRecorder;
        if (state.addOns.backupTracker > 0) paid += state.addOns.backupTracker;
        if (state.addOns.extendedBattery > 0) paid += state.addOns.extendedBattery;

        if (state.addOns.immobilizer > 0) {
          if (hasPremiumPlan) included += state.addOns.immobilizer;
          else paid += state.addOns.immobilizer;
        }
        
        return { paid, included, total: paid + included };
      },
      getOnceOffTotal: () => {
        const state = get();
        
        const billingPlan = state.subscriptions?.[0]?.billingModel || 'Annual';
        if (billingPlan === '36M' || billingPlan === '36-Month' || billingPlan.toLowerCase().includes('36')) {
          return 0;
        }

        let total = 0;

        // 1. Hardware
        (['vehicle', 'motorbike', 'person'] as const).forEach(type => {
          const maxQty = state.hardware[type as 'vehicle'|'motorbike'|'person']?.quantity || 0;
          for (let i = 0; i < maxQty; i++) {
            const devSub = state.subscriptions.find(s => s.deviceType === type && s.deviceIndex === i);
            if (!devSub || !devSub.billingModel?.toLowerCase().includes('36')) {
              total += pricingData.hardware[type as 'vehicle'|'motorbike'|'person' | 'backupTracker']; // using correctly mapped config keys
            }
          }
        });

        // 2. Add-ons once off
        const panicAddOn = state.addOns?.panicButton;
        let panicVehicleQty = 0;
        let panicPersonQty = 0;
        
        if (typeof panicAddOn === 'object' && panicAddOn !== null) {
          panicVehicleQty = panicAddOn.vehicle || 0;
          panicPersonQty = panicAddOn.person || 0;
        } else if (typeof panicAddOn === 'number' && !isNaN(panicAddOn)) {
          // Old format fallback
          panicVehicleQty = panicAddOn;
        }
        
        total += panicVehicleQty * pricingData.addOns.panicButton.onceOff;  // Vehicle Panic: R195 each
        total += panicPersonQty * 0;     // Person Panic: R0 (built-in)
        
        total += state.addOns.immobilizer * pricingData.addOns.immobilizer.onceOff;
        total += state.addOns.driverRecorder * pricingData.addOns.driverRecorder.onceOff;
        total += state.addOns.backupTracker * pricingData.addOns.backupTracker.onceOff;
        total += state.addOns.extendedBattery * pricingData.addOns.extendedBattery.onceOff;

        let backupTrackersToAllocate = state.addOns.backupTracker;
        let backupTrackerAnnualTotal = 0;
        let backupTrackerMonthlyTotal = 0;

        // 3. Subscriptions (Annual Prepay & First Month)
        state.subscriptions.forEach(s => {
          if (s.billingModel === 'annual' || s.billingModel === 'Annual') {
            total += (s.price || 0) * 12;
            if (s.deviceType === 'vehicle' && backupTrackersToAllocate > 0) {
              backupTrackerAnnualTotal += pricingData.subscriptions.backupTracker.annual * 12;
              backupTrackersToAllocate--;
            }
          } else if (s.billingModel === 'monthly' || s.billingModel === 'Monthly') {
            total += (s.price || 0);
            if (s.deviceType === 'vehicle' && backupTrackersToAllocate > 0) {
              backupTrackerMonthlyTotal += pricingData.subscriptions.backupTracker.monthly;
              backupTrackersToAllocate--;
            }
          } else if (s.deviceType === 'vehicle' && backupTrackersToAllocate > 0) {
            // For 36M or other, backup tracker isn't prepaid annually or 1st month except if forced. Wait, 36M backup tracker has only monthly charge.
            backupTrackersToAllocate--;
          }
        });

        // Any remaining backup trackers (e.g. bought extra) just default to monthly first-month charge
        if (backupTrackersToAllocate > 0) {
          backupTrackerMonthlyTotal += backupTrackersToAllocate * pricingData.subscriptions.backupTracker.monthly;
        }

        total += backupTrackerAnnualTotal;
        total += backupTrackerMonthlyTotal;

        console.log("[useCheckoutStore] getOnceOffTotal:", {
          hardware: {
            vehicle: state.hardware.vehicle.quantity,
            motorbike: state.hardware.motorbike.quantity,
            person: state.hardware.person.quantity,
          },
          subscriptions: state.subscriptions.map(s => ({
            plan: s.plan,
            billing: s.billingModel,
            price: s.price,
          })),
          addOns: state.addOns,
          total,
        });

        return total;
      },
      getMonthlyTotal: () => {
        const state = get();
        let total = 0;
        
        // Subs recurring
        state.subscriptions.forEach(s => {
          if (s.billingModel === 'monthly' || s.billingModel === 'Monthly' || s.billingModel?.toLowerCase().includes('36')) {
            total += (s.price || 0);
          }
        });

        // Get panic qty values (defensive for old format)
        const panicAddOn = state.addOns?.panicButton;
        let panicVehicleQty = 0;
        let panicPersonQty = 0;
        
        if (typeof panicAddOn === 'object' && panicAddOn !== null) {
          panicVehicleQty = panicAddOn.vehicle || 0;
          panicPersonQty = panicAddOn.person || 0;
        } else if (typeof panicAddOn === 'number' && !isNaN(panicAddOn)) {
          panicVehicleQty = panicAddOn;
        }
        
        // Count Vehicle/Motorbike Advanced/Premium subs
        const vehicleAdvCount = (state.subscriptions || []).filter(s => 
          (s.deviceType === 'vehicle' || s.deviceType === 'motorbike') &&
          (s.plan === "ADVANCED" || s.plan === "PREMIUM")
        ).length;
        
        // Count Person Advanced subs
        const personAdvCount = (state.subscriptions || []).filter(s => 
          s.deviceType === 'person' && s.plan === "ADVANCED"
        ).length;
        
        // Vehicle Panic Button monthly — smart allocation against Vehicle Adv/Prem
        const panicVehicleFreeSlots = Math.min(vehicleAdvCount, panicVehicleQty);
        const panicVehiclePaid = panicVehicleQty - panicVehicleFreeSlots;
        total += panicVehiclePaid * 16;
        
        // Person Panic Button monthly — smart allocation against Person Advanced
        const panicPersonFreeSlots = Math.min(personAdvCount, panicPersonQty);
        const panicPersonPaid = panicPersonQty - panicPersonFreeSlots;
        total += panicPersonPaid * 16;
        
        // Immobilizer monthly — uses count of Vehicle/Motorbike Adv/Prem only
        const immobilizerQty = state.addOns?.immobilizer || 0;
        const immobilizerFreeSlots = Math.min(vehicleAdvCount, immobilizerQty);
        const immobilizerPaid = immobilizerQty - immobilizerFreeSlots;
        total += immobilizerPaid * 16;
        
        // Calculate backup tracker monthly
        let backupTrackersToAllocate = state.addOns.backupTracker;
        let backupTrackerRecurringTotal = 0;

        state.subscriptions.forEach(s => {
          if (s.deviceType === 'vehicle' && backupTrackersToAllocate > 0) {
            if (s.billingModel === '36M' || s.billingModel?.toLowerCase().includes('36')) {
              backupTrackerRecurringTotal += pricingData.subscriptions.backupTracker['36M'];
            } else if (s.billingModel === 'annual' || s.billingModel === 'Annual') {
              // no monthly charge for annual backup tracker
            } else {
              backupTrackerRecurringTotal += pricingData.subscriptions.backupTracker.monthly;
            }
            backupTrackersToAllocate--;
          }
        });

        if (backupTrackersToAllocate > 0) {
          backupTrackerRecurringTotal += backupTrackersToAllocate * pricingData.subscriptions.backupTracker.monthly;
        }

        total += backupTrackerRecurringTotal;

        // Other monthly
        total += (state.addOns?.driverRecorder || 0) * 129; // Hardcoding here as asked basically... wait, let's just use pricingData
        total -= (state.addOns?.driverRecorder || 0) * 129;
        total += (state.addOns?.driverRecorder || 0) * pricingData.addOns.driverRecorder.monthly;
        total += (state.addOns?.extendedBattery || 0) * pricingData.addOns.extendedBattery.monthly;

        console.log("[useCheckoutStore] getMonthlyTotal:", {
          vehicleAdvCount,
          personAdvCount,
          panic: { 
            vehicle: { qty: panicVehicleQty, free: panicVehicleFreeSlots, paid: panicVehiclePaid },
            person: { qty: panicPersonQty, free: panicPersonFreeSlots, paid: panicPersonPaid },
          },
          immobilizer: { qty: immobilizerQty, free: immobilizerFreeSlots, paid: immobilizerPaid },
          total,
        });

        return total;
      },
      setStep: (step: number) => set({ currentStep: step }),
      setPaymentSubStep: (subStep: 'leadCapture' | 'paymentMethod') => set({ paymentSubStep: subStep }),
      nextStep: () => set((state) => ({ currentStep: Math.min(7, state.currentStep + 1) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
      updateHardwareQuantity: (type, quantity) => set((state) => {
        const newHardware = { ...state.hardware, [type]: { ...state.hardware[type], quantity } };
        
        if (type === 'vehicle') {
          const currentDetails = [...newHardware.vehicle.details];
          if (quantity > currentDetails.length) {
            for (let i = currentDetails.length; i < quantity; i++) {
              currentDetails.push({ brand: '', model: '', year: '', colour: '', requiresBackupTracker: false });
            }
          } else {
            currentDetails.splice(quantity);
          }
          newHardware.vehicle.details = currentDetails;
        }

        const cleanedSubscriptions = state.subscriptions.filter(sub => {
          if (sub.deviceType !== type) return true;
          return sub.deviceIndex < quantity;
        });

        const cleanedAddOns = { ...state.addOns };
        
        if (type === "vehicle") {
          const newVehicleQty = quantity;
          cleanedAddOns.immobilizer = Math.min(cleanedAddOns.immobilizer, newVehicleQty);
          cleanedAddOns.driverRecorder = Math.min(cleanedAddOns.driverRecorder, newVehicleQty);
          cleanedAddOns.backupTracker = Math.min(cleanedAddOns.backupTracker, newVehicleQty);
          
          if (newVehicleQty === 0) {
            cleanedAddOns.immobilizer = 0;
            cleanedAddOns.driverRecorder = 0;
            cleanedAddOns.backupTracker = 0;
          }
        }
        
        if (type === "person") {
          cleanedAddOns.extendedBattery = Math.min(cleanedAddOns.extendedBattery, quantity);
        }
        
        const panicBtn = typeof cleanedAddOns.panicButton === 'object' && cleanedAddOns.panicButton !== null 
          ? { ...cleanedAddOns.panicButton }
          : { vehicle: typeof cleanedAddOns.panicButton === 'number' && !isNaN(cleanedAddOns.panicButton) ? cleanedAddOns.panicButton : 0, person: 0 };
          
        panicBtn.vehicle = Math.min(panicBtn.vehicle || 0, newHardware.vehicle.quantity + newHardware.motorbike.quantity);
        panicBtn.person = Math.min(panicBtn.person || 0, newHardware.person.quantity);
        
        cleanedAddOns.panicButton = panicBtn;

        if (type === "vehicle") {
          const requiredBackupCount = (newHardware.vehicle.details || []).filter(v => v.requiresBackupTracker).length;
          cleanedAddOns.backupTracker = Math.max(cleanedAddOns.backupTracker, requiredBackupCount);
        }

        return { 
          hardware: newHardware,
          subscriptions: cleanedSubscriptions,
          addOns: cleanedAddOns
        };
      }),
      updateVehicleDetail: (index, details) => set((state) => {
        const newDetails = [...state.hardware.vehicle.details];
        newDetails[index] = { ...newDetails[index], ...details };

        const updatedKeys = Object.keys(details);
        if (updatedKeys.includes("brand") || updatedKeys.includes("model")) {
          const HIGH_RISK_MODELS = [
            "Toyota Prado", "Toyota Fortuner", "Toyota Hilux",
            "Ford Ranger", "Nissan NP200", "VW Polo"
          ];
          const combined = `${newDetails[index].brand} ${newDetails[index].model}`.trim();
          newDetails[index].requiresBackupTracker = HIGH_RISK_MODELS.includes(combined);
        }

        const newRequiredCount = newDetails.filter(v => v.requiresBackupTracker).length;
        const currentBackupQty = state.addOns.backupTracker;
        const newBackupQty = Math.max(
          newRequiredCount,
          Math.min(currentBackupQty, state.hardware.vehicle.quantity)
        );

        return { 
          hardware: { ...state.hardware, vehicle: { ...state.hardware.vehicle, details: newDetails } },
          addOns: { ...state.addOns, backupTracker: newBackupQty }
        };
      }),
      setSubscription: (newSub) => set((state) => {
        if (newSub.billingModel === '36M' || newSub.billingModel?.toLowerCase().includes('36')) {
          newSub = {
            ...newSub,
            firstMonthFree: true,
            billedMonths: 35,
            upfrontCost: 0,
            totalContractCost: newSub.price * 35
          };
        }

        const existing = state.subscriptions.findIndex(
          s => s.deviceType === newSub.deviceType && 
               s.deviceIndex === newSub.deviceIndex
        );
        if (existing >= 0) {
          const updated = [...state.subscriptions];
          updated[existing] = newSub;
          return { subscriptions: updated };
        }
        return { subscriptions: [...state.subscriptions, newSub] };
      }),
      setSubscriptions: (subs) => set({ subscriptions: subs }),
      setBillingForAllSubscriptions: (billingModel) => set((state) => {
        if (!["Annual", "Monthly", "36M", "annual", "monthly"].includes(billingModel)) {
          console.warn("[useCheckoutStore] Invalid billing model:", billingModel);
          return state;
        }
        
        const mappedBillingModel = billingModel === 'Annual' ? 'annual' : billingModel === 'Monthly' ? 'monthly' : billingModel;
        
        const updatedSubscriptions = state.subscriptions.map(sub => {
          const price = getPlanPrice(sub.deviceType, sub.plan, mappedBillingModel as 'annual' | 'monthly' | '36M');
          
          return {
            ...sub,
            billingModel: mappedBillingModel,
            price,
            firstMonthFree: mappedBillingModel === '36M',
            billedMonths: mappedBillingModel === '36M' ? 35 : undefined,
            upfrontCost: mappedBillingModel === '36M' ? 0 : undefined,
            totalContractCost: mappedBillingModel === '36M' ? price * 35 : undefined
          };
        });
        
        console.log("[useCheckoutStore] Billing set for all subscriptions:", {
          billingModel: mappedBillingModel,
          subscriptionsCount: updatedSubscriptions.length,
        });
        
        return { subscriptions: updatedSubscriptions };
      }),
      setAllBillingModels: (newBillingModel) => set((state) => {
        const updatedSubs = state.subscriptions.map(sub => {
          const price = getPlanPrice(sub.deviceType, sub.plan, newBillingModel);
          return {
            ...sub,
            billingModel: newBillingModel,
            price,
            firstMonthFree: newBillingModel === '36M',
            billedMonths: newBillingModel === '36M' ? 35 : undefined,
            upfrontCost: newBillingModel === '36M' ? 0 : undefined,
            totalContractCost: newBillingModel === '36M' ? price * 35 : undefined
          };
        });
        return { subscriptions: updatedSubs };
      }),
      updateAddOn: (key, quantity, deviceType = null) => set((state) => {
        const safeQty = Math.max(0, quantity);
        
        // Nested add-on (panicButton has vehicle/person sub-counts)
        if (key === 'panicButton' && deviceType) {
          console.log(`[Store] setAddOnQuantity panicButton.${deviceType} = ${safeQty}`);
          return {
            addOns: {
              ...state.addOns,
              panicButton: {
                ...(typeof state.addOns.panicButton === 'object' ? state.addOns.panicButton : { vehicle: state.addOns.panicButton || 0, person: 0 }),
                [deviceType]: safeQty,
              },
            }
          };
        }
        
        // Flat add-on (immobilizer, driverRecorder, etc.) — unchanged behavior
        console.log(`[Store] setAddOnQuantity ${key} = ${safeQty}`);
        return {
          addOns: { ...state.addOns, [key]: safeQty }
        };
      }),
      setCustomer: (customerData) => set((state) => ({
        customer: { ...state.customer, ...customerData }
      })),
      setCompliance: (key, value) => set((state) => ({
        compliance: { ...state.compliance, [key]: value }
      })),
      setPayment: (paymentData) => set((state) => ({
        payment: { ...state.payment, ...paymentData }
      })),
      setLead: (leadData) => set((state) => ({
        lead: { ...state.lead, ...leadData, capturedAt: new Date().toISOString(), skipped: false }
      })),
      skipLeadCapture: () => set((state) => ({
        lead: { ...initialState.lead, skipped: true, capturedAt: new Date().toISOString() }
      })),
      setCurrentDeviceIdx: (idx) => set({ currentDeviceIdx: idx }),
      reset: () => set(initialState)
    }),
    {
      name: 'selftrack-checkout-storage',
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        
        // Migrate panicButton from old number format to new object format
        if (state.addOns && typeof state.addOns.panicButton === 'number') {
          const val = isNaN(state.addOns.panicButton) ? 0 : state.addOns.panicButton;
          console.warn(
            "[Store Migration] Old panicButton format detected. Converting from", 
            val, 
            "to { vehicle: N, person: 0 }"
          );
          state.addOns.panicButton = {
            vehicle: val,
            person: 0,
          };
        }
        
        // Defensive: ensure both keys exist even if partially set
        if (state.addOns && typeof state.addOns.panicButton === 'object') {
          if (typeof state.addOns.panicButton.vehicle !== 'number' || isNaN(state.addOns.panicButton.vehicle)) {
            state.addOns.panicButton.vehicle = 0;
          }
          if (typeof state.addOns.panicButton.person !== 'number' || isNaN(state.addOns.panicButton.person)) {
            state.addOns.panicButton.person = 0;
          }
        }
      },
    }
  )
);
