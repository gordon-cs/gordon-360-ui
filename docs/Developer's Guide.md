# Developer's Guide

This guide walks you through the basics of developing the Gordon 360 frontend, all the way from setting up an initial development environment to deploying changes to production.

# Contents

- [Getting Started](#getting-started)
- [Connecting to the Backend](#connecting-to-the-backend)
  - [Connecting to a Remote Backend via HTTP](#connecting-to-a-remote-backend-via-http)
  - [Connecting to a Remote Backend via SSH](#connecting-to-a-remote-backend-via-ssh)
- [Code Style](#code-style)
- [Project File Organization](#file-organization)
  - [Components](#components)
  - [Contexts and Hooks](#contexts-and-hooks)
  - [Services](#services)
  - [Views](#views)
- [Libraries](#libraries)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)

# Getting Started

Here are the steps to setup the frontend for development:

1. Clone this repository to the machine that you will develop on.  This can be done via HTTPS or SSH.  Summer Practicum developers typically use the SSH method; use these instructions to [create a SSH public-private keypair](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key) and [add the public key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).  (For more info, check out https://help.github.com/articles/connecting-to-github-with-ssh/)

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

# Connecting to the Backend

The project is configured to connect to the backend running at `https://360apitrain.gordon.edu` by default. This should be sufficient for developing the frontend. However, if you are testing/developing backend changes, you will want to connect to a backend that is running in Visual Studio.

After following [the instructions to start the backend](https://github.com/gordon-cs/gordon-360-api#running-the-api-locally), take note of the URL that the API is listening at, e.g. `https://localhost:51626`.

1. Open `.env.development`. You will see three sets of environment variables, marked `@PROD`, `@TRAIN`, and `@LOCALHOST`.
1. Ensure that the `@PROD` and `@TRAIN` variables are commented out, and that `@LOCALHOST` is not commented out.
1. Set `VITE_APP_API_URL` equal to `http://localhost:NNNN/`, where `NNNN` is the port your backend is listening on (e.g. `51626`).

You do **not** need to change `.env.production`.

Sometimes, you would like to connect the frontend on your local computer to the backend on a remote server. For example, if you are running the backend on a CPS Server virtual machine but you want to run the frontend from your own machine. There are two ways to do this: via HTTP/s or via SSH

## Connecting to a Remote Backend via HTTP
### How it works
- CTS has opened the firewall between campus internet (wifi, building ethernets, etc) and the RD-CPS servers to allow web traffic over a range of ports.

### Steps:
1. Update `Gordon360/Properties/launchSettings.json` with the name of the server you are on (`RD-CPS-01.gordon.edu` or `RD-CPS-02.gordon.edu`) wherever you see `localhost`. Also pick two new (unique to you) ports within the range `51620-51660` to use instead of `51627` and `51626`. Replace the ports as well.
2. Update `Gordon360/appsettings.Development.json` with your hostname (see above) in the AllowedHosts field, separating multiple entries with a `;`. It will then look something like `"AllowedHosts": "localhost;RD-CPS-01.gordon.edu"`.
3. Run the API.
4. On your local UI repository, change `.env.development` to use the hostname of the server from above and your *non-SSL* port chosen above. Please note that SSL (https://) will not work as the certificate is not trusted.
5. Run the UI and confirm that it does not have any proxy errors.


## Connecting to a Remote Backend via SSH
### How it works

- SSH Tunneling opens a connection between two machines and uses the open connection to pass packets back and forth. As long as the connection (or tunnel) is open, traffic can flow through it where it may not have been able to before.
- The Gordon firewall does not allow your local computer to connect to the CPS Server virtual machines for anything other than remote desktops. However, you can create an SSH tunnel in the reverse direction (From the CPS Server to the local machine), then use it to send requests from your local computer.

### Steps:

1. Your local machine must be configured as an SSH host

   [Windows Installation](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui).
   
   - If you are on Windows 11+, you may need to update the firewall to allow inbound connections on a public network.
      - Search for `Check Firewall Status` in the start menu
      - Click `Turn Windows Defender Firewall on or off`
      - Uncheck `Block all incoming connections, including...` under the `Public network settings` header
      - Click Ok
   - Also on Windows, if you are a local administrator, you will not be able to use SSH key authentication unless you add the public SSH key to `C:\Program Data\ssh\administrators_authorized_keys` rather than to `C:\Users\[your username]\.ssh\authorized_keys`. Create the file if it does not exist.

   [Ubuntu Installation](ubuntu.com/server/docs/service-openssh)

   MacOS & other Linux distributions should already have an SSH server installed.
   
   On MacOS, you may have to enable the SSH server in System Preferences. Follow [these instructions](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac) to do so.

2. Create the SSH tunnel

   After setting up the ssh server on your host machine, find your host IP or DNS address. Open a command prompt or terminal window and enter the following:

   ```
   hostname
   ```

   Log into the VM and open a command prompt/powershell window. n command prompt/terminal window enter the following command,

   ```
   ssh -R localhost:[API_VM_PORT_NUMBER]:localhost:[API_PC_PORT_NUMBER] [USERNAME]@[IP or HOSTNAME]
   ```

   where:

   - `API_VM_PORT_NUMBER` is the port that you selected for the API on the virtual machine like `http://localhost:[API_VM_PORT_NUMBER]`. Please make sure to use the non-HTTPS version as HTTPS does not work over the SSH tunnel.
   - `API_PC_PORT_NUMBER` is the port that you want the API to be sent to on your personal computer. Feel free to use the same port as above for this one.
   - `USER` is your account on the host machine.
   - `IP or HOSTNAME` is the IP or HOSTNAME of your host machine. You can find this on Windows by typing `ipconfig`, on Linux or Mac with `ifconfig`

You are now able to point your local frontend to the remote backend by setting `VITE_APP_API_URL` to `http://localhost:[API_PC_PORT_NUMBER]` in the `.env.development` file.

# Code Style

This project uses [Prettier](https://prettier.io/), an "opinionated code formatter," to automatically format JavaScript, JSON, Sass, and Markdown files according to a common style.

The advantage of using a code formatter is consistency between developers. Using ESLint with a strict style guide is one approach to consistency, but it still requires developer effort to fix code according to the ESLint rules. Prettier takes care of this without any effort from the developers.

Prettier is used as a pre commit hook in this repository. This means that it will automatically format any staged code before it is committed. It can also be used as an [extension for your editor](https://prettier.io/docs/en/editors.html). This repository includes a setup for VS Code: when the extension is installed, files will be formatted automatically every time they are saved.

ESLint and Stylelint are used in conjunction with Prettier to catch syntax errors, but not to check code style - that is taken care of solely by Prettier.

# File Organization

The source files for the app are in `./src`. The other top-level folders are as follows:

- `.github` contains configuration for GitHub Actions, which is used for maintenance, security, and CI/CD tasks.
- `.husky` contains pre-commit hooks to enforce consistent formatting.
- `.vscode` contains configuration for Visual Studio Code
- `docs` contains supplemental documentation.
- `build` contains the built application; not tracked by Git
- `node_modules` contains dependencies installed by `npm`; not tracked by Git
- `public` contains assets that should not be processed by Webpack. Only files inside `public` can be used from `public/index.html`.

The structure of the `src` directory is as follows:

```plain
├── components
│   └── ...
├── contexts
│   └── ...
├── hooks
│   └── ...
├── services
│   └── ...
├── views
│   └── ...
├── app.js
├── index.js
└── pwa.js
```

## Components

```plain
components
├── ...
├── EventList
│   ├── components
│   │   └── ...
│   ├── EventList.module.scss
│   └── index.js
└── ...
```

This folder contains components that, when used together, make up the views of the application. Each component should be small and focus on doing **one thing well**. Read about the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/) for a useful perspective on writing small, reusable components and composing them into larger areas of functionality.

Each component must have a folder named in PascalCase (also known as upper camel case) containing a file called `index.js`. Using that filename allows the component to be imported by folder, instead of by file: `import MyComponent from 'components/MyComponent` instead of `import MyComponent from 'components/MyComponent/my-component`.

A component folder can contain any resources needed by the component, such as images and CSS files.

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

## Contexts and Hooks

These folders contain units of re-usable code that are specific to React but are not components.

Contexts are used in React to manage state across components without passing it as props through many layers.

Hooks are used to encapsulate state-management functions. React provides basic hooks, like `useState` and `useEffect`, but it is useful to build custom hooks on top of these basic hooks to encapsulate more complicated actions.

## Services

This folder contains modules that provide reusable functionality to components across the application.

In general, **components should not handle anything other than displaying and interacting with data**. Any "heavy lifting" should be done in services or on the backend. For example, HTTP requests to the API, filtering a list of events, or parsing a date should take place in a service.

**Services should be framework-agnostic.** This app should be able to switch to Vue or Angular without changing any of the services.

## Views

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

This folder contains components that make up the discrete views of the application, for example "home," "login," and "edit activity." Each view uses the same folder structure as components in `src/components`. Each view represents a route defined in `src/app.js`. The route's path should be similar to the name of the component, such as `ActivityEdit` having a path of `/activity/:activityId/edit`.

Similar to component folders, a view folder can have its own `components` folder containing components that only apply to that view. If a component in one of these folders ends up being useful to another view, it should move all the way up to `src/components` to be shared by both views.

# Libraries

The libraries used in this project, listed here for easy reference with short descriptions and links to each library's homepage.

**NOTE**: this list is out-of-date. Please update it when you read this.

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

# Continuous Integration and Deployment

GitHub Actions is our Continuous Integration and Continuous Deployment (CI/CD) solution. It is a GitHub product available for free to our public, open source repository.

GHA uses [workflows](.github/workflows), which are YAML files that describe jobs to run when events occur in GitHub. The current workflow, in `ci.yml`, is called `Lint and Build`.
This workflow runs everytime a commit is pushed to a branch in GitHub. It lints and builds these commits to ensure they are satisfactory for our project. Additionally, when commits are pushed to the `develop` or `master` branches (which should only be via pull requests because they are protected branches), this workflow will save the build artifacts on GitHub. These artifacts can be found by navigating to Actions in the repo and selecting a workflow run for one of those branches.

These uploaded artifacts are vital to our CD solution. Because GitHub Actions are running on ephemeral cloud servers, we have no way of securely giving them access to push files
to the 360 server. Instead, deployment uses a powershell script that is run via a scheduled task on the 360 server. The `Deploy 360Train` and `Deploy 360Prod` scheduled tasks both run the powershell script `Deploy360FrontEnd.ps1`, located at `D:\Scripts\Deploy` in the 360 frontend server. This script polls GitHub for new builds of the appropriate branch, and if it finds any builds that are newer than the most recent deployment, it will download the new build, backup the existing build, and overwrite the site's files with the new build. Transcripts from each deployment can be found at `D:\Scripts\Deploy\Transcripts`.

## Deploying to Production

1.  On the [repository's home page on GitHub](https://github.com/gordon-cs/gordon-360-ui), click "New pull request."
1.  Change the "base" branch of the pull request to `master`. The "compare" branch should be set to `develop` by default.
1.  Enter a title starting with "RELEASE:" (optional, but useful for quickly finding releases in the Git history) and containing a brief summary of the changes that the release brings.
1.  Add reviewers. The pull request must be approved before it can be merged.
1.  Click "Create pull request."
1.  When the pull request is approved, merge it. This will trigger a build that will automatically deploy `master` to production.

## Deploying Manually

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
