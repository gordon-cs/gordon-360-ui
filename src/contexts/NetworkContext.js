import React, { createContext, useState, useEffect, useContext } from 'react';
import storage from '../services/storage';

const NetworkConext = createContext();

/**
 * Custom hook to subscribe to network status.
 *
 * Value is retrieved from local storage initially and updated by service worker firing events
 *
 * Can be used by any functional component under the NetworkContextProvider in App.js
 *
 * @returns {boolean} true if connected to the network, false otherwise.
 */
export const useNetworkStatus = () => {
  const context = useContext(NetworkConext);
  if (context === undefined) {
    throw new Error(`useNetworkStatus must be called within NetworkContextProvider`);
  }

  return context;
};

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

  return <NetworkConext.Provider value={isOnline}>{children}</NetworkConext.Provider>;
};

export default NetworkContextProvider;
