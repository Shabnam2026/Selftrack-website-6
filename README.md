# Selftrack Multi-Step Checkout

This is a modern, responsive, multi-step checkout experience built with React, Vite, and Tailwind CSS. It allows users to select tracking hardware (vehicles, motorbikes, personal trackers), assign subscription plans, include optional add-ons, and process payment information in an intuitive 6-step flow.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

## Folder Structure

- `src/` — Main source code directory.
  - `components/` — Reusable, modular UI components (e.g. `CartSidebar`, `PaymentSummaryCard`, `DeviceCard`).
  - `store/` — Zustand state management (`useCheckoutStore.ts`).
  - `config/` — Static application data and pricing maps (`pricing.ts`).
  - `Step1.tsx` to `Step6.tsx` — The main views for each phase of the checkout flow.
  - `App.tsx` — Application shell containing the global header, progress bar, multi-step router, and footer navigation.
  - `main.tsx` — React entry point.

## Notes & Assumptions

- **Mock Data / Production-Ready Setup:** The checkout process is currently frontend-only. The pricing configuration is fully separated in `pricing.ts`, making it straightforward to connect to a real backend.
- **Zustand Persistence:** User progress is automatically preserved to `localStorage` through `zustand/middleware`'s `persist`, ensuring the cart state isn't lost on refresh.
- **Handling 36-Month Contracts:** A robust configuration handles calculating 36-month tracking contracts which require additional manual application steps instead of an immediate upfront payment. 
