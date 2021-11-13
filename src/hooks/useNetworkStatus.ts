import { NetworkContext } from 'contexts/NetworkContext.js';
import createUseContext from 'hooks/createUseContext';

/**
 * Subscribe to network status.
 * Value is retrieved from local storage initially and updated by service worker firing events
 *
 * @returns whether the network is online or not
 */
const useNetworkStatus = createUseContext('NetworkStatus', NetworkContext);

export default useNetworkStatus;
