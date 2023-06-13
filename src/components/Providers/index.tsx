import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import { newTheme } from '../../theme';
import AuthProvider from './components/AuthProvider';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const Providers = ({ children }: { children: JSX.Element }) => (
  <CssVarsProvider theme={newTheme} defaultMode="dark">
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <NetworkContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </NetworkContextProvider>
      </StyledEngineProvider>
    </AuthProvider>
  </CssVarsProvider>
);

export default Providers;
