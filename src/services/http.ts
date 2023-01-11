import { getToken, isAuthenticated } from './auth';
import { createError } from './error';

type HttpRequestBody =
  | string
  | FormData
  | URLSearchParams
  | Blob
  | File
  | ArrayBuffer
  | ArrayBufferView;

const get = <TResponse>(endpoint: string): Promise<TResponse> => makeRequest(endpoint, 'get');

const put = <TResponse>(
  endpoint: string,
  body: Object = '',
  headers = new Headers(),
): Promise<TResponse> =>
  makeRequest(endpoint, 'put', JSON.stringify(body), setContentTypeJSON(headers));

/**
 * Post image data to the API
 *
 * @param endpoint url of the endpoint to post the image to
 * @param imageData base64 encoded data URI of the image to post
 * @param headers HTTP headers to include in the request
 * @returns Response from the server
 */
const postImage = <TResponse>(
  endpoint: string,
  imageData: string,
  headers?: Headers,
): Promise<TResponse> => {
  const blob = dataURItoBlob(imageData);
  const fileType = blob.type.replace('image/', '');
  const imageDataForm = new FormData();
  imageDataForm.append('image', blob, `image.${fileType}`);
  return makeRequest(endpoint, 'post', imageDataForm, headers);
};

const post = <TResponse>(
  endpoint: string,
  body: Object = '',
  headers = new Headers(),
): Promise<TResponse> =>
  makeRequest(endpoint, 'post', JSON.stringify(body), setContentTypeJSON(headers));

const del = <TResponse>(endpoint: string): Promise<TResponse> => makeRequest(endpoint, 'delete');

const apiBaseURL = '/'; // process.env.REACT_APP_API_URL as string;

/**
 * Make a request to the API
 *
 * @param endpoint API endpoint to request, a URL relative to API base URL, ex: `activity/023487` (no leading slash)
 * @param method HTTP method to use
 * @param body Body of the request
 * @param headers Options to put in the Header
 * @returns The parsed response to the request
 */
const makeRequest = async <TResponse>(
  endpoint: string,
  method: string,
  body?: HttpRequestBody,
  headers?: Headers,
): Promise<TResponse> => {
  const response = await fetch(`${apiBaseURL}api/${endpoint}`, {
    method,
    body,
    headers: await handleAuthHeader(headers ?? new Headers()),
  });
  return parseResponse(response);
};

/**
 * Parse an HTTP response
 *
 * @param res the response to parse
 * @returns Resolves with the response body; Rejects on a non-2xx response code
 */
export const parseResponse = async <TResponse>(res: Response): Promise<TResponse> => {
  try {
    const json = await res.text();
    const data: TResponse = json.length ? JSON.parse(json) : {};

    // Throw error when response status code is bad
    if (!res.ok) {
      // @ts-ignore
      return Promise.reject(createError(data, res));
    }

    return data;
  } catch (err) {
    // Handle error if response body is not valid JSON
    return Promise.reject(err instanceof Error ? createError(err, res) : err);
  }
};

const handleAuthHeader = async (headers: Headers): Promise<Headers> => {
  if (isAuthenticated()) {
    try {
      const token = await getToken();
      headers.append('Authorization', `Bearer ${token}`);
    } catch (err) {
      throw new Error('Token is not available');
    }
  }
  return headers;
};

const setContentTypeJSON = (headers: Headers) => {
  headers.append('Content-Type', 'application/json');
  return headers;
};

const dataURItoBlob = (dataURI: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

const httpUtils = {
  del,
  get,
  post,
  postImage,
  put,
};

export default httpUtils;
