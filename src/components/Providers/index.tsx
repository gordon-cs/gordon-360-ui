import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import { newTheme } from '../../theme';
import AuthProvider from './components/AuthProvider';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const Providers = ({ children }: { children: JSX.Element }) => (
  <AuthProvider>
    <StyledEngineProvider injectFirst>
      <NetworkContextProvider>
        <CssVarsProvider theme={newTheme}>
          <UserContextProvider>{children}</UserContextProvider>
        </CssVarsProvider>
      </NetworkContextProvider>
    </StyledEngineProvider>
  </AuthProvider>
);

export default Providers;
