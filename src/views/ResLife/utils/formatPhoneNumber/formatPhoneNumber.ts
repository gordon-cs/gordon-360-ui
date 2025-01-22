/**
 * Utility function to format a 10-digit phone number into a readable format.
 * @param {string} phoneNumber - The 10-digit phone number to be formatted.
 * @returns {string} - The formatted phone number, or the original if invalid.
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};
