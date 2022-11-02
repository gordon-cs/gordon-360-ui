# Gordon 360 User Interface

![Lint and Build](https://github.com/gordon-cs/gordon-360-ui/workflows/Lint%20and%20Build/badge.svg)

This project is the frontend of Gordon 360 in React. [The retired frontend](https://github.com/gordon-cs/Project-Bernard/) was built in EmberJS, but was deemed too slow and difficult to maintain. To see the specifics of the rebuild, see [`ROADMAP.md`](https://github.com/gordon-cs/gordon-360-ui/blob/develop/old_documentation/ROADMAP.md).

## Contents

- [Getting Started](#getting-started)

  - [Starting the Front End](#starting-the-front-end)
  - [Connect to Local Backend](#connect-local-backend-to-react)
  - [Connect to Backend via SSH](#connect-to-backend-via-ssh)
  - [Server Notes](#server-notes)
  - [Editor Recommendations](#editor-recommendations)
  - [Libraries](#libraries)

- [Code Style](#code-style)
- [Dependencies](#dependencies)
- [Project File Organization](#file-organization)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Contributing](#contributing)
- [Known Issues](#known-issues)
- [History](#history)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Read the user guide [here](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md).

Make sure Node.js is set up on your machine. If you are on the CS-RDSH-02 virtual machine, it should be setup already. To check if it is on a machine, open a terminal and run the command `nvm`. If the output says `'nvm' is not recognized...`, then Node.js has not been setup. In that case, follow the below procedures to install nvm (Node Version Manager) onto the machine. An npm installation may also work, but nvm will allow easier installation and use of this particular version.

#### Windows:

- Download the latest release of nvm from [here](https://github.com/coreybutler/nvm-windows/releases). `Select nvm-setup.zip`.
  - Extract the file and run it.
  - The installer will ask you where to install nvm. It will display the path where it is currently set to install. Ensure that the path reflects the account you are logged into (example: if you're logged in as anthony.aardvark, make sure the path looks like `C:\Users\aanthony.aardvard\Program Files\etc`). If it says Node is already installed, proceed anyway.
  - After this, go to https://nodejs.org/en/ and look for the version labeled "LTS" (which indicates the latest stable version).
  - Finally, run `nvm install <version>` where <version> is the version you found.

#### Linux and Mac:

- Follow [the nvm installation instructions](https://github.com/nvm-sh/nvm#install--update-script) to install nvm. It may take a few minutes to run, and appear for a while to be hung. (After it finishes, you might need to close your terminal window and open another before nvm will work.)
- Once it is successfully installed, use it to install a version of Node.js: `nvm install node`. Or, better yet, `nvm install --lts`, to use the current "long term support" version which is generally the most stable.
- Then, tell nvm that you want to use that verion: `nvm use node`, or better yet, `nvm use --lts`.
  (More generally, "node" and "--lts" in the above commands can be replaced by any specific version.)

#### Troubleshooting NVM

- If a developer accidentally follows the above Windows instructions on CS-RDSH-02, the environment variable for NVM will be set by their installation to a path within their user directory. Thus, many if not all other users on the machine will lose access to NVM. To fix this, any user can open Powershell as administrator and run `choco install -y nvm`. (The `-y` option answers `yes` to any prompts that occur during the installation.) Then, in a Powershell terminal not running as admin, run `nvm install --lts`. Users should log out and back in to see the fix take effect. As usual, you can check if this worked by opening a terminal and running the command `nvm`. If the output says `Running version...`, then it is all set.

- Sometimes, the .json package management files in develop are missing a dependency and `npm install` throws an error. The error says something like "This is most likely not a problem with npm itself...and is related to npm not being able to find a file". The best solution we have found is to delete the whole `node_modules` directory, delete the file `package-lock.json`, and then run `npm install`. Warning, the deletions can take several minutes because they are large files.

### Starting the Front End

After cloning this repo, and after any major changes to local code (like changing branches) run:

- `npm install` (This gets the right packages installed in the directory)
- `npm start` (This starts a local server, and prints the local URL)

When running the app, it will open in a browser at http://localhost:3000.

### Connect Local Backend To React

By default, React will use the live 360ApiTrain backend to allow seamless front end development. If you would like to run the backend locally and connect to the UI, use the following steps:

- After connecting to the virtual machine and setting up the backend, as documented in [gordon-360-api](https://github.com/gordon-cs/gordon-360-api/blob/develop/README.md#running-the-api-locally),

  - Clone the UI repository if you do not have it open on the virtual machine already.
  - Open the repo in Visual Studio Code (VS Code).
  - Open `.env.development`. You will see three sets of environment variables, marked `@PROD`, `@TRAIN`, and `@LOCALHOST`. Ensure that the `@PROD` and `@TRAIN` variables are commented out, and that `@LOCALHOST` is not commented out. Then set `REACT_APP_API_URL` equal to `http://localhost:NNNN/`, where `NNNN` is the port your backend is listening on (e.g. `9999`).
  - Ensure that at least one `REACT_APP_FONT_URL` from either `@PROD` or `@TRAIN` is not commented out.
  - You do not need to change `.env.production`.

- Now, you are ready to work on the frontend.

- In some scenarios, (for example, when someone has made custom changes to the backend which you also want to use) it is preferable to skip setting up your own backend and connect to someone else's. To do this, make sure you are on the virtual machine. Then, just follow the above directions, replacing the port number you chose with the port number on which their backend is listening.

### Connect to Backend via SSH

There are some cases where you may want to  develop the front end on your local machine but using a specific API that is neither in develop nor production (these are always available live via train and prod). There are generally two use cases for doing this:
- To test something developed on backend without having to run the front end on the virtual machine
- To develop the front end against a backend that is in development (ex. a project not yet complete)

#### How it works

*explanation*

#### Steps:

1. Your local machine must be configured as an SSH host

    *Windows:*
    
    Full explanation [here](https://theitbros.com/ssh-into-windows/).

    Add the optional feature called "OpenSSH Server" or install via PowerShell
    ```
    Add-WindowsCapability -Online -Name OpenSSH.Server*
    ```
    Check status of ssh services
    ```
    Get-Service -Name *ssh*
    ```
    Commands for starting sshd and ssh-agent (respectively) and optionally configuring autostarts for them
    ```
    Start-Service sshd
    
    Set-Service -Name sshd -StartupType 'Automatic'

    Start-Service ‘ssh-agent’

    Set-Service -Name ‘ssh-agent’ -StartupType 'Automatic'
    ```

2. Create the SSH tunnel

    After setting up the ssh server on your host machine, find your host IP or DNS address. Log into the VM and open a command prompt/powershell window.
    In command prompt/powershell window enter the following command, 
    ```
    ssh -R localhost:[API_LOCAL_PORT_NUMBER]:localhost:[API_REMOTE_PORT_NUMBER] [USER]@[IP/DNS_ADDRESS]
    ```
    Some notes about this just to be clear about what the parameters are. API_LOCAL_PORT_NUMBER is the port that the api is running on the VM.
    API_REMOTE_PORT_NUMBER is the port that you want the API to be sent to on your host machine (not the VM). The USER parameter is your account on the         host machine. The IP/DNS_ADDRESS parameter is the IP or DNS address of your host machine.

### Server Notes

The staging and production servers are both hosted on `360-frontend.gordon.edu` (which runs Windows). This machine is also known as `360React.gordon.edu`, `360train.gordon.edu`, and `360.gordon.edu`.

The backend server is hosted on `cts-360.gordon.edu`. This machine is also known as `360Api.gordon.edu` and `360ApiTrain.gordon.edu` (it also runs the frontend server for the old Ember site, and is thus also known as `360old.gordon.edu`).

#### Making Refresh, URL Entry, and Forward/Back Buttons Work

As noted earlier, gordon-360-ui uses React Router for routing URLs to different views. This works as expected when running the front-end locally with `npm start`. However, when the production build is running on the IIS Server, React Router only handles link clicks; manual URL entry and use of browser navigation buttons results in a 404 error. This is because URLs are sent to the IIS Server (as HTTP requests) before they are handled by React Router. Because none of the URLs correspond to actual directories on the server root, a 404 error results.

To remedy this, a `web.config` file with [these contents](https://gist.githubusercontent.com/lcostea/f17663ebf041b103d98989b6b52d8353/raw/6744846d241c9b785df9054fecbcfc4f2e5dda80/web.config) can be placed in the server's root directory (`D:\wwwroot\360train.gordon.edu`). This file is read by the IIS Server. It provides commands to the URL Rewrite extension (which must be installed in the "Internet Information Services (IIS) Manager" program and can be downloaded from [The Official Microsoft IIS Site](https://www.iis.net/downloads/microsoft/url-rewrite)) which tells the server to reroute all invalid URLs to the server's root directory, eliminating the 404 errors and allowing React Router to handle URLs as expected.

### Editor Recommendations

[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor for this project. This editor is a lightweight IDE that has excellent support for JavaScript and other web languages. It also has a built-in terminal, Git integration, a debugger, and a rich extension ecosystem.

The following extensions are recommended for any code editor used to develop this project, but the links provided are for the VS Code extensions. Many of the extensions listed below are linters, which check code syntax and style to ensure that everyone on the team writies code the same way.

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ensures that indentation style, line endings, and file endings are consistent across editors and operating systems
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) checks syntax correctness for JavaScript (`.js` files)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) checks syntax correctness for Sass (`.scss` files)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) automatically formats JavaScript, Sass, JSON, and Markdown files on save

If you are using VS Code, you can use the following keyboard shortcuts to run the app:

- macOS: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd>
- Windows: <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>B</kbd>

VS Code users will also see a ruler at the 100 character mark, helping the developer to avoid linter warnings by keeping lines under 100 characters long.

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

Environment-specific variables are located in the root directory of the project in the files `.env`, `.env.development` and `.env.production`. `.env` contains variables generic environment variables that are the same in train and production. `.env.development` contains variables for local development and testing. `.env.production` contains overrides of those variables specific to the production environments (360 and 360Train).

To declare variables that should not be checked in to version control, create a file in the root directory called `.env.local`. This file will be ignored by git.

These files are loaded by the scripts that run the development server and build the application. Variables in these files are available globally in the app as `process.env.REACT_APP_VARIABLE_NAME` (assuming one of the `.env` files contains the line `REACT_APP_VARIABLE_NAME=some-value`).

Environment variables must be declared in all caps, must use snake case, and must begin with `REACT_APP_` (ex: `REACT_APP_API_URL` or `REACT_APP_PASSWORD`). Any environment variables that do not begin with `REACT_APP_` will be ignored.

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
