import { StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import { theme360 } from '../../theme';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { useEffect } from 'react';
import analytics from 'services/analytics';
import { BrowserRouter } from 'react-router-dom';

const Providers = ({
  msalInstance,
  children,
}: {
  msalInstance: IPublicClientApplication;
  children: JSX.Element;
}) => {
  useEffect(() => {
    // Only use analytics in production
    if (import.meta.env.NODE_ENV === 'production') {
      analytics.initialize();
    }
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <StyledEngineProvider injectFirst>
        <NetworkContextProvider>
          <CssVarsProvider theme={theme360}>
            <UserContextProvider>
              <BrowserRouter future={{ v7_relativeSplatPath: true }}>{children}</BrowserRouter>
            </UserContextProvider>
          </CssVarsProvider>
        </NetworkContextProvider>
      </StyledEngineProvider>
    </MsalProvider>
  );
};

export default Providers;
