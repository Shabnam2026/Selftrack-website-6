import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssetDetails {
  quantity: string;
  useType: string;
  approximateValue: string;
  hasExistingTracking: boolean | null;
  requiresRecovery: boolean | string | null;
  mainLocation: string;
  requiresPower: boolean | string | null;
}

interface ContactInfo {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  cityProvince: string;
  preferredContact: string;
  urgency: string;
}

interface LeadFunnelState {
  currentStep: number;
  assetTypes: string[];
  customAssetDescription: string;
  assetDetails: AssetDetails;
  contactInfo: ContactInfo;
  submittedAt: string | null;
  leadId: string | null;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleAssetType: (slug: string) => void;
  setAssetTypes: (slugs: string[]) => void;
  setCustomDescription: (text: string) => void;
  setAssetDetail: <K extends keyof AssetDetails>(field: K, value: AssetDetails[K]) => void;
  setContactInfo: <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => void;
  submitLead: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  assetTypes: [],
  customAssetDescription: "",
  assetDetails: {
    quantity: "",
    useType: "",
    approximateValue: "",
    hasExistingTracking: null,
    requiresRecovery: null,
    mainLocation: "",
    requiresPower: null,
  },
  contactInfo: {
    name: "",
    companyName: "",
    phone: "",
    email: "",
    cityProvince: "",
    preferredContact: "",
    urgency: "",
  },
  submittedAt: null,
  leadId: null,
};

export const useLeadFunnelStore = create<LeadFunnelState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      
      toggleAssetType: (slug) => set((state) => {
        if (state.assetTypes.includes(slug)) {
          return { assetTypes: state.assetTypes.filter(type => type !== slug) };
        } else {
          return { assetTypes: [...state.assetTypes, slug] };
        }
      }),

      setAssetTypes: (slugs) => set({ assetTypes: slugs }),

      setCustomDescription: (text) => set({ customAssetDescription: text }),

      setAssetDetail: (field, value) => set((state) => ({
        assetDetails: { ...state.assetDetails, [field]: value }
      })),

      setContactInfo: (field, value) => set((state) => ({
        contactInfo: { ...state.contactInfo, [field]: value }
      })),

      submitLead: () => {
        const state = get();
        const generateId = () => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let result = "";
          for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return `SLF-LEAD-${result}`;
        };
        const leadId = generateId();
        const submittedAt = new Date().toISOString();

        const leadData = {
          ...state,
          leadId,
          submittedAt,
        };

        console.log("[LEAD_SUBMITTED]", leadData);

        // Save to local storage for demo
        const existingLeadsStr = localStorage.getItem("selftrack_leads");
        const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
        existingLeads.push(leadData);
        localStorage.setItem("selftrack_leads", JSON.stringify(existingLeads));

        set({ leadId, submittedAt });
      },

      reset: () => set(initialState),
    }),
    {
      name: 'selftrack_lead_funnel',
    }
  )
);
