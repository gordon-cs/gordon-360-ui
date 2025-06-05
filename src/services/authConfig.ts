export const msalConfig = {
  auth: {
    clientId: process.env.VITE_AZURE_AD_CLIENT as string,
    authority: `https://login.microsoftonline.com/${process.env.VITE_AZURE_AD_TENANT}`,
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    validateAuthority: true,
    // After being redirected to the "redirectUri" page, should user
    // be redirected back to the Url where their login originated from?
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
