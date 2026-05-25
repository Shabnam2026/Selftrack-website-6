import React, { useState, useEffect } from 'react';
import { AlertCircle, FileCheck } from 'lucide-react';
import usePersonCheckoutStore from '../../store/usePersonCheckoutStore';
import { 
  validateFirstName, 
  validateSurname, 
  validateEmail, 
  validatePostalCode, 
  validatePhone, 
  validateIdNumber, 
  validateAddress 
} from '../../utils/formValidation';

export function PersonComplianceSection() {
  const compliance = usePersonCheckoutStore(s => s.compliance);
  const setCompliance = usePersonCheckoutStore(s => s.setCompliance);
  
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-6 mt-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-lg">Compliance & Agreements</h3>
      </div>
      
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={compliance?.acknowledgeAccuracy || false}
            onChange={(e) => setCompliance('acknowledgeAccuracy', e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I confirm the information provided is accurate
          </span>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
          <input
            type="checkbox"
            checked={compliance?.agreeTerms || false}
            onChange={(e) => setCompliance('agreeTerms', e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to the{' '}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Terms & Conditions
            </a>
            {' '}and{' '}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-emerald-600 hover:text-emerald-700 underline font-medium"
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
    </div>
  );
}

export function PersonCustomerInfoForm() {
  const lead = usePersonCheckoutStore(s => s.lead);
  const setLead = usePersonCheckoutStore(s => s.setLead);
  const [visited, setVisited] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleAttempt = () => {
      setVisited({
        firstName: true,
        surname: true,
        email: true,
        phone: true,
        idNumber: true,
        postalCode: true,
        address: true,
      });
    };
    window.addEventListener('checkout-validation-failed', handleAttempt);
    return () => {
      window.removeEventListener('checkout-validation-failed', handleAttempt);
    };
  }, []);

  const handleBlur = (field: string) => {
    setVisited(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: string) => {
    const value = lead[field as keyof typeof lead] || '';
    if (field === 'firstName') return validateFirstName(value).error;
    if (field === 'surname') return validateSurname(value).error;
    if (field === 'email') return validateEmail(value).error;
    if (field === 'phone') return validatePhone(value).error;
    if (field === 'idNumber') return validateIdNumber(value).error;
    if (field === 'postalCode') return validatePostalCode(value).error;
    if (field === 'address') return validateAddress(value).error;
    return null;
  };

  const getInputClassName = (field: string) => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const value = lead[field as keyof typeof lead] || '';
    
    if (field === 'cityProvince') {
      return `${baseClasses} border-gray-300 focus:ring-emerald-500`;
    }

    const hasVisited = visited[field];
    const errorMsg = getFieldError(field);

    if (hasVisited) {
      if (errorMsg) {
        return `${baseClasses} border-red-500 focus:ring-red-500 bg-red-50 text-red-950`;
      } else if (value) {
        return `${baseClasses} border-emerald-500 focus:ring-emerald-500`;
      }
    }
    return `${baseClasses} border-gray-300 focus:ring-emerald-500`;
  };

  return (
    <div className="space-y-4">
      {/* ROW 1: First Name | Surname */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={lead?.firstName || ''}
            onChange={(e) => setLead({ firstName: e.target.value })}
            onBlur={() => handleBlur('firstName')}
            className={getInputClassName('firstName')}
            required
          />
          {visited.firstName && getFieldError('firstName') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('firstName')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="surname"
            value={lead?.surname || ''}
            onChange={(e) => setLead({ surname: e.target.value })}
            onBlur={() => handleBlur('surname')}
            className={getInputClassName('surname')}
            required
          />
          {visited.surname && getFieldError('surname') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('surname')}
            </p>
          )}
        </div>
      </div>
      
      {/* ROW 2: Email | Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={lead?.email || ''}
            onChange={(e) => setLead({ email: e.target.value })}
            onBlur={() => handleBlur('email')}
            className={getInputClassName('email')}
            required
          />
          {visited.email && getFieldError('email') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('email')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={lead?.postalCode || ''}
            onChange={(e) => setLead({ postalCode: e.target.value })}
            onBlur={() => handleBlur('postalCode')}
            placeholder="e.g. 7700"
            maxLength={4}
            className={getInputClassName('postalCode')}
            required
          />
          {visited.postalCode && getFieldError('postalCode') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('postalCode')}
            </p>
          )}
        </div>
      </div>
      
      {/* ROW 3: City/Province | Phone | ID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            City/Province
          </label>
          <input
            type="text"
            name="cityProvince"
            value={lead?.cityProvince || ''}
            onChange={(e) => setLead({ cityProvince: e.target.value })}
            placeholder="e.g. Cape Town, WC"
            className={getInputClassName('cityProvince')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700">
              +27
            </span>
            <input
               type="tel"
               name="phone"
               value={lead?.phone || ''}
               onChange={(e) => setLead({ phone: e.target.value.replace(/\D/g, '').slice(0, 9) })}
               onBlur={() => handleBlur('phone')}
               placeholder="712345678"
               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
               required
            />
          </div>
          {visited.phone && getFieldError('phone') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('phone')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            ID / Passport Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="idNumber"
            value={lead?.idNumber || ''}
            onChange={(e) => setLead({ idNumber: e.target.value })}
            onBlur={() => handleBlur('idNumber')}
            className={getInputClassName('idNumber')}
            required
          />
          {visited.idNumber && getFieldError('idNumber') && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {getFieldError('idNumber')}
            </p>
          )}
        </div>
      </div>
      
      {/* ROW 4: Address (full width) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={lead?.address || ''}
          onChange={(e) => setLead({ address: e.target.value })}
          onBlur={() => handleBlur('address')}
          placeholder="Street address (e.g. 12 Main Road, Sea Point)"
          rows={2}
          className={`${getInputClassName('address')} resize-none`}
          required
        />
        {visited.address && getFieldError('address') && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {getFieldError('address')}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PersonStep4ContactDetails() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Contact Details</h1>
        <p className="text-gray-600 text-sm">
          Please provide your details so we can deliver and install your tracker.
        </p>
      </div>

      <div className="mt-4">
        <PersonCustomerInfoForm />
      </div>
      
      <PersonComplianceSection />
    </div>
  );
}
