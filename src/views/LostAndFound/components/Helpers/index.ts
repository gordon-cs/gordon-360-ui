import { format } from 'date-fns';
import { Location } from 'react-router';
import { SetURLSearchParams } from 'react-router-dom';

// For date formatting
const dateFormat = 'MM/dd/yy';

function capitalizeString(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

function formatDateString(date: string) {
  return format(Date.parse(date), dateFormat);
}

// Helper to read URL param
function getUrlParam(paramName: string, location: Location<any>, searchParams: URLSearchParams) {
  if (location.search.includes(paramName)) {
    return searchParams.get(paramName) || '';
  }
  return '';
}

// Helper to set or remove a param
function setUrlParam(paramName: string, paramValue: string, setSearchParams: SetURLSearchParams) {
  if (!paramValue) {
    setSearchParams((params) => {
      params.delete(paramName);
      return params;
    });
  } else {
    setSearchParams((params) => {
      params.set(paramName, paramValue);
      return params;
    });
  }
}

// Helper to clear all filters
function clearUrlParams(setSearchParams: SetURLSearchParams) {
  setSearchParams((params) => {
    params.delete('ID');
    params.delete('status');
    params.delete('category');
    params.delete('keywords');
    params.delete('color');
    return params;
  });
}

export { capitalizeString, formatDateString, getUrlParam, setUrlParam, clearUrlParams };
