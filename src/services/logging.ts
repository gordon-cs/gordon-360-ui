import http from './http';

interface UserAgentDataBrand {
  readonly brand: string;
  readonly version: string;
}
interface UserAgentData {
  readonly platform: string;
  readonly brands: UserAgentDataBrand[];
  readonly mobile: boolean;
}

declare global {
  interface Navigator {
    readonly userAgentData?: UserAgentData;
  }
}

const post = (message: string) => {
  const userAgentData = parseUserAgentData();
  http.post('log', `${userAgentData}: ${message}`);
};

// @TODO: Make this a strcutured component of all logs, e.g. with new columns for OS, Version, etc.
const parseUserAgentData = () => {
  if (navigator.userAgentData) {
    const { brands, platform, mobile } = navigator.userAgentData;
    const { brand, version } = brands[0];
    return `${platform} running ${brand} version ${version} on ${mobile ? 'mobile' : 'non-mobile'}`;
  }
  return navigator.userAgent;
};

const errorLogService = {
  post,
  parseUserAgentData,
};

export default errorLogService;
