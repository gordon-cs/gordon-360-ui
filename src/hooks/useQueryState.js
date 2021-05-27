import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Custom hook to useState synced with URL query parameters.
 * Inspiration from François Best https://github.com/47ng/next-usequerystate/tree/next/src
 *
 * useQueryState can be used in the place of useState for any variables that should be
 * stored and synced in the url. Supports the use of single value variables, array variables,
 * and boolean variables.
 * -- Single Value Variable: key='key', state/value='theValue' -> URL='&value=theValue'
 * -- Array Variable: key='key', state/value='[one,two]' -> URL='&value=one%2Ctwo'
 * -- Boolean Variable: key='isKeyValue', state/value='true' -> URL='&isKeyValue'
 *
 * Important note on this hook's philosophy: We are making the state value primary and the
 * URL value secondary. Meaning the following:
 * setQueryState sets the state, which updates the URL automatically. Only when the URL is updated
 * *and is out of sync with the state* do we update the state. This is a critical design choice
 * that prevents issues like setting the state unnecessarily after clicking the browser back
 * arrow, preventing you from going forward (and other similar browsing history issues).
 *
 * @param {String} keyParam - key of the QueryState variable
 * @param {String} initial - initial value of the QueryState variable TODO
 * @returns {boolean} true if connected to the network, false otherwise. TODO
 */
function useQueryState(keyParam, initial) {
  const [state, setState] = useState(initial);
  const key = keyParam; // we should never change the particular key once we start using it
  const defaultVal = initial; // so we can go back to it
  // ^^^ NOTE: issue this probably has to be reset on url load
  let history = useHistory();

  /**
   * TODO
   */
  useEffect(() => {
    const setURLParam = async () => {
      console.log('setURLParam', key, state);
      let urlParams = new URLSearchParams(history.location.search);
      console.log("urlParams", urlParams.toString(),
       "key", urlParams.get(key),
       "defaultVal", defaultVal,
       "state", state.toString(), 
       "action", (urlParams.get(key) ?? defaultVal) === state.toString());

      // if the url value is already the same as the state value -> don't set the url again
      if ((urlParams.get(key) ?? defaultVal.toString()) === state.toString()) return;

      // key with no value OR boolean key set to false -> absent from url, push empty
      if (!state || state === '' || state.length === 0 || state === false) urlParams.delete(key);
      // boolean key set to true -> present in url, doesn't need '=value'
      else if (state === true) {
          console.log("boolean");
          urlParams.delete(key);
          urlParams += `&${encodeURIComponent(key)}`;
      } else {
        // value key is present in url with its current value
        urlParams.set(key, state.toString());
      }

      history.push('?' + urlParams);
    };
    setURLParam();
  }, [state]);

  /**
   * Anytime the url is changed, loadURLParams is invoked
   * This function pulls the value of the key from the url
   *   and updates the state with it (if changed)
   */
  useEffect(() => {
    const loadURLParams = async () => {
      const urlParams = new URLSearchParams(history.location.search);
      /*** Boolean Key Logic ***/
      // using boolean key -> load true if present, false if absent from url
      if(defaultVal === true || defaultVal === false) {
          setState(urlParams.has(key));
          return;
      }
      let urlValue = urlParams.get(key);

      /*** Array Key Logic ***/
      // different logic if we are working with an array than with single value
      // because setState will not do deep array comparison
      if (Array.isArray(defaultVal)) {
        // if the same value (or unset and state array is empty) -> do nothing
        // this check is necessary because [] -> [] are different memory objects
        if (urlValue === state.toString() || (!urlValue && state.length === 0)) return;
        else if (!urlValue) setState(defaultVal);
        else setState(urlValue.split(','));
      }
      /*** Single Value Key Logic ***/
      else {
        setState(urlValue ?? defaultVal);
      }
    };
    console.log('loadURLParams', key, history.location.search);
    loadURLParams();
    /*********************** ESLint Disable Justification: *******************************/
    // ESLint wants to include `defaultVal, key, state` as dependencies but to prevent
    // extra loops of ~ url setting state setting the url ~ we do not include.
    // It makes good sense that the only time we should pull the URL is the URL changes
    /*************************************************************************************/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  /**
   * Callback function to allow user component to setQueryState just like one would use setState
   */
  const setQueryState = useCallback((val) => {
    // this check prevents unnecessary array setting
    // ([] -> [] are technically different memory objects)
    // this is safe to deep compare because the array value should not have very many values
    // (ex. 'filters' array has a few different possible filter values)
    if (Array.isArray(defaultVal) && !JSON.stringify(state) === JSON.stringify(val)) return;
    setState(val);
    /*********************** ESLint Disable Justification: *******************************/
    // We do not want the defaultVal or state dependencies here because they were simply added to
    // prevent unecessarily setting the value array. We do not want any dependencies that might
    // change the state after the initial setQueryState is called from the user function.
    /*************************************************************************************/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setQueryState];
}
export default useQueryState;
