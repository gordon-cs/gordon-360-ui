# Gordon 360 User Interface

This project is the frontend of Gordon 360 in React. [The retired frontend](https://github.com/gordon-cs/Project-Bernard/) was built in EmberJS, but was deemed too slow and difficult to maintain. To see the specifics of the rebuild, see [`ROADMAP.md`](https://github.com/gordon-cs/gordon-360-ui/blob/develop/old_documentation/ROADMAP.md).

## Contents

- [Getting Started](#getting-started)
- [Editor Recommendations](#editor-recommendations)
- [Libraries](#libraries)
- [Connect Local Backend to React](#connect-local-backend-to-react)
- [Server Notes](#server-notes)

- [Code Style](#code-style)
- [Dependencies](#dependencies)
- [Project File Organization](#file-organization)
- [Enviroment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Known Issues](#known-issues)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Read the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Make sure Node.js is set up on your machine. The project uses version `9.11.1` as later versions break it.
- Download the latest release of NVM (Node Version Manager) from [here](https://github.com/coreybutler/nvm-windows/releases). `Select nvm-setup.zip`.
    - Extract the file and run it, making sure to install it to the account you are logged into (example: if you're logged in as anthony.aardvark, make sure it installs to anthony.aardvark and not zelda.zebra). If it says Node is already installed, proceed anyway.
    - After the installation completes, open a terminal and run these commands in order:
      - `nvm install 9.11.1`
      - `nvm use 9.11.1`
    - Close the terminal.

The app will open in a browser at <http://localhost:3000>.

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

- [Material-UI](https://material-ui-next.com)

  Material-UI is a widely-used React implementation of Google's Material Design. It provides a comprehensive toolkit of interface components, along with a set of usability guidelines and best practices for using them.

- [Chart-JS](http://www.chartjs.org/)

  Chart-JS is a Library that provides GUI charts
  An example can be found on the homepage. The React Component that is used can be found [here](https://github.com/jerairrest/react-chartjs-2)

- [classnames](https://github.com/JedWatson/classnames)

  A simple JavaScript utility for conditionally joining classNames together. See [Usage with React.js](https://github.com/JedWatson/classnames#usage-with-reactjs) for an explanation of why this library is useful with JSX.

- [Cropper-JS](https://github.com/fengyuanchen/cropperjs/blob/master/README.md)

  Cropper JS is a robust image cropper that is used on My Profile. While this Library is not used directly, a [React component](https://www.npmjs.com/package/react-cropper) that wraps this library is used.

- [Downshift](https://github.com/paypal/downshift)

  Downshift is a component that can be used for building autocomplete components. We use it because it is used in one of the Material-UI autocomplete examples, showing that it integrates well with Material-UI components.

- [history](https://github.com/ReactTraining/history#readme)

  history is a JavaScript library that lets you easily manage session history anywhere JavaScript runs. history abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, confirm navigation, and persist state between sessions.

- [lodash](https://lodash.com/)

  A modern JavaScript utility library delivering modularity, performance & extras.
  Extends functionality of Arrays and adds sorting methods of elements in arrays.

- [React-DropZone](https://github.com/react-dropzone/react-dropzone)

  A library that provides file drag+drop or a file browser submitting files

- [luxon](https://github.com/moment/luxon#readme)

  A library that wraps the native Javascript DateTime class with and allows for easier use of dates

- [react-responsive-carousel](http://react-responsive-carousel.js.org/)

  A React image carousel.
  [Link to source code + readme](https://github.com/leandrowd/react-responsive-carousel)

- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

  Provides easy routing, allowing transitions between views with back button support and URL management.

### Connect Local Backend To React

- After connecting to the virtual machine and setting up the backend, as documented in [gordon-360-api](https://github.com/gordon-cs/gordon-360-api/blob/develop/README.md#running-the-server-locally),

  - Clone the UI repository if you do not have it open on the virtual machine already.
  - Open the repo in Visual Studio Code (VS Code).
  - Open `setupProxy.js`:

    - You will see two nearly identical function calls that start with `app.use(proxy...`. In both calls, change the string following the word `target` to reflect the URL of your local test backend. For example, if your test backend is operating on your local computer and listening on port 5555, you would change the string to say `'http://localhost:5555/'` in both.

  - Open `.env.production`. Inside it, there should be a variable called `REACT_APP_API_URL`. If it exists, change it so that the line says `REACT_APP_API_URL=http://localhost:5555/` assuming the backend is listening on port 5555. If the variable doesn't exist, just add `REACT_APP_API_URL=http://localhost:5555/` to the bottom of the file.
  - Do the same with `.env.development`.

- Now, you are ready to work on the frontend. Although, you may need to install npm, as shown [here](#getting-started).
  Also, note that it is better to run npm start in a VS Code terminal. It then knows to warn you if someone is already using port 3000. Type `y` if it does say 'Something is already running on port 3000...'.

- In some scenarios, (for example, when someone has made custom changes to the backend which you also want to use) it is preferable to skip setting up your own backend and connect to someone else's. To do this, make sure you are on the virtual machine. Then, just follow the above directions, replacing each instance of the port number you chose with the port number on which their backend is listening.

### Server Notes

The staging and production servers are both hosted on `360-frontend.gordon.edu` (which runs Windows). This machine is also known as `360React.gordon.edu` (used by Travis CI), `360train.gordon.edu`, and `360.gordon.edu`.

The backend server is hosted on `cts-360.gordon.edu`. This machine is also known as `360Api.gordon.edu` and `360ApiTrain.gordon.edu` (it also runs the frontend server for the old Ember site, and is thus also known as `360old.gordon.edu`).

#### Making Refresh, URL Entry, and Forward/Back Buttons Work

As noted earlier, gordon-360-ui uses React Router for routing URLs to different views. This works as expected when running the front-end locally with `npm start`. However, when the production build is running on the IIS Server, React Router only handles link clicks; manual URL entry and use of browser navigation buttons results in a 404 error. This is because URLs are sent to the IIS Server (as HTTP requests) before they are handled by React Router. Because none of the URLs correspond to actual directories on the server root, a 404 error results.

To remedy this, a `web.config` file with [these contents](https://gist.githubusercontent.com/lcostea/f17663ebf041b103d98989b6b52d8353/raw/6744846d241c9b785df9054fecbcfc4f2e5dda80/web.config) can be placed in the server's root directory (`D:\wwwroot\360train.gordon.edu`). This file is read by the IIS Server. It provides commands to the URL Rewrite extension (which must be installed in the "Internet Information Services (IIS) Manager" program and can be downloaded from [The Official Microsoft IIS Site](https://www.iis.net/downloads/microsoft/url-rewrite)) which tells the server to reroute all invalid URLs to the server's root directory, eliminating the 404 errors and allowing React Router to handle URLs as expected.

##### The Bad News, and a Workaround

Unfortunately, due to some yet-to-be-fathomed fluke, our attempts to make this `web.config` file be automatically copied to the server root upon deployment have as of yet been foiled. When placed in the `public` directory of our repository (along with other files which are automatically copied over to the server root by an `scp` command in `deploy.sh`), the `web.config` file is copied to the `static` directory on the server rather than to the server root, and the contents of the file are erased (the file is empty). We theorize that this issue is caused by a hiccup in the implementation of `scp` within [PowerShell Server](https://www.nsoftware.com/powershell/server/), a third-party, proprietary program used on the server to facilitate `ssh` connections. (This behavior also occurred with a small number of arbitrarily-named test files, so it is not specific to the "`web.config`" filename.) The file can be placed in the server root directory manually, but it will be removed upon the next deployment (by the deployment script).

Currently, a reasonably elegant workaround has been created by adding a couple of lines to the `deploy.sh` script in the `scripts` directory of the repository. The contents of the `web_config` file (located in the root of the repo) are loaded into a shell variable at the beginning of script execution, and the contents of the file are transferred to the server using an `ssh` connection. This is done by simply echoing the contents of the file (from the aforementioned variable) and redirecting console output (in PowerShell on the server) into a (new) file called `web.config`. This solution achieves the desired result, and allows the contents of the file to be stored in the repo (in the `web_config` file), making future editing much easier than if the file was stored only on the server.

##### Previous Workaround

Our original workaround was in the form of a PowerShell script which automatically copies `web.config` to the server root whenever it is removed. The script is located at `D:\scripts\webconfig\webconfig-filecheck.ps1` and contains a constantly-running while loop. A task has been created in Windows Task Scheduler which, if enabled, starts running the script every morning at 2:00 AM, but automatic execution of this task has been disabled since the creation of the new workaround described above. This task still exists and can be restarted if it is ever needed. (The back-up `web.config` file is located in the same directory as the script.)

Currently, the script and task only exist on the server for the development site (`360train.gordon.edu`). Analogous changes must be made to the server root directories for the production site (`360.gordon.edu`) if this functionality is desired there.

(The current workaround described earlier should work on any server and does not need the PowerShell script or the task in order to work.)

## Code Style

This project uses [Prettier](https://prettier.io/), an "opinionated code formatter," to automatically format JavaScript, JSON, Sass, and Markdown files according to a common style.

The advantage of using a code formatter is consistency between developers. Using ESLint with a strict style guide is one approach to consistency, but it still requires developer effort to fix code according to the ESLint rules. Prettier takes care of this without any effort from the developers.

Prettier is used as a pre commit hook in this repository. This means that it will automatically format any staged code before it is committed. It can also be used as an [extension for your editor](https://prettier.io/docs/en/editors.html). This repository includes a setup for VS Code: when the extension is installed, files will be formatted automatically every time they are saved.

ESLint and Stylelint are used in conjunction with Prettier to catch syntax errors, but not to check code style - that is taken care of solely by Prettier.

## Dependencies

### Installing Dependencies

If you are adding a dependency to the project, you must use either `--save` or `--save-dev` with `npm install`. This will save the dependency and its current version to `package.json`, which means it will be installed automatically when `npm install` is run.

- If you are installing a dependency that will be used in development, such as a build tool, linter, or documentation tool, use `npm install --save-dev nameOfPackage`. This will save the dependency to the `devDependencies` property of `package.json`.
- If you are installing a production dependency, such as a charting library, a date formatting library, or a utility like Lodash, use `npm install --save nameOfPackage`. This will save the dependency to the `dependencies` property of `package.json`.

To remove a dependency, use `npm rm nameOfPackage`.

### Updating Dependencies

To see which depencies are out of date, run `npm outdated`.

To update all depedencies to their latest allowed versions (as specified by the semver range in `package.json`), run `npm update --save --dev`. This command will save the latest versions of all production and development dependencies to `package.json` as the new minimum version. Read more about `npm update` [here](https://docs.npmjs.com/cli/update).

### When Dependency Updates Break 360

All dependency versions in package.json are currently prefixed with `>=` so that npm install will always download the latest versions. This keeps them from getting behind but may cause problems when there are major releases.

If a dependency's major release causes problems, a quick fix is to change the `>=` to a `^` and do `npm install`. If this did not rollback, which you can check by looking for the dependency's version in package-lock.json, it may work to delete package-lock.json, delete node_modules and its contents, and `npm install` again.

The long yet wise fix is to go to the folder for this dependency in node_modules and look for a CHANGELOG.md. Of course, make sure you have the latest version of this package, or notes about that version will not be there. The CHANGELOG.md should point out the "breaking changes" that came with major releases. If they are not called this, you should be able to find these changes in the notes for each major release's entry- any entry entitle X.0.0, where X would actually be a version number. Read about these changes and change your code accordingly. Then, you should be able to use the latest version!

### Semantic Versioning

[Semantic versioning](https://semver.org/) is a method of versioning software. From their website:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> - MAJOR version when you make incompatible API changes,
> - MINOR version when you add functionality in a backwards-compatible manner, and
> - PATCH version when you make backwards-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

npm uses semantic versioning ranges to specify a range of acceptable versions. For example, `^2.1.3` means "any minor or patch release with the major version `2`". In other words, where `x` represents a version number that can change, this range means `2.x.x`.

## File Organization

The source files for the app are in `./src`. The other top-level folders are as follows:

- `.vscode` contains configuration for Visual Studio Code
- `build` contains the built application; not tracked by Git
- `node_modules` contains dependencies installed by `npm`; not tracked by Git
- `public` contains assets that should not be processed by Webpack. Only files inside `public` can be used from `public/index.html`.

The structure of the `src` directory is as follows:

```plain
├── components
│   └── ...
├── services
│   └── ...
├── views
│   └── ...
├── app.js
├── app.test.js
├── index.css
├── index.js
└── register-service-worker.js
```

### Components

```plain
components
├── Error
│   └── index.js
├── EventList
|   ├── components
│   │   └── ...
|   └── index.js
├── Header
│   ├── components
│   │   └── ...
│   ├── gordon-logo-horiz-black.svg
│   ├── header.css
│   └── index.js
└── ...
```

This folder contains components that, when used together, make up the views of the application. Each component should be small and focus on doing One Thing Well. Read about the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/) for a useful perspective on writing small, reusable components and composing them into larger areas of functionality.

Each component must have a folder named in PascalCase (also known as upper camel case) containing a file called `index.js`. Using that filename allows the component to be imported by folder, instead of by file: `import MyComponent from './components/MyComponent` instead of `import MyComponent from './components/MyComponent/my-component`.

A component folder can contain any resources needed by the component, such as images and CSS files. If there is more than one image or CSS file, a subdirectory named `images` or `styles` can be created inside the component folder.

A component folder can contain its own `components` folder containing components that only apply to that component. This is a useful way to avoid polluting the top-level `./components` folder with single-use components. If a component in a nested component folder becomes useful to another component that is higher in the hierarchy than it is, that component should be moved up to the same level as that component. For example, if for some strange reason you wanted to make a footer which also had the people search, you would start with this:

```plain
components
├── Header
|   ├── components
|   │   └── PeopleSearch
|   └── index.js <-- uses ./components/Header
└── Footer
    └── index.js <-- wants to use ../Header/components/PeopleSearch
```

and should change it to this:

```plain
components
├── Header
│   └── index.js <-- uses ../PeopleSearch
├── Footer
│   └── index.js <-- uses ../PeopleSearch
└── PeopleSearch
```

**Components should never have one-word names.** This is to avoid naming collisions with external libraries and with future HTML elements. This application is using the convention of prefixing component names with `Gordon`, as in `GordonError` or `GordonHeader`. Note that folder and file names do not have to follow this convention (respectively, the two examples would be `./components/Error` and `./components/Header`); only the class names of the components and their imports have to follow it:

```JavaScript
// In ./components/Loader/index.js
export default class GordonLoader extends Component {}

// In ./views/Home/components/DiningBalance/index.js
import GordonLoader from '../../../../components/Loader';
```

### Services

This folder contains modules that provide reusable functionality to components across the application.

In general, **components should not handle anything other than displaying and interacting with data**. Any "heavy lifting" should be done in services or on the backend. For example, HTTP requests to the API, filtering a list of events, or parsing a date should take place in a service.

**Services should be framework-agnostic.** This app should be able to switch to Vue or Angular without changing any of the services.

### Views

```plain
views
├── About
├── ...
├── Home
│   ├── components
│   │   └── ...
│   ├── home.css
│   └── index.js
└── Login
    └── ...
```

This folder contains components that make up the discrete views of the application, for example "home," "login," and "edit activity." Each view uses the same folder structure as components in `./components`. Each view represents a route defined in `./app.js`. The route's path should be similar to the name of the component, such as `ActivityEdit` having a path of `/activity/:activityId/edit`.

Similar to component folders, a view folder can have its own `components` folder containing components that only apply to that view. If a component in one of these folders ends up being useful to another view, it should move all the way up to `src/components` to be shared by both views.

## Environment Variables

Environment-specific variables are located in the root directory of the project in the files `.env` and `.env.production`. `.env` contains variables for local development and testing. `.env.production` contains overrides of those variables specific to the production environments (360 and 360Train).

To declare variables that should not be checked in to version control, create a file in the root directory called `.env.local`. This file will be ignored by git.

These files are loaded by the scripts that run the development server and build the application. Variables in these files are available globally in the app as `process.env.REACT_APP_VARIABLE_NAME` (assuming one of the `.env` files contains the line `REACT_APP_VARIABLE_NAME=some-value`).

Environment variables must be declared in all caps, must use snake case, and must begin with `REACT_APP_` (ex: `REACT_APP_API_URL` or `REACT_APP_PASSWORD`). Any environment variables that do not begin with `REACT_APP_` will be ignored.

## Testing

The foundations for a testing suite made up of Jasmine, Karma, and Travis CI have been laid. For one, package.json has the following dependencies listed:

- `"jasmine-core": ">=3.4.0"`
- `"karma": ">=4.1.0",`
- `"karma-chrome-launcher": ">=2.2.0"`
- `"karma-firefox-launcher": ">=1.1.0"`
- `"karma-jasmine": ">=2.0.1"`
- `"karma-safari-launcher": ">=1.0.0"`

Secondly, there is a github account, `gordon-360-ci`, made solely for Travis CI and continuous integration services like it. Specifically, it was from this account that Travis' environment variable `GITHUB_TOKEN` was generated. The login credentials for this account can be found in a file called `ci-credentials` on the CS-RDSH-02 virtual machine, specifically in `C:\Users\Public\Public Documents\` (or `/c/users/public/documents\` when in git-bash).

The process for setting up this testing environment can be continued by following the directions [here](https://www.sitepoint.com/testing-javascript-jasmine-travis-karma/) and the advice [here](https://www.arroyolabs.com/2016/08/unit-testing-your-javascipt-with-jasmine-karmajs-travis-ci/) about using Chromium instead of Chrome. Note that some steps from the first link have been completed, from the step about running `karma init my.conf.js` to the beginning, exclusively. Also, there is already a `.travis.yml` file in the project folder, but it may need some lines of code that the .yml in the directions has.

Timesheets page testing [here](https://docs.google.com/document/d/1fi7_iwTQa7JFVRR3LtSDU3-MGpupOfbqhH-kEU5eMew/edit?usp=sharing)

## Deployment

The deployment script `./scripts/deploy.sh` requires several environment variables to be defined in the Travis CI environment. These variables are documented at the top of the deployment script.

One of these variables is the GITHUB_TOKEN. This is used to authenticate Travis-CI with the repo. This token needs to belong to a current administrator of the repo. (You can generate a personal access token with repo access from your GitHub profile settings).

The script deploys to either staging or production based on the branch it is running from. The `develop` branch deploys to staging, while the `master` branch deploys to production.

`develop` is the default branch on the repository, so all branches should be based on it and should merge back into it. Changes merged into `develop` will automatically deploy to the staging environment.

### Deploying to Production

1.  On the [repository's home page on GitHub](https://github.com/gordon-cs/gordon-360-ui), click "New pull request."
1.  Change the "base" branch of the pull request to `master`. The "compare" branch should be set to `develop` by default.
1.  Enter a title starting with "RELEASE:" (optional, but useful for quickly finding releases in the Git history) and containing a brief summary of the changes that the release brings.
1.  Add reviewers. The pull request must be approved before it can be merged.
1.  Click "Create pull request."
1.  When the pull request is approved, merge it. This will trigger a build that will automatically deploy `master` to production.

## Known Issues

- Cannot login to 360 from Edge due to an authentication error that is caused from http request failing to return a token to edge which causes "Invalid Argument" error to be displayed

- Internet Explorer does not work with 360 and never will due to the fact that IE is too old to support features that 360 currently uses

- There is a problem with the first login hanging after the backend starts up, this might be due to an authentication error but refreshing is currently the only fix

- Edge Authentication - Fails at creation of request object in getAuth() in auth.js service. Incompatability with URLSearchParams was fixed with an update to Edge in April, but different problem with request object must exist still.

- The 'edit involvement' and 'change image' dialog boxes, accessible through the admin view of an involvement profile, are messy. Refer to the CSS styling and replacement of Material UI Grid in views/IDUploader/IDUploader.scss and ''/index.js for a proven fix.

- ID and photo uploader dialog boxes are a bit squished for screens as small as iPhone 5's.

- An admin is able to remove themselves (on admin view), which causes major issues.
