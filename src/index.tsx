import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import { register } from 'pwa';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureMSAL, msalConfig } from 'services/auth';
import App from './app.jsx';
import './app.global.css';
import NetworkContextProvider from './contexts/NetworkContext';
import theme from './theme';

export const msalInstance = new PublicClientApplication(msalConfig);
configureMSAL(msalInstance);

const AppWithProviders = () => (
  <MsalProvider instance={msalInstance}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NetworkContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </NetworkContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </MsalProvider>
);

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));

register();
