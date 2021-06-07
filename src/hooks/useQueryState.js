import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const types = {
  SingleValue: 'SingleValue',
  Array: 'Array',
  Boolean: 'Boolean',
};
const defaultValues = {
  SingleValue: '',
  Array: [],
  Boolean: false,
};

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
 * Alternative approaches to try, should implementation change or issues arise:
 * - Remove the loadStateFromURL from UseEffect and instead only set the state with the URL value
 * when the page is first loaded (useEffect with []) or when the browser navigation is used
 * (usePopState to detect browser back/forward arrows); this way the problem of oversetting is
 * avoided without the use of checks that this approach uses
 * - URL First Approach: Rather than being state-first and updating the URL as needed,
 * this approach would be to use the URL as the ~ source of truth ~ so to speak
 *
 * Current Implementation Issues:
 * - UseLayoutEffect is not a perfect solution to the race condition issue. Symptoms of this
 * possibly poor design are evident when the browser 'back'/'forward' arrows are tested heavily
 * which can skip queryStates (likely not a practical use case), as well as the fact that
 * we cannot set to an initial value or else we might load (and overwrite the state) from the url
 * before we can set the url
 *
 * @param {String} key - key of the QueryState variable
 * @param {String} typeString - the type of variable (must correspond with a types enum value)
 * @param {String} [initial] - initial value of the QueryState variable
 *          *** DOES NOT currently work because of loading from URL before URL gets set
 * @returns {[var, Callback]} - the state variable, the setQueryState callback function
 */
function useQueryState(key, typeString, initial) {
  const type = types[typeString];
  if (type === undefined)
    throw new Error(`Type must be one of the given types: ${Object.values(types)}`);
  const defaultVal = defaultValues[type];
  const [state, setState] = useState(initial ?? defaultVal);
  const history = useHistory();
  const [isInitializing, setInitializing] = useState(true);

  /**
   * Initialize state
   */
  useEffect(() => {
    const initialize = async () => {
      let urlParams = new URLSearchParams(history.location.search);
      if (urlParams.toString()) {
        // set to key value, otherwise boolean value, otherwise default
        setState(urlParams.get(key) || urlParams.has(key) || defaultVal);
      } else {
        // update the url with initial value
        urlParams.set(key, state.toString());
        // boolean keys set to true don't need '=value'
        urlParams = urlParams
          .toString()
          .replace(/=true|=$/g, '')
          .replace(/=&/, '&');
        history.push('?' + urlParams);
      }
      // Uncommenting the next line should theoretically make this work.
      // Uncommenting that line and removing the else logic above does currently work.
      // setInitializing(false);
      console.log('done initializing', key, state);
    };
    initialize();
  }, []);

  /**
   * Anytime the state changes, setURLFromState is invoked
   * This function updates the URL with the state (if changed)
   */
  useEffect(() => {
    const setURLFromState = async () => {
      console.log('setURLFromState', key);
      let urlParams = new URLSearchParams(history.location.search);

      // if the url value is already the same as the state value -> don't set the url again
      // note: must include toString in defaultVal.toString() in order to check empty arrays
      if (
        (urlParams.get(key) ?? defaultVal.toString()) === state.toString() ||
        (state === true && urlParams.get(key) === '')
      )
        return;

      // key with no value OR boolean key set to false -> absent from url, push empty
      if (!state || state === '' || state.length === 0 || state === false) urlParams.delete(key);
      // boolean or value key is present in url with its current value
      else urlParams.set(key, state.toString());

      // boolean keys set to true don't need '=value'
      urlParams = urlParams
        .toString()
        .replace(/=true|=$/g, '')
        .replace(/=&/, '&');

      history.push('?' + urlParams);
    };
    if (!isInitializing) setURLFromState();
    /*********************** ESLint Disable Justification: *******************************/
    // ESLint wants to include `history` as dependencies but to prevent
    // extra loops of ~ url setting state setting the url ~ we do not include.
    // The only time we want to set the URL manually is when the state changes
    // (key and defaultVal are constant)
    /*************************************************************************************/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, key, defaultVal]);

  /**
   * Anytime the url is changed, loadStateFromURL is invoked
   * This function pulls the value of the key from the url
   *   and updates the state with it (if changed)
   *
   * This is a useLayoutEffect rather than useEffect in order to prioritize loadStateFromURL;
   *   this is necessary for preventing the race condition where (for ex.) the user clicks 'back'
   *   twice quickly and the first 'back' sets the URL params before the second 'back' can
   *   load the accurate new URL param. This is still not totally perfect but only breaks when
   *   a user really messes with the navigation significantly and quickly.
   * Comparison of the two effects: https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
   */
  useLayoutEffect(() => {
    const loadStateFromURL = async () => {
      console.log('loadStateFromURL', key);
      const urlParams = new URLSearchParams(history.location.search);
      let urlValue = urlParams.get(key);

      switch (type) {
        // using boolean key -> load true if present, false if absent from url
        case types.Boolean:
          setState(urlParams.has(key));
          return;

        // different logic if we are working with an array than with single value
        // because setState will not do deep array comparison
        case types.Array:
          // if the same value (or unset and state array is empty) -> do nothing
          // this check is necessary because [] -> [] are different memory objects
          if (urlValue === state.toString() || (!urlValue && state.length === 0)) return;
          else setState(urlValue?.split(',') ?? defaultVal);
          break;

        case types.SingleValue:
          setState(urlValue ?? defaultVal);
          break;

        default:
          // should never be reached, type must always be one of the preceeding
          throw new Error(`missing case for type ${type}`);
      }
    };
    if (!isInitializing) loadStateFromURL();
    /*********************** ESLint Disable Justification: *******************************/
    // ESLint wants to include `state` as dependencies but to prevent
    // extra loops of ~ url setting state setting the url ~ we do not include.
    // It makes good sense that the only time we should pull the URL is the URL changes
    // (key and defaultVal are constant)
    /*************************************************************************************/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search, key, defaultVal]);

  /**
   * Callback function to allow user component to setQueryState just like one would use setState
   */
  const setQueryState = useCallback(
    (nextState) => {
      // this check prevents unnecessary array setting
      // ([] -> [] are technically different memory objects)
      // this is safe to deep compare because the array value should not have very many values
      // (ex. 'filters' array has a few different possible filter values)
      if (
        type === types.Array &&
        state.every((elem, index) => elem === nextState[index]) &&
        nextState.every((elem, index) => elem === state[index])
      )
        return;
      setState(nextState);
    },
    [state, type],
  );

  return [state, setQueryState];
}
export default useQueryState;
