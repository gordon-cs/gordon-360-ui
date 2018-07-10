# Gordon 360 User Interface

This project is a rebuild of the frontend of Gordon 360 in React. [The current frontend](https://github.com/gordon-cs/Project-Bernard/) was built in EmberJS, but was deemed to slow and difficult to maintain.

Look at [`ROADMAP.md`](https://github.com/gordon-cs/gordon-360-ui/blob/master/ROADMAP.md) for progress on the rebuild.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Read the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

To run the app for the first time, run the following commands:

- `npm install`
- `npm start`

The app will open in a browser at <http://localhost:3000>.

## Documentation

The contents of `GUIDES.md` and the generated JSDoc for files in `./src/services` are hosted at <https://gordon-cs.github.io/gordon-360-ui/>.

### Editor Recommendations

[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor for this project. This editor is a lightweight IDE that has excellent support for JavaScript and other web languages. It also has a built-in terminal, Git integration, a debugger, and a rich extension ecosystem.

The following extensions are recommended for any code editor used to develop this project, but the links provided are for the VS Code extensions. Many of the extensions listed below are linters, which check code syntax and style to ensure that everyone on the team writies code the same way.

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ensures that indentation style, line endings, and file endings are consistent across editors and operating systems
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) checks syntax correctness for JavaScript (`.js` files)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) checks syntax correctness for Sass (`.scss` files)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) automatically formats JavaScript, Sass, JSON, and Markdown files on save

If you are using VS Code, you can use the following keyboard shortcuts to run the app:

- macOS: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd>
- Windows: <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>B</kbd>

VS Code users will also see a ruler at the 100 character mark, helping the developer to avoid linter warnings by keeping lines under 100 characters long.

### Libraries

Links to the homepages of libraries used in this project, listed here for easy reference.

- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

  Provides easy routing, allowing transitions between views with back button support and URL management.

- [classnames](https://github.com/JedWatson/classnames)

  A simple JavaScript utility for conditionally joining classNames together. See [Usage with React.js](https://github.com/JedWatson/classnames#usage-with-reactjs) for an explanation of why this library is useful with JSX.

- [Material-UI](https://material-ui-next.com)

  Material-UI is a widely-used React implementation of Google's Material Design. It provides a comprehensive toolkit of interface components, along with a set of usability guidelines and best practices for using them.
  _Note_: this project currently uses `material-ui@next`, which is a beta version of the library. The library is approaching a 1.0.0 release, so the beta version is more similar to that release than the current stable version is.

- [Downshift](https://github.com/paypal/downshift)

  Downshift is a component that can be used for building autocomplete components. We use it because it is used in one of the Material-UI autocomplete examples, showing that it integrates well with Material-UI components.

### Connect Local Backend To React

- After setting up the backend as documented in [Project Raymond](http://localhost:3000/static/js/C:/Users/Nathaniel.Rudenberg/Documents/gordon-360-ui/src/views/About/about.css):

  - Open `package.json` and scroll to the bottom.

    - In the `proxy` key, there are two subkeys: `/api` and `/token`. Change the `target` line in both of these to reflect the URL of your local test backend. For example, if your test backend is operating on your local computer and listening on port 5555, you would change the text to say `"target": "http://localhost:5555/"` in both subkeys.

  - Open `.env.production`. Inside it, there should be a variable called `REACT_APP_API_URL`. If it exists, change it so that the line says `REACT_APP_API_URL=http://localhost:5555/` assuming the backend is listening on port 5555. If the variable doesn't exist, just add `REACT_APP_API_URL=http://localhost:5555/` to the bottom of the file.

### Server Notes

The staging server is hosted on `360-frontend.gordon.edu` (which runs Windows). This machine is also known as `360React.gordon.edu`, `360newtrain.gordon.edu`, and `360new.gordon.edu`.

The production server is hosted on `cts-360.gordon.edu`. This machine is also known as `360.gordon.edu` and `360train.gordon.edu` (it also runs the staging server for the Ember site).

#### Making Refresh, URL Entry, and Forward/Back Buttons Work

As noted earlier, gordon-360-ui uses React Router for routing URLs to different views. This works as expected when running the front-end locally with `npm start`. However, when the production build is running on the IIS Server, React Router only handles link clicks; manual URL entry and use of browser navigation buttons results in a 404 error. This is because URLs are sent to the IIS Server (as HTTP requests) before they are handled by React Router. Because none of the URLs correspond to actual directories on the server root, a 404 error results.

To remedy this, a `web.config` file with [these contents](https://gist.githubusercontent.com/lcostea/f17663ebf041b103d98989b6b52d8353/raw/6744846d241c9b785df9054fecbcfc4f2e5dda80/web.config) can be placed in the server's root directory (`D:\wwwroot\360train.gordon.edu`). This file is read by the IIS Server. It provides commands to the URL Rewrite extension (which must be installed in the "Internet Information Services (IIS) Manager" program and can be downloaded from [The Official Microsoft IIS Site](https://www.iis.net/downloads/microsoft/url-rewrite)) which tells the server to reroute all invalid URLs to the server's root directory, eliminating the 404 errors and allowing React Router to handle URLs as expected.

##### The Bad  News, and a Workaround

Unfortunately, due to some yet-to-be-fathomed fluke, our attempts to make this `web.config` file be automatically copied to the server root upon deployment have as of yet been foiled. When placed in the `public` directory of our repository (along with other files which are automatically copied over to the server root by an `scp` command in `deploy.sh`), the `web.config` file is copied to the `static` directory on the server rather than to the server root, and the contents of the file are erased (the file is empty). We theorize that this issue is caused by a hiccup in the implementation of `scp` within [PowerShell Server](https://www.nsoftware.com/powershell/server/), a third-party, proprietary program used on the server to facilitate `ssh` connections. (This behavior also occurred with a small number of arbitrarily-named test files, so it is not specific to the "`web.config`" filename.) The file can be placed in the server root directory manually, but it will be removed upon the next deployment (by the deployment script). 

Currently, a reasonably elegant workaround has been created by adding a couple of lines to the `deploy.sh` script in the `scripts` directory of the repository. The contents of the `web_config` file (located in the root of the repo) are loaded into a shell variable at the beginning of script execution, and the contents of the file are transferred to the server using an `ssh` connection. This is done by simply echoing the contents of the file (from the aforementioned variable) and redirecting console output (in PowerShell on the server) into a (new) file called `web.config`. This solution achieves the desired result, and allows the contents of the file to be stored in the repo (in the `web_config` file), making future editing much easier than if the file was stored only on the server.

##### Previous Workaround

Our original workaround was in the form of a PowerShell script which automatically copies `web.config` to the server root whenever it is removed. The script is located at `D:\scripts\webconfig\webconfig-filecheck.ps1` and contains a constantly-running while loop. A task has been created in Windows Task Scheduler which, if enabled, starts running the script every morning at 2:00 AM, but automatic execution of this task has been disabled since the creation of the new workaround described above. This task still exists and can be restarted if it is ever needed. (The back-up `web.config` file is located in the same directory as the script.)

Currently, the script and task only exist on the server for the development site (`360newtrain.gordon.edu`). Analogous changes must be made to the server root directories for the other sites (`360new.gordon.edu`, and `360.gordon.edu` once the React site officially replaces the Ember site) if this functionality is desired there. (The current workaround should work on any server and does not need the PowerShell script or the task in order to work.)
