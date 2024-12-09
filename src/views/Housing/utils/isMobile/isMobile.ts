/**
 * Utility function to check if the user is on a mobile device.
 * @returns {boolean} - True if a mobile device is detected, false otherwise.
 */
export const isMobile = (): boolean => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};
