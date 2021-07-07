import { createContext, useState, useEffect } from 'react';
import storage from 'services/storage';

export const NetworkContext = createContext();

const NetworkContextProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState('online');

  useEffect(() => {
    // Retrieve network status from local storage or default to online
    try {
      const networkStatus = storage.get('network-status');
      setIsOnline(networkStatus === 'online');
    } catch (error) {
      console.error(error);
      setIsOnline(true);
    }

    /* Used to re-render the page when the network connection changes.
     * The origin of the message is checked to prevent cross-site scripting attacks
     */
    const updateNetworkStatus = (event) => {
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
