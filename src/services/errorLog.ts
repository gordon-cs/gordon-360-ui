import http from './http';

const postErrorLog = (message: string) =>
  http.post('log/add', { LOG_MESSAGE: message, LOG_TIME: Date.now() });

const postErrorMessage = (message: string) => http.post('log', message);

//Code modified from https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
const matchItem = (string: string, data: { name: string; value: string }[]): string => {
  data.forEach((element) => {
    const match = new RegExp(element.value, 'i').test(string);
    if (match) {
      return element.name;
    }
  });
  return 'unknown';
};

const oses = [
  { name: 'Windows Phone', value: 'Windows Phone' },
  { name: 'Windows', value: 'Win' },
  { name: 'iPhone', value: 'iPhone' },
  { name: 'iPad', value: 'iPad' },
  { name: 'Kindle', value: 'Silk' },
  { name: 'Android', value: 'Android' },
  { name: 'PlayBook', value: 'PlayBook' },
  { name: 'BlackBerry', value: 'BlackBerry' },
  { name: 'Macintosh', value: 'Mac' },
  { name: 'Linux', value: 'Linux' },
  { name: 'Palm', value: 'Palm' },
];

const browsers = [
  { name: 'Chrome', value: 'Chrome' },
  { name: 'Firefox', value: 'Firefox' },
  { name: 'Safari', value: 'Safari' },
  { name: 'Internet Explorer', value: 'MSIE' },
  { name: 'Opera', value: 'Opera' },
  { name: 'BlackBerry', value: 'CLDC' },
  { name: 'Mozilla', value: 'Mozilla' },
];

const parseNavigator = (navigator: Navigator) => {
  //Code modified from https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745

  const header = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
    //@ts-ignore
    window.opera,
  ];

  const agent = header.join(' ');
  const os = matchItem(agent, oses);
  const browser = matchItem(agent, browsers);
  return 'OS: ' + os + ', Browser: ' + browser;
};

const errorLogService = {
  postErrorLog,
  postErrorMessage,
  parseNavigator,
};

export default errorLogService;
