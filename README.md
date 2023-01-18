# Gordon 360 User Interface

![Lint and Build](https://github.com/gordon-cs/gordon-360-ui/workflows/Lint%20and%20Build/badge.svg)

The frontend of [Gordon 360](https://360.gordon.edu). This project is the User interface for Gordon College's student portal. It is written in [React](https://reactjs.org/) and connects to the [Gordon 360 backend](https://github.com/gordon-cs/gordon-360-api).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contents

- [Getting Started](#getting-started)
- [Connecting to the Backend](#connecting-to-the-backend)
- [Connecting to a Remote Backend via SSH](#connecting-to-a-remote-backend-via-ssh)
- [Server Notes](#server-notes)
- [Libraries](#libraries)
- [Code Style](#code-style)
- [Project File Organization](#file-organization)
- [Testing](#testing)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Contributing](#contributing)
- [Known Issues](#known-issues)
- [History](#history)

## Getting Started

Here are the steps to setup the frontend for development:

1. Clone this repository to the machine that you will develop on.

1. Ensure that [NodeJS](https://nodejs.org/en/) is installed on that machine.

   From a terminal, run this command:

   ```
   node -v
   ```

   If it returns a version number, then NodeJS is installed. Proceed to the next step.

   If it doesn't return a number, you will need to install NodeJS. There are two ways to do this:

   1. Download and run the installer from [the NodeJS Website](https://nodejs.org/en/download/)
   1. Use a tool that manages Node installations, such as
      - For any OS: [Fast Node Manager](https://github.com/Schniz/fnm)
      - For MacOS/Linux: [Node Version Manager](https://github.com/nvm-sh/nvm)
      - For Windows: [NVM for Windows](https://github.com/coreybutler/nvm-windows)

1. Install dependencies

   From a terminal, go to the directory where you cloned the project (e.g. the `gordon-360-ui` folder) and run the following command:

   ```
   npm install
   ```

   This will install the frontend's dependencies. It may take a long time the first time you run it.

1. Start the project

   From a terminal in the project directory, run this command:

   ```
   npm run start
   ```

   This will build the project, start a web server, and open the frontend in a new browser tab. It may take several minutes. Once it loads, you are successfully running the frontend and are all set to begin developing.

## Connecting to the Backend

The project is configured to connect to the backend running at `https://360apitrain.gordon.edu` by default. This should be sufficient for developing the frontend. However, if you are testing/developing backend changes, you will want to connect to a backend that is running in Visual Studio.

After following [the instructions to start the backend](https://github.com/gordon-cs/gordon-360-api#running-the-api-locally), take note of the URL that the API is listening at, e.g. `https://localhost:51626`.

1. Open `.env.development`. You will see three sets of environment variables, marked `@PROD`, `@TRAIN`, and `@LOCALHOST`.
1. Ensure that the `@PROD` and `@TRAIN` variables are commented out, and that `@LOCALHOST` is not commented out.
1. Set `REACT_APP_API_URL` equal to `http://localhost:NNNN/`, where `NNNN` is the port your backend is listening on (e.g. `51626`).

You do **not** need to change `.env.production`.

**NOTE**: If you change `.env.development` while the frontend is running, it will **not** update automatically. You will need to stop and restart it before the changes take affect.

If you need to connect to a backend that is only available on `localhost` of a different machine, follow the guide on [Connecting to Remote Backend via SSH](docs/Connecting%20to%20Remote%20Backend%20via%20SSH.md)

### Server Notes

The staging and production servers are both hosted on `DMZ-360-frontend.gordon.edu`. This machine is also known as `360.gordon.edu` and `360Train.gordon.edu`.

The backend server is hosted on `360Api1.gordon.edu`. This machine is also known as `360Api.gordon.edu` and `360ApiTrain.gordon.edu`.

#### Making Refresh, URL Entry, and Forward/Back Buttons Work

As noted earlier, gordon-360-ui uses React Router for routing URLs to different views. This works as expected when running the front-end locally with `npm start`. However, when the production build is running on the IIS Server, React Router only handles link clicks; manual URL entry and use of browser navigation buttons results in a 404 error. This is because URLs are sent to the IIS Server (as HTTP requests) before they are handled by React Router. Because none of the URLs correspond to actual directories on the server root, a 404 error results.

To remedy this, a `web.config` file with [these contents](https://gist.githubusercontent.com/lcostea/f17663ebf041b103d98989b6b52d8353/raw/6744846d241c9b785df9054fecbcfc4f2e5dda80/web.config) can be placed in the server's root directory (`D:\wwwroot\360train.gordon.edu`). This file is read by the IIS Server. It provides commands to the URL Rewrite extension (which must be installed in the "Internet Information Services (IIS) Manager" program and can be downloaded from [The Official Microsoft IIS Site](https://www.iis.net/downloads/microsoft/url-rewrite)) which tells the server to reroute all invalid URLs to the server's root directory, eliminating the 404 errors and allowing React Router to handle URLs as expected.

### Libraries

Links to the homepages of libraries used in this project, listed here for easy reference.

- [MUI](https://mui.com/)

  MUI is a widely-used React component library originally based on Google's Material Design standards. It provides a comprehensive toolkit of interface components, along with a set of usability guidelines and best practices for using them.

- [Chart-JS](http://www.chartjs.org/)

  Chart-JS is a Library that provides GUI charts
  An example can be found on the homepage. The React Component that is used can be found [here](https://github.com/jerairrest/react-chartjs-2)

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

- [react-image-gallery](https://github.com/xiaolin/react-image-gallery)

  A React image carousel.

- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

  Provides easy routing, allowing transitions between views with back button support and URL management.

- [react-csv](https://github.com/react-csv/react-csv)

  Provides components that allow React to easily generate a CSV file from given data. This data can be an array of arrays, an array of literal objects, or strings.

## Code Style

This project uses [Prettier](https://prettier.io/), an "opinionated code formatter," to automatically format JavaScript, JSON, Sass, and Markdown files according to a common style.

The advantage of using a code formatter is consistency between developers. Using ESLint with a strict style guide is one approach to consistency, but it still requires developer effort to fix code according to the ESLint rules. Prettier takes care of this without any effort from the developers.

Prettier is used as a pre commit hook in this repository. This means that it will automatically format any staged code before it is committed. It can also be used as an [extension for your editor](https://prettier.io/docs/en/editors.html). This repository includes a setup for VS Code: when the extension is installed, files will be formatted automatically every time they are saved.

ESLint and Stylelint are used in conjunction with Prettier to catch syntax errors, but not to check code style - that is taken care of solely by Prettier.

### Semantic Versioning

[Semantic versioning](https://semver.org/) is a method of versioning software. From their website:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> - MAJOR version when you make incompatible API changes
> - MINOR version when you add functionality in a backwards-compatible manner
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

## Testing

The first forays into testing were made when we were still using Travis CI as our CI/CD solution. The below advice is probably still useful but will need updating.

> The foundations for a testing suite made up of Jasmine, Karma, and Travis CI have been laid. For one, package.json has the following dependencies listed:
>
> - `"jasmine-core": ">=3.4.0"`
> - `"karma": ">=4.1.0",`
> - `"karma-chrome-launcher": ">=2.2.0"`
> - `"karma-firefox-launcher": ">=1.1.0"`
> - `"karma-jasmine": ">=2.0.1"`
> - `"karma-safari-launcher": ">=1.0.0"`
>
> Secondly, there is a github account, `gordon-360-ci`, made solely for Travis CI and continuous integration services like it. Specifically, it was from this account that Travis' environment variable `GITHUB_TOKEN` was generated. The login credentials for this account can be found in a file called `ci-credentials` on the CS-RDSH-02 virtual machine, specifically in `C:\Users\Public\Public Documents\` (or `/c/users/public/documents\` when in git-bash).
>
> The process for setting up this testing environment can be continued by following the directions [here](https://www.sitepoint.com/testing-javascript-jasmine-travis-karma/) and the advice [here](https://www.arroyolabs.com/2016/08/unit-testing-your-javascipt-with-jasmine-karmajs-travis-ci/) about using Chromium instead of Chrome. Note that some steps from the first link have been completed, from the step about running `karma init my.conf.js` to the beginning, exclusively. Also, there is already a `.travis.yml` file in the project folder, but it may need some lines of code that the .yml in the directions has.

Timesheets page testing [here](https://docs.google.com/document/d/1fi7_iwTQa7JFVRR3LtSDU3-MGpupOfbqhH-kEU5eMew/edit?usp=sharing)

## Continuous Integration and Deployment

GitHub Actions is our Continuous Integration and Continuous Deployment (CI/CD) solution. It is a GitHub product available for free to our public, open source repository.

GHA uses [workflows](.github/workflows), which are YAML files that describe jobs to run when events occur in GitHub. The current workflow, in `ci.yml`, is called `Lint and Build`.
This workflow runs everytime a commit is pushed to a branch in GitHub. It lints and builds these commits to ensure they are satisfactory for our project. Additionally, when commits are pushed to the `develop` or `master` branches (which should only be via pull requests because they are protected branches), this workflow will save the build artifacts on GitHub. These artifacts can be found by navigating to Actions in the repo and selecting a workflow run for one of those branches.

These uploaded artifacts are vital to our CD solution. Because GitHub Actions are running on ephemeral cloud servers, we have no way of securely giving them access to push files
to the 360 server. Instead, deployment uses a powershell script that is run via a scheduled task on the 360 server. The `Deploy 360Train` and `Deploy 360Prod` scheduled tasks both run the powershell script `Deploy360FrontEnd.ps1`, located at `D:\Scripts\Deploy` in the 360 frontend server. This script polls GitHub for new builds of the appropriate branch, and if it finds any builds that are newer than the most recent deployment, it will download the new build, backup the existing build, and overwrite the site's files with the new build. Transcripts from each deployment can be found at `D:\Scripts\Deploy\Transcripts`.

### Deploying to Production

1.  On the [repository's home page on GitHub](https://github.com/gordon-cs/gordon-360-ui), click "New pull request."
1.  Change the "base" branch of the pull request to `master`. The "compare" branch should be set to `develop` by default.
1.  Enter a title starting with "RELEASE:" (optional, but useful for quickly finding releases in the Git history) and containing a brief summary of the changes that the release brings.
1.  Add reviewers. The pull request must be approved before it can be merged.
1.  Click "Create pull request."
1.  When the pull request is approved, merge it. This will trigger a build that will automatically deploy `master` to production.

### Deploying Manually

In the unusual case that Train or Production have not been automatically deployed (which should happen within five minutes of a finished Lint and Build action on the appropriate branch), it is possible to deploy manually.

1. Clone/open the repo in VSCode, check out the branch you want to deploy, which should be `develop` for Train and `master` for Production, and fetch and pull the most uptodate commit(s).
1. Build the project by running `npm run build` in VSCode on a clone of the project set to the branch you want to deploy. The output will be in `path/to/the/repo/gordon-360-ui/build`.
1. Connect to the `360-Frontend.gordon.edu` server. See [RemoteDesktopToVM](https://github.com/gordon-cs/gordon-360-api/blob/develop/RemoteDesktopToVM.md) in the API repo for instructions on how to connect.
1. Open File Explorer and navigate to `D:\wwwroot\`.
1. Backup the existing deployment:
   1. Copy the appropriate folder (`360.gordon.edu` for Production, `360train.gordon.edu` for Train)
   1. Paste it into the `wwwroot` and rename it as a backup with the date, in the format `360[train].gordon.edu-backup-yyyy-MM-ddTHH-mm-ss-fff`, e.g. `360train.gordon.edu-backup-1900-01-31T19:27:59:367`
1. Replace the contents of the existing deployment folder (either `360.gordon.edu` or `360train.gordon.edu`) with the output of your build from step 2 above.
1. Check the appropriate site, refreshing if necessary, to ensure it deployed successfully and is stable.
1. If you need to restore to a backup, simply copy the contents of the desired backup folder and overwrite the appropriate site's folder.

## Contributing

1. Clone the repository to the local machine.
2. Create a new branch with a meaningful name (pertaining to the specific change being implemented).
3. Commit to this branch, with changes focused solely on the branch's nominal purpose.
4. Follow similar steps under "Deploying to Production" to create a pull request; however set the "base" branch to develop and the "compare" branch to the new branch.
5. Once the pull request has been created and approved, the branch changes will be staged onto the develop branch for production.

## Known Issues

- The 'edit involvement' and 'change image' dialog boxes, accessible through the admin view of an involvement profile, are messy. Refer to the CSS styling and replacement of Material UI Grid in views/IDUploader/IDUploader.scss and ''/index.js for a proven fix.

- ID and photo uploader dialog boxes are rather compressed for screens as small as iPhone 5's.

- An admin is able to remove themselves (on admin view), which causes major issues.

- Staff-timesheets is almost working, with the exception of the edit shift and remove shift function. the API endpoints are all set up and seem to be working to send and get data. The add and save shift functions work like expected but the submit function has yet to be tested with a supervisor. In order to address these issues we have to make sure that we re work the ui in order to make sure that we are sending all the necessary info to edit and delete a saved shift. Previously it was thought that we would not have to change the way that the front end worked and we would simply have to integrate the backend for staff time sheets into the jobs controller. This proved to be wrong. It seems that there are more things that we have not accounted for that a staff's shift has and a student does not. Due to lack of testing and time we were not able to find the necessary changes that need to be made, however, we do know that it revolved around the fact that staff has an extra variable called HOURS_TYPE. We accounted for the variable in our submit and save shift functions in our back end and front end, as we expected that to be the case.

## History

- The student timesheets project was done as a senior project by a trio of seniors Nathanial Rudenberg, Adam Princiotta, and Jacob Bradley. The handoff documentation for this project was a revision and update to the existing documentation which is in the [Connect Local Backend to React](#connect-local-backend-to-react) section of the README. The design document can be found [here](https://docs.google.com/document/d/1CepyCiMzBXQVM--JwKKstniU_H1TodzxHLuCqcHxLjk/edit?usp=sharing)
- [Student Timesheets Final Presentation](https://docs.google.com/presentation/d/162V-DLuaEUyHDS2Diu09k5f4Tpo2iuoMtIDUyowa7eQ/edit?usp=sharing)

- The apartment applications project was done as a senior project by Josh Rogers, Christian Kunis, Gahngnin Kim, and Nick Noormand. The design document for the UI can be found [here](https://docs.google.com/document/d/16gvjNApyNMJbqjnwv2DSP0EvY4JJdjVZZAiST3MAZEo/edit?usp=sharing)

- The Alumni360 project was done as a senior project by Matt Ramos and Michael Xiao. This README acts as handoff documentation for this project, with a small revision and update made to the [Connect Local Backend to React](#connect-local-backend-to-react) section. The design document for can be found [here](https://docs.google.com/document/d/1RkuCMTEBg53MKo1uvn_4fjY7E4BeNGBRwsLo1TNAx5U/edit?usp=sharing)
