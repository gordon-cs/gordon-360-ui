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
 * @return {string} 'online' if connected to the network, 'offline' otherwise.
 */
export const useNetworkStatus = () => {
  const context = useContext(NetworkConext);
  if (context === undefined) {
    throw new Error(`useNetworkStatus must be called within NetworkContextProvider`);
  }

  return context;
};

const NetworkContextProvider = (props) => {
  const [networkStatus, setNetworkStatus] = useState('online');

  useEffect(() => {
    // Retrieve network status from local storage or default to online
    try {
      setNetworkStatus(storage.get('network-status'));
    } catch (error) {
      setNetworkStatus('online');
    }

    /* Used to re-render the page when the network connection changes.
     * The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', updateNetworkStatus);

    return () => window.removeEventListener('message', updateNetworkStatus);
  }, []);

  const updateNetworkStatus = (event) => {
    setNetworkStatus((prevStatus) => {
      if (
        event.origin === window.location.origin &&
        (event.data === 'online' || event.data === 'offline')
      ) {
        return event.data;
      }
      return prevStatus;
    });
  };

  return <NetworkConext.Provider value={networkStatus}>{props.children}</NetworkConext.Provider>;
};

export default NetworkContextProvider;
