# Connecting to Remote Backend via SSH

Sometimes, you would like to connect the frontend on your local computer to the backend on a remote server. For example, if you are running the backend on a CPS Server virtual machine but you want to run the frontend from your own machine. In these cases, you can use a Secure Shell (SSH) Tunnel.

## How it works

- SSH Tunneling opens a connection between two machines and uses the open connection to pass packets back and forth. As long as the connection (or tunnel) is open, traffic can flow through it where it may not have been able to before.
- The Gordon firewall does not allow your local computer to connect to the CPS Server virtual machines for anything other than remote desktops. However, you can create an SSH tunnel in the reverse direction (From the CPS Server to the local machine), then use it to send requests from your local computer.

## Steps:

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
