# Gordon 360 Local Development Documentation

This document describes methods of getting the code in this repository and/or [gordon-360-api](https://github.com/gordon-cs/gordon-360-api) running for development on a local machine or a workstation server.

## Contents

- [Getting Started](#getting-started)
- [Starting the Front End](#starting-the-front-end)
- [Connect to Local Backend](#connect-react-to-local-backend)
- [Connect to Backend via SSH](#connect-to-backend-via-ssh)
- [Editor Recommendations](#editor-recommendations)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)

## Getting Started

Make sure Node.js is set up on your machine. If you are on one of the 'CPS Server #' virtual RDSH machines, it should be setup already. To check if it is on a machine, open a terminal and run the command `nvm`. If the output says `'nvm' is not recognized...`, then Node.js has not been setup. In that case, follow the below procedures to install nvm (Node Version Manager) onto the machine. An npm installation may also work, but nvm will allow easier installation and use of this particular version.

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

- If a developer accidentally follows the above Windows instructions on one of the 'CPS Server #' virtual RDSH machines, the environment variable for NVM will be set by their installation to a path within their user directory. Thus, many if not all other users on the machine will lose access to NVM. To fix this, any user can open Powershell as administrator and run `choco install -y nvm`. (The `-y` option answers `yes` to any prompts that occur during the installation.) Then, in a Powershell terminal not running as admin, run `nvm install --lts`. Users should log out and back in to see the fix take effect. As usual, you can check if this worked by opening a terminal and running the command `nvm`. If the output says `Running version...`, then it is all set.

- Sometimes, the .json package management files in develop are missing a dependency and `npm install` throws an error. The error says something like "This is most likely not a problem with npm itself...and is related to npm not being able to find a file". The best solution we have found is to delete the whole `node_modules` directory, delete the file `package-lock.json`, and then run `npm install`. Warning, the deletions can take several minutes because they are large files.

### Starting the Front End

After cloning this repo, and after any major changes to local code (like changing branches) run:

- `npm install` (This gets the right packages installed in the directory)
- `npm start` (This starts a local server, and prints the local URL)

When running the app, it will open in a browser at http://localhost:3000.

### Connect React to Local Backend
  
There are some cases where you may want to  develop the front end on your local machine but using a specific API branch that is neither in develop nor production. There are generally two use cases for doing this:
- To test something developed on backend without having to run the front end on the virtual machine
- To develop the front end against a backend that is in development (ex. a project not yet complete)

By default, React will use the live 360ApiTrain.gordon.edu backend to allow seamless front-end development. This API address uses the code that is currently in the `develop` branch. If you would like to run the backend locally and connect to the UI, use the following steps:

- After connecting to the virtual machine and setting up the backend, as [documented in gordon-360-api](https://github.com/gordon-cs/gordon-360-api/blob/develop/Local%Development.md#running-the-api-locally),

  - Clone the UI repository if you do not have it open on the virtual machine already.
  - Open the repo in Visual Studio Code (VS Code).
  - Open `.env.development`. You will see three sets of environment variables, marked `@PROD`, `@TRAIN`, and `@LOCALHOST`. Ensure that the `@PROD` and `@TRAIN` variables are commented out, and that `@LOCALHOST` is not commented out. Then set `REACT_APP_API_URL` equal to `http://localhost:NNNN/`, where `NNNN` is the port your backend is listening on (e.g. `51627`).
  - Ensure that at least one `REACT_APP_FONT_URL` from either `@PROD` or `@TRAIN` is not commented out.
  - You do not need to change `.env.production`.

- Now, you are ready to work on the frontend.

- In some scenarios, (for example, when someone has made custom changes to the backend which you also want to use) it is preferable to skip setting up your own backend and connect to someone else's. To do this, make sure you are on the virtual machine. Then, just follow the above directions, replacing the port number you chose with the port number on which their backend is listening.

### Connect to Backend via SSH

  If you would like to run the front-end on your local computer, and the back-end on a remote server (but you do not want to use one of the develop or production branches), SSH offers a feature to allow this.
  
#### How it works

- SSH Tunneling opens a connection between two machines and uses the open connection to pass packets back and forth. As long as the connection (or tunnel) is open, traffic can flow through it where it may not have been able to before.
- Since the Gordon firewall does not allow your local computer to get to the 'CPS Server #' virtual machines for anything other than remote desktops, you can create an SSH tunnel in the reverse direction, then use it to send requests from your local computer.

#### Steps:

1. Your local machine must be configured as an SSH host
    
    [Windows Installation](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui).
  
    [Ubuntu Installation](https://ubuntu.com/server/docs/service-openssh)
  
    MacOS & other Linux distributions should already have OPENSSH-SERVER installed.

2. Create the SSH tunnel

    After setting up the ssh server on your host machine, find your host IP or DNS address. Open a command prompt or terminal window and enter the following:
    ```
    hostname
    ```
    Log into the VM and open a command prompt/powershell window. n command prompt/terminal window enter the following command, 
    ```
    ssh -R localhost:[API_VM_PORT_NUMBER]:localhost:[API_PC_PORT_NUMBER] [USERNAME]@[IP or HOSTNAME]
    ```
    Parameter description:
    - API_VM_PORT_NUMBER is the port on which the 360 API is running on the VM.
    - API_PC_PORT_NUMBER is the port that you want the API to be sent to on your personal computer (not the VM).
    - The USER parameter is your account on the host machine.
    - The IP or HOSTNAME parameter is the IP or HOSTNAME of your host machine.

You are now able to point your local front-end to localhost:[API_PC_PORT_NUMBER] and see the 360 API that is running on the virtual machine.

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
  
## Environment Variables

Environment-specific variables are located in the root directory of the project in the files `.env`, `.env.development` and `.env.production`. `.env` contains variables generic environment variables that are the same in train and production. `.env.development` contains variables for local development and testing. `.env.production` contains overrides of those variables specific to the production environments (360 and 360Train).

To declare variables that should not be checked in to version control, create a file in the root directory called `.env.local`. This file will be ignored by git.

These files are loaded by the scripts that run the development server and build the application. Variables in these files are available globally in the app as `process.env.REACT_APP_VARIABLE_NAME` (assuming one of the `.env` files contains the line `REACT_APP_VARIABLE_NAME=some-value`).

Environment variables must be declared in all caps, must use snake case, and must begin with `REACT_APP_` (ex: `REACT_APP_API_URL` or `REACT_APP_PASSWORD`). Any environment variables that do not begin with `REACT_APP_` will be ignored.
