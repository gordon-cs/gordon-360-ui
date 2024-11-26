import { NavigationClient, NavigationOptions } from '@azure/msal-browser';
import { NavigateFunction } from 'react-router';

/**
 * This is an example for overriding the default function MSAL uses to navigate to other urls in your webpage
 */
export class CustomNavigationClient extends NavigationClient {
  private navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    super();
    this.navigate = navigate;
  }

  /**
   * Navigates to other pages within the same web application
   * You can use the useNavigate hook provided by react-router to take advantage of client-side routing
   * @param url the url to navigate to
   * @param options the options to navigat with
   * @returns false if navigation failed
   */
  async navigateInternal(url: string, options: NavigationOptions) {
    const relativePath = url.replace(window.location.origin, '');
    if (options.noHistory) {
      this.navigate(relativePath, { replace: true });
    } else {
      this.navigate(relativePath);
    }

    return false;
  }
}
