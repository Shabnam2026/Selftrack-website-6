export const PERSON_HARDWARE_PRICE = 2895;

const PERSON_STARTER_FEATURES = [
  "Real-Time Tracking",
  "Web UI & Mobile App",
  "GPS Signal Monitoring",
  "Battery Level Monitoring",
  "SIM Selftrack",
  "Panic Alerts",
];

const PERSON_ADVANCED_FEATURES = [
  ...PERSON_STARTER_FEATURES,
  "Reports",
  "Geofencing",
  "Speed Monitoring",
  "Trip History",
];

export const PERSON_PLANS = [
  {
    id: "STARTER",
    name: "STARTER",
    tagline: "Essential Safety",
    prices: {
      Annual: 102,
      Monthly: 120,
      "36M": 236,
    },
    features: PERSON_STARTER_FEATURES,
  },
  {
    id: "ADVANCED",
    name: "ADVANCED",
    tagline: "Premium Protection",
    recommended: true,
    prices: {
      Annual: 165,
      Monthly: 195,
      "36M": 310,
    },
    features: PERSON_ADVANCED_FEATURES,
  },
];

export const PERSON_ADDONS = [
  {
    id: "panicButton",
    name: "Panic Button",
    icon: "ShieldAlert",
    description: "Emergency button for instant SOS alerts to designated contacts.",
    builtIn: true,                  
    hardwarePrice: 0,               
    onceOff: 0,
    getMonthlyPrice: (plan: string) => {
      if (plan === "ADVANCED") return 0;
      return 16;
    },
  },
  {
    id: "extendedBattery",
    name: "Extended Battery Life",
    icon: "BatteryCharging",
    description: "Upgrade to a long-life battery for extended tracking performance.",
    onceOff: 399,
    monthly: 59,
  },
];
