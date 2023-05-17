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

const postErrorMessage = (message: string) => http.post('log', message);

const parseUserAgentData = () => {
  if (navigator.userAgentData) {
    const { brands, platform, mobile } = navigator.userAgentData;
    const { brand, version } = brands[0];
    return `${platform} running ${brand} version ${version} on ${mobile ? 'mobile' : 'non-mobile'}`;
  }
  return navigator.userAgent;
};

const errorLogService = {
  postErrorMessage,
  parseUserAgentData,
};

export default errorLogService;
