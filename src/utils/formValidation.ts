/**
 * Validation rules for Step 4 form fields.
 * Returns { valid: boolean, error: string | null }
 */

export function validateFirstName(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "First name is required" };
  }
  if (value.trim().length < 2) {
    return { valid: false, error: "First name must be at least 2 characters" };
  }
  return { valid: true, error: null };
}

export function validateSurname(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "Surname is required" };
  }
  if (value.trim().length < 2) {
    return { valid: false, error: "Surname must be at least 2 characters" };
  }
  return { valid: true, error: null };
}

export function validateEmail(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "Email is required" };
  }
  // Standard email regex (requires text@domain.tld)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return { valid: false, error: "Please enter a valid email (e.g. name@example.com)" };
  }
  return { valid: true, error: null };
}

export function validatePostalCode(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "Postal code is required" };
  }
  // SA postal codes are exactly 4 digits
  if (!/^\d{4}$/.test(value.trim())) {
    return { valid: false, error: "Postal code must be 4 digits (e.g. 8001)" };
  }
  return { valid: true, error: null };
}

export function validateCityProvince(value: any) {
  // Optional field — always valid (empty or filled)
  return { valid: true, error: null };
}

export function validatePhone(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "Phone number is required" };
  }
  // After +27 prefix, expect 9 digits
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length < 9 || cleaned.length > 10) {
    return { valid: false, error: "Phone number should be 9-10 digits" };
  }
  return { valid: true, error: null };
}

export function validateIdNumber(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "ID/Passport number is required" };
  }
  if (value.trim().length < 6) {
    return { valid: false, error: "ID/Passport number too short" };
  }
  return { valid: true, error: null };
}

export function validateAddress(value: any) {
  if (!value || !value.trim()) {
    return { valid: false, error: "Address is required" };
  }
  if (value.trim().length < 5) {
    return { valid: false, error: "Please enter a complete address" };
  }
  return { valid: true, error: null };
}

/**
 * Validate ALL Step 4 form fields at once.
 * Returns { valid: boolean, errors: { fieldKey: errorMsg } }
 */
export function validateAllFields(details: any) {
  const errors: Record<string, string> = {};
  
  const firstName = validateFirstName(details?.firstName);
  if (!firstName.valid && firstName.error) errors.firstName = firstName.error;
  
  const surname = validateSurname(details?.surname);
  if (!surname.valid && surname.error) errors.surname = surname.error;
  
  const email = validateEmail(details?.email);
  if (!email.valid && email.error) errors.email = email.error;
  
  const postalCode = validatePostalCode(details?.postalCode);
  if (!postalCode.valid && postalCode.error) errors.postalCode = postalCode.error;
  
  const phone = validatePhone(details?.phone);
  if (!phone.valid && phone.error) errors.phone = phone.error;
  
  const idNumber = validateIdNumber(details?.idNumber);
  if (!idNumber.valid && idNumber.error) errors.idNumber = idNumber.error;
  
  const address = validateAddress(details?.address);
  if (!address.valid && address.error) errors.address = address.error;
  
  // cityProvince is optional — skip
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Friendly field labels for error summary
export const FIELD_LABELS: Record<string, string> = {
  firstName: "First Name",
  surname: "Surname",
  email: "Email Address",
  postalCode: "Postal Code",
  phone: "Phone Number",
  idNumber: "ID/Passport Number",
  address: "Address",
};
