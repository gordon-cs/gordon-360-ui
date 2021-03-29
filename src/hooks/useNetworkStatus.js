import { useContext } from 'react';
import { NetworkContext } from '../contexts/NetworkContext.js';

/**
 * Custom hook to subscribe to network status.
 *
 * Value is retrieved from local storage initially and updated by service worker firing events
 *
 * Can be used by any functional component under the NetworkContextProvider in App.js
 *
 * @returns {boolean} true if connected to the network, false otherwise.
 */
const useNetworkStatus = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error(`useNetworkStatus must be called within NetworkContextProvider`);
  }

  return context;
};
export default useNetworkStatus;
