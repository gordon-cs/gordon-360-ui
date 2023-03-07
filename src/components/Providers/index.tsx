import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import UserContextProvider from 'contexts/UserContext';
import 'app.global.css';
import NetworkContextProvider from 'contexts/NetworkContext';
import theme from 'theme';
import AuthProvider from './components/AuthProvider';

const Providers = ({ children }: { children: JSX.Element }) => (
  <AuthProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <NetworkContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </NetworkContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </AuthProvider>
);

export default Providers;
