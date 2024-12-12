/**
 * Utility function to determine the staff type based on the building code.
 * @returns {string} - Returns 'RA' for Residence Assistant or 'AC' for Apartment Coordinator based on the building code.
 */
export const staffType = {
  BRO: 'AC',
  CHA: 'RA',
  EVN: 'RA',
  FER: 'RA',
  FUL: 'RA',
  NYL: 'RA',
  TAV: 'AC',
  WIL: 'RA',
  CON: 'AC',
  GRA: 'AC',
  MCI: 'AC',
  RID: 'AC',
};
