export const FEATURES: Record<string, { label: string; description: string }> = {
  "Real-Time Tracking": {
    label: "Real-Time Tracking",
    description: "Live GPS location updates every few seconds, accessible from anywhere."
  },
  "Web UI & Mobile App": {
    label: "Web UI & Mobile App",
    description: "Access your tracking via our web platform and iOS/Android mobile apps."
  },
  "GPS Signal Monitoring": {
    label: "GPS Signal Monitoring",
    description: "Continuous monitoring of GPS signal quality and connectivity status."
  },
  "SIM Selftrack": {
    label: "SIM Selftrack",
    description: "Selftrack-provided SIM card included for reliable connectivity (no separate SIM needed)."
  },
  "Stolen Vehicle Recovery": {
    label: "Stolen Vehicle Recovery",
    description: "24/7 nationwide recovery service with dedicated response teams across South Africa."
  },
  "Insurance Approved": {
    label: "Insurance Approved",
    description: "Insurer-endorsed solution that may qualify you for reduced premiums."
  },
  "Movement Alerts": {
    label: "Movement Alerts",
    description: "Instant alerts when your vehicle moves unexpectedly or outside scheduled hours."
  },
  "Trip History": {
    label: "Trip History",
    description: "Detailed log of all trips including routes, stops, and durations."
  },
  "Reports": {
    label: "Reports",
    description: "Comprehensive reports on vehicle usage, driver behaviour, and analytics."
  },
  "SARS Logbook": {
    label: "SARS Logbook",
    description: "Automated tax-ready logbook compliant with SARS requirements."
  },
  "Geofencing": {
    label: "Geofencing",
    description: "Create virtual boundaries and receive alerts when vehicles enter or exit zones."
  },
  "My Places": {
    label: "My Places",
    description: "Save frequently visited locations as named places for easy reference."
  },
  "Immobilisation": {
    label: "Immobilisation",
    description: "Remotely disable your vehicle's engine in case of theft (where supported)."
  },
  "Ignition Sensor": {
    label: "Ignition Sensor",
    description: "Detects when the vehicle ignition is switched on or off."
  },
  "Beacon Management": {
    label: "Beacon Management",
    description: "Manage Bluetooth beacons for asset tagging and driver identification."
  },
  "Battery Tamper Alerts": {
    label: "Battery Tamper Alerts",
    description: "Notifications when the vehicle battery is disconnected or tampered with."
  },
  "Crash Detection": {
    label: "Crash Detection",
    description: "Automatic accident detection using motion sensors with emergency alerts."
  },
  "Towing Alerts": {
    label: "Towing Alerts",
    description: "Receive alerts if your vehicle is being towed without ignition active."
  },
  "Jamming Detection": {
    label: "Jamming Detection",
    description: "Detects when GPS or communication signals are being deliberately jammed."
  },
  "Panic Alerts": {
    label: "Panic Alerts",
    description: "Emergency button alerts sent instantly to your designated contacts."
  },
  "Battery Level Monitoring": {
    label: "Battery Level Monitoring",
    description: "Track tracker battery levels and receive low-battery notifications."
  },
  "Speed Monitoring": {
    label: "Speed Monitoring",
    description: "Real-time speed tracking with over-speed alerts and reports."
  },
  "Excessive Idling": {
    label: "Excessive Idling",
    description: "Detect and report extended idling periods to reduce fuel waste."
  },
  "Tilt Detection": {
    label: "Tilt Detection",
    description: "Detects when the vehicle is being lifted or tilted (theft attempt indicator)."
  },
  "Driving Behaviour Monitoring": {
    label: "Driving Behaviour Monitoring",
    description: "Track harsh acceleration, braking, and cornering for safer driving."
  },
  "Driver ID Management": {
    label: "Driver ID Management",
    description: "Identify which driver is using the vehicle at any time via RFID or app."
  },
  "Service Reminders": {
    label: "Service Reminders",
    description: "Automated reminders for vehicle service intervals based on mileage or time."
  },
  "Car Licence Renewal Reminders": {
    label: "Car Licence Renewal Reminders",
    description: "Get notified before your vehicle licence disc expires."
  },
  "Driver's Licence Reminders": {
    label: "Driver's Licence Reminders",
    description: "Get notified before your driver's licence expires."
  },
  "Dashboard": {
    label: "Dashboard",
    description: "Premium analytics dashboard with all your fleet data in one view."
  }
};

export const getFeatureByName = (name: string) => {
  const feat = Object.values(FEATURES).find(f => f.label.toLowerCase() === name.toLowerCase());
  return feat ? { description: feat.description } : null;
};
