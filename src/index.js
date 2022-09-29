import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import MomentUtils from '@date-io/moment';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import UserContextProvider from 'contexts/UserContext';
import { register } from 'pwa';
import ReactDOM from 'react-dom';
import { configureMSAL, msalConfig } from 'services/auth';
import App from './app';
import './app.global.css';
import NetworkContextProvider from './contexts/NetworkContext';
import theme from './theme';

export const msalInstance = new PublicClientApplication(msalConfig);
configureMSAL(msalInstance);

const AppWithProviders = () => (
  <MsalProvider instance={msalInstance}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <NetworkContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </NetworkContextProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </MsalProvider>
);

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));

register();
