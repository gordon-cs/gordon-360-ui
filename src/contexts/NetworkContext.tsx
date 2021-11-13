import { Context, createContext, FunctionComponent, useEffect, useState } from 'react';
import storage from 'services/storage';

type NetworkStatus = 'online' | 'offline'

const getInitialNetworkStatus = () => {
  // Retrieve network status from local storage or default to online
  try {
    const networkStatus: NetworkStatus = storage.get('network-status');
    return networkStatus === 'online';
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const NetworkContext: Context<boolean> = createContext(getInitialNetworkStatus());

const NetworkContextProvider: FunctionComponent = ({ children }) => {
  const [isOnline, setIsOnline] = useState(getInitialNetworkStatus);

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     * The origin of the message is checked to prevent cross-site scripting attacks
     */
    const updateNetworkStatus = (event: MessageEvent) => {
      setIsOnline((prevStatus) => {
        if (
          event.origin === window.location.origin &&
          (event.data === 'online' || event.data === 'offline')
        ) {
          return event.data === 'online';
        } else {
          return prevStatus;
        }
      });
    };

    window.addEventListener('message', updateNetworkStatus);

    return () => window.removeEventListener('message', updateNetworkStatus);
  }, []);

  return <NetworkContext.Provider value={isOnline}>{children}</NetworkContext.Provider>;
};

export default NetworkContextProvider;
