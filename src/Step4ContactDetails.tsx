import React from 'react';
import { CustomerInfoForm } from './components/CustomerInfoForm';
import { ComplianceSection } from './components/ComplianceSection';

export default function Step4ContactDetails() {
  return (
    <div className="flex flex-col gap-8 pb-32">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Contact Details</h1>
        <p className="text-neutral-500">
          Please provide your details so we can deliver and install your tracker.
        </p>
      </div>

      <div className="-mt-8">
        <CustomerInfoForm />
      </div>
      
      <ComplianceSection />
    </div>
  );
}
