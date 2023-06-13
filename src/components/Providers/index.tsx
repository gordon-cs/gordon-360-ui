import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import { theme } from 'theme';
import AuthProvider from './components/AuthProvider';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const Providers = ({ children }: { children: JSX.Element }) => (
  <CssVarsProvider theme={theme}>
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <NetworkContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </NetworkContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthProvider>
  </CssVarsProvider>
);

export default Providers;
