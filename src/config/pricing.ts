export const pricingData = {
  hardware: {
    vehicle: 1895,
    motorbike: 2295,
    person: 2895,
    backupTracker: 2795
  },
  deviceModels: {
    vehicle: "MOBI_FMC920",
    motorbike: "BIKER_FTC881",
    person: "MINI_QUECLINK_GL320MG",
    backupTracker: "BACKUP_TAT240"
  },
  subscriptions: {
    vehicle: {
      STARTER: { annual: 102, monthly: 120, "36M": 196 },
      RECOVERY: { annual: 132, monthly: 155, "36M": 231 },
      ADVANCED: { annual: 191, monthly: 225, "36M": 301 },
      PREMIUM: { annual: 213, monthly: 250, "36M": 326 }
    },
    motorbike: {
      STARTER: { annual: 102, monthly: 120, "36M": 212 },
      ADVANCED: { annual: 191, monthly: 225, "36M": 317 }
    },
    person: {
      STARTER: { annual: 102, monthly: 120, "36M": 236 },
      ADVANCED: { annual: 165, monthly: 195, "36M": 310 }
    },
    backupTracker: { annual: 38, monthly: 45, "36M": 175 }
  },
  addOns: {
    panicButton: { onceOff: 195, monthly: 16 },
    immobilizer: { onceOff: 80, monthly: 16 },
    driverRecorder: { onceOff: 899, monthly: 129 }, // PRICE TBC - placeholder until client provides
    backupTracker: { onceOff: 2795 }, // monthly pulled from subscriptions.backupTracker because it varies by billing model
    extendedBattery: { onceOff: 399, monthly: 59 }
  },
  highRiskVehicles: [
    "Toyota Prado",
    "Toyota Fortuner",
    "Toyota Hilux",
    "Ford Ranger",
    "Nissan NP200",
    "VW Polo"
  ],
  vehicleBrandsAndModels: [
    { brand: "Toyota", models: ["Prado", "Fortuner", "Hilux", "Corolla", "Yaris", "RAV4", "Camry"] },
    { brand: "Ford", models: ["Ranger", "Everest", "EcoSport", "Fiesta", "Focus", "Mustang"] },
    { brand: "Volkswagen", models: ["Polo", "Golf", "Tiguan", "Amarok", "T-Cross", "Touareg"] },
    { brand: "Nissan", models: ["NP200", "Navara", "X-Trail", "Qashqai", "Almera", "Micra"] },
    { brand: "BMW", models: ["3 Series", "X3", "1 Series", "X5", "C-Class", "5 Series"] },
    { brand: "Mercedes-Benz", models: ["C-Class", "GLC", "A-Class", "GLE", "E-Class"] },
    { brand: "Audi", models: ["A4", "Q5", "A3", "Q3", "A6"] },
    { brand: "Hyundai", models: ["Tucson", "i20", "Venue", "Creta", "Grand i10"] },
    { brand: "Kia", models: ["Sportage", "Rio", "Seltos", "Picanto", "Sonet"] },
    { brand: "Suzuki", models: ["Swift", "Jimny", "Vitara", "Ertiga", "Baleno"] }
  ]
};

export const get36MTotals = (monthlyPrice: number) => ({
  upfront: 0,
  monthlyPrice: monthlyPrice,
  billedMonths: 35,
  freeMonths: 1,
  totalContract: monthlyPrice * 35
});

export const getPlanPrice = (deviceType: 'vehicle' | 'motorbike' | 'person', planName: string, billingModel: 'annual' | 'monthly' | '36M') => {
  const plans = pricingData.subscriptions[deviceType] as Record<string, { annual: number; monthly: number; "36M": number }>;
  const plan = plans[planName];
  if (!plan) return 0;
  return plan[billingModel];
};

const VEHICLE_STARTER_FEATURES = [
  "Real-Time Tracking",
  "Web UI & Mobile App",
  "GPS Signal Monitoring",
  "SIM Selftrack",
];

const VEHICLE_RECOVERY_FEATURES = [
  ...VEHICLE_STARTER_FEATURES,
  "Stolen Vehicle Recovery",
  "Insurance Approved",
  "Movement Alerts",
];

const VEHICLE_ADVANCED_FEATURES = [
  ...VEHICLE_RECOVERY_FEATURES,
  "Trip History",
  "Reports",
  "SARS Logbook",
  "Geofencing",
  "My Places",
  "Immobilisation",
  "Ignition Sensor",
  "Beacon Management",
  "Battery Tamper Alerts",
  "Crash Detection",
  "Towing Alerts",
  "Jamming Detection",
  "Panic Alerts",
  "Battery Level Monitoring",
  "Speed Monitoring",
  "Excessive Idling",
];

const VEHICLE_PREMIUM_FEATURES = [
  ...VEHICLE_ADVANCED_FEATURES,
  "Tilt Detection",
  "Driving Behaviour Monitoring",
  "Driver ID Management",
  "Service Reminders",
  "Car Licence Renewal Reminders",
  "Driver's Licence Reminders",
  "Dashboard",
];

export const VEHICLE_PLANS = [
  {
    id: "STARTER",
    name: "STARTER",
    tagline: "Essential Tracking",
    prices: { Annual: 102, Monthly: 120, "36M": 196 },
    features: VEHICLE_STARTER_FEATURES,
  },
  {
    id: "RECOVERY",
    name: "RECOVERY",
    tagline: "Full Protection",
    prices: { Annual: 132, Monthly: 155, "36M": 231 },
    features: VEHICLE_RECOVERY_FEATURES,
  },
  {
    id: "ADVANCED",
    name: "ADVANCED",
    tagline: "Live Tracking",
    prices: { Annual: 191, Monthly: 225, "36M": 301 },
    isRecommended: true,
    features: VEHICLE_ADVANCED_FEATURES,
  },
  {
    id: "PREMIUM",
    name: "PREMIUM",
    tagline: "Total Control",
    prices: { Annual: 213, Monthly: 250, "36M": 326 },
    features: VEHICLE_PREMIUM_FEATURES,
  },
];

const MOTORBIKE_STARTER_FEATURES = [
  "Real-Time Tracking",
  "Web UI & Mobile App",
  "GPS Signal Monitoring",
  "SIM Selftrack",
];

const MOTORBIKE_ADVANCED_FEATURES = [
  ...MOTORBIKE_STARTER_FEATURES,
  "Stolen Vehicle Recovery",
  "Insurance Approved",
  "Movement Alerts",
  "Trip History",
  "Reports",
  "SARS Logbook",
  "Geofencing",
  "My Places",
  "Immobilisation",
  "Ignition Sensor",
  "Beacon Management",
  "Battery Tamper Alerts",
  "Crash Detection",
  "Towing Alerts",
  "Jamming Detection",
  "Panic Alerts",
  "Battery Level Monitoring",
  "Speed Monitoring",
  "Excessive Idling",
];

export const MOTORBIKE_PLANS = [
  {
    id: "STARTER",
    name: "STARTER",
    tagline: "Essential Tracking",
    prices: { Annual: 102, Monthly: 120, "36M": 212 },
    features: MOTORBIKE_STARTER_FEATURES,
  },
  {
    id: "ADVANCED",
    name: "ADVANCED",
    tagline: "Live Tracking",
    prices: { Annual: 191, Monthly: 225, "36M": 317 },
    isRecommended: true,
    features: MOTORBIKE_ADVANCED_FEATURES,
  },
];

export const BACKUP_TRACKER_FEATURES = [
  "Real-Time Tracking",
  "Web UI & Mobile App",
  "GPS Signal Monitoring",
  "SIM Selftrack",
  "Stolen Vehicle Recovery",
];
