# Gordon 360 Local Development Documentation

This document describes methods of getting the code in this repository and/or [gordon-360-api](https://github.com/gordon-cs/gordon-360-api) running for development on a local machine or a workstation server.

## Contents

- [Getting Started](#getting-started)
- [Connecting to the Backend](#connecting-to-the-backend)
- [Connecting to a Remote Backend via SSH](#connecting-to-a-remote-backend-via-ssh)

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

## Connecting to Remote Backend via SSH

Sometimes, you would like to connect the frontend on your local computer to the backend on a remote server. For example, if you are running the backend on a CPS Server virtual machine but you want to run the frontend from your own machine. In these cases, you can use a Secure Shell (SSH) Tunnel.

### How it works

- SSH Tunneling opens a connection between two machines and uses the open connection to pass packets back and forth. As long as the connection (or tunnel) is open, traffic can flow through it where it may not have been able to before.
- The Gordon firewall does not allow your local computer to connect to the CPS Server virtual machines for anything other than remote desktops. However, you can create an SSH tunnel in the reverse direction (From the CPS Server to the local machine), then use it to send requests from your local computer.

### Steps:

1. Your local machine must be configured as an SSH host

   [Windows Installation](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui).

   [Ubuntu Installation](ubuntu.com/server/docs/service-openssh)

   MacOS & other Linux distributions should already have an SSH server installed.

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

   - `API_VM_PORT_NUMBER` is the port on which the 360 API is running on the VM.
   - `API_PC_PORT_NUMBER` is the port that you want the API to be sent to on your personal computer (not the VM).
   - `USER` is your account on the host machine.
   - `IP or HOSTNAME` is the IP or HOSTNAME of your host machine.

You are now able to point your local frontend to the remote backend by setting `REACT_APP_API_URL` to `localhost:[API_PC_PORT_NUMBER]`.
