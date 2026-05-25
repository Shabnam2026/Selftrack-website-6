import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PERSON_PLANS } from '../config/personPricing';

export interface PersonHardware {
  quantity: number;
}

export interface PersonSubscription {
  plan: string | null;
  billingModel: string | null;
  price: number | null;
}

export interface PersonAddOns {
  panicButton: number;
  extendedBattery: number;
}

export interface PersonLead {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  idNumber: string;
  postalCode: string;
  cityProvince: string;
  address: string;
  capturedAt: string | null;
  skipped: boolean;
}

export interface PersonPayment {
  method: string | null;
  agreedToTerms: boolean;
}

export interface PersonCompliance {
  acknowledgeAccuracy: boolean;
  agreeTerms: boolean;
  ficaConsent?: boolean;
  contractTermsAccepted?: boolean;
}

export interface PersonCheckoutState {
  currentStep: number;
  hardware: PersonHardware;
  subscription: PersonSubscription;
  addOns: PersonAddOns;
  lead: PersonLead;
  compliance: PersonCompliance;
  payment: PersonPayment;
  orderNumber: string | null;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  setHardwareQuantity: (qty: number) => void;
  setSubscription: (sub: PersonSubscription) => void;
  setBillingForSubscription: (billingModel: string) => void;
  isBillingSet: () => boolean;
  setAddOnQuantity: (addOnKey: keyof PersonAddOns, qty: number) => void;
  
  setLead: (leadData: Partial<PersonLead>) => void;
  skipLead: () => void;
  
  setCompliance: (key: keyof PersonCompliance, value: boolean) => void;
  
  setPayment: (paymentData: Partial<PersonPayment>) => void;
  
  generateOrderNumber: () => string;
  reset: () => void;
  freshStart: () => void;
  
  getOnceOffTotal: () => number;
  getMonthlyTotal: () => number;
}

const initialState = {
  currentStep: 1,
  
  hardware: {
    quantity: 1,
  },
  
  subscription: {
    plan: null,
    billingModel: null,
    price: null,
  },
  
  addOns: {
    panicButton: 0,
    extendedBattery: 0,
  },
  
  lead: {
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    idNumber: "",
    postalCode: "",
    cityProvince: "",
    address: "",
    capturedAt: null,
    skipped: false,
  },
  
  compliance: {
    acknowledgeAccuracy: false,
    agreeTerms: false,
    ficaConsent: false,
    contractTermsAccepted: false,
  },
  
  payment: {
    method: null,
    agreedToTerms: false,
  },
  
  orderNumber: null,
};

const usePersonCheckoutStore = create<PersonCheckoutState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Navigation
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set(state => ({ 
        currentStep: Math.min(state.currentStep + 1, 7) 
      })),
      prevStep: () => set(state => ({ 
        currentStep: Math.max(state.currentStep - 1, 1) 
      })),
      
      // Hardware
      setHardwareQuantity: (qty) => set({ 
        hardware: { quantity: Math.max(1, Math.min(10, qty)) } 
      }),
      
      // Subscription
      setSubscription: (sub) => set({ 
        subscription: { ...sub } 
      }),
      setBillingForSubscription: (billingModel) => set((state) => {
        if (!["Annual", "Monthly", "36M", "annual", "monthly"].includes(billingModel)) {
          console.warn("[PersonStore] Invalid billing model:", billingModel);
          return state;
        }

        const mappedBillingModel = billingModel === 'Annual' ? 'annual' : billingModel === 'Monthly' ? 'monthly' : billingModel;
        
        if (!state.subscription?.plan) return state; // No plan picked yet
        
        // Look up new price from PERSON_PLANS
        const plan = PERSON_PLANS.find((p: any) => p.id === state.subscription.plan);
        
        if (!plan) return state;
        
        const newPrice = (plan.prices as any)[mappedBillingModel === 'Annual' || mappedBillingModel === 'annual' ? 'Annual' : mappedBillingModel === 'Monthly' || mappedBillingModel === 'monthly' ? 'Monthly' : mappedBillingModel];
        
        console.log("[PersonStore] Billing set:", { billingModel: mappedBillingModel, newPrice });
        
        return {
          subscription: {
            ...state.subscription,
            billingModel: mappedBillingModel,
            price: newPrice,
          }
        };
      }),
      
      isBillingSet: () => {
        const state = get();
        return state.subscription?.billingModel && 
               ["Annual", "Monthly", "36M", "annual", "monthly"].includes(state.subscription.billingModel);
      },
      
      // Add-ons
      setAddOnQuantity: (addOnKey, qty) => set(state => {
        const maxQty = state.hardware.quantity;
        return {
          addOns: {
            ...state.addOns,
            [addOnKey]: Math.max(0, Math.min(maxQty, qty))
          }
        };
      }),
      
      // Lead capture
      setLead: (leadData) => set((state) => ({
        lead: { 
          ...state.lead,
          ...leadData, 
          capturedAt: new Date().toISOString(),
          skipped: false 
        }
      })),
      
      skipLead: () => set(state => ({
        lead: { 
          ...state.lead, 
          skipped: true, 
          capturedAt: new Date().toISOString() 
        }
      })),
      
      setCompliance: (key, value) => set((state) => ({
        compliance: { ...state.compliance, [key]: value }
      })),
      
      // Payment
      setPayment: (paymentData) => set((state) => ({ 
        payment: { ...state.payment, ...paymentData } 
      })),
      
      // Order
      generateOrderNumber: () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < 6; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const orderNumber = `SLF-P-${id}`;
        set({ orderNumber });
        return orderNumber;
      },
      
      // Reset
      reset: () => set(initialState),
      freshStart: () => set({
        currentStep: 1,
        hardware: {
          quantity: 1,
        },
        subscription: {
          plan: null,
          billingModel: null,
          price: null,
        },
        addOns: {
          panicButton: 0,
          extendedBattery: 0,
        },
        lead: {
          firstName: "",
          surname: "",
          email: "",
          phone: "",
          idNumber: "",
          postalCode: "",
          cityProvince: "",
          address: "",
          capturedAt: null,
          skipped: false,
        },
        compliance: {
          acknowledgeAccuracy: false,
          agreeTerms: false,
        },
        payment: {
          method: null,
          agreedToTerms: false,
        },
        orderNumber: null,
      }),
      
      // Computed selectors
      getOnceOffTotal: () => {
        const state = get();
        
        const billingPlan = state.subscription?.billingModel || 'Annual';
        if (billingPlan === '36M' || billingPlan === '36-Month' || billingPlan.toLowerCase().includes('36')) {
          return 0;
        }

        const HARDWARE_PRICE = 2895;  // Person tracker (Mini Queclink GL320MG)
        
        let total = state.hardware.quantity * HARDWARE_PRICE;
        
        // Add-on once-off
        total += (state.addOns.panicButton || 0) * 0;  // explicitly R0
        total += (state.addOns.extendedBattery || 0) * 399;
        
        // Subscription upfront
        if (state.subscription?.price) {
          if (state.subscription.billingModel === "Annual" || state.subscription.billingModel === "annual") {
            total += state.subscription.price * 12;
          } else if (state.subscription.billingModel === "Monthly" || state.subscription.billingModel === "monthly") {
            total += state.subscription.price; // First month
          }
          // 36M: R0 upfront
        }
        
        console.log("[PersonStore] getOnceOffTotal:", total);
        return total;
      },
      
      getMonthlyTotal: () => {
        const state = get();
        let total = 0;
        
        // Subscription recurring
        if (state.subscription?.price) {
          if (state.subscription.billingModel === "Monthly" || 
              state.subscription.billingModel === "monthly" ||
              state.subscription.billingModel === "36M" ||
              state.subscription.billingModel === "36m") {
            total += state.subscription.price;
          }
        }
        
        // Panic Button monthly — conditional on plan
        const personPlan = state.subscription?.plan;
        const panicMonthly = personPlan === "ADVANCED" ? 0 : 16;
        total += (state.addOns.panicButton || 0) * panicMonthly;
        
        // Extended Battery monthly
        total += (state.addOns.extendedBattery || 0) * 59;
        
        console.log("[PersonStore] getMonthlyTotal:", {
          personPlan,
          panicQty: state.addOns.panicButton || 0,
          panicMonthly,
          total,
        });

        return total;
      },
    }),
    {
      name: 'selftrack-person-checkout',
      onRehydrateStorage: () => (state: any) => {
        if (state?.subscription?.plan === "BASIC") {
          console.log("[PersonStore] Migrating BASIC → STARTER");
          state.subscription.plan = "STARTER";
        }
      },
      partialize: (state) => ({
        currentStep: state.currentStep < 7 ? state.currentStep : 1,
        hardware: state.hardware,
        subscription: state.subscription,
        addOns: state.addOns,
        lead: state.lead,
        payment: {
          method: state.payment?.method || null,
          agreedToTerms: false,
        },
        // orderNumber is not persisted
      } as any),
    }
  )
);

export default usePersonCheckoutStore;
