import Providers from 'components/Providers';
import { register } from 'pwa';
import { createRoot } from 'react-dom/client';
import App from './app';
import './app.global.css';
import { AuthenticationResult, EventType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'services/authConfig';

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // This updates account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    console.log('MSAL Event');
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      console.log(`Login Success event, setting active account to ${account.username}`);
      msalInstance.setActiveAccount(account);
    }
  });

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(
    <Providers msalInstance={msalInstance}>
      <App />
    </Providers>,
  );

  register();
});
