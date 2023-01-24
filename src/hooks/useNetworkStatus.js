import { NetworkContext } from 'contexts/NetworkContext';
import createUseContext from 'hooks/createUseContext';

/**
 * Subscribe to network status.
 *
 * Value is retrieved from local storage initially and updated by service worker firing events
 */
const useNetworkStatus = createUseContext('NetworkStatus', NetworkContext);

export default useNetworkStatus;
