import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import { theme360 } from '../../theme';
import AuthProvider from './components/AuthProvider';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const Providers = ({ children }: { children: JSX.Element }) => (
  <AuthProvider>
    <StyledEngineProvider injectFirst>
      <NetworkContextProvider>
        <CssVarsProvider theme={theme360}>
          <UserContextProvider>{children}</UserContextProvider>
        </CssVarsProvider>
      </NetworkContextProvider>
    </StyledEngineProvider>
  </AuthProvider>
);

export default Providers;
