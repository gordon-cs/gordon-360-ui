End to End Hello World Proposal

Our milestone is to connect to the backend by modifying the front end and send data to the backend and get a response. 
There is a lot of code that was shared with us so we will try to go through and understand it before writing our own version.

## Changes to the UI
We will add a simple button to the homepage. When the button is clicked, it will send a request to the API, which will then send back a response.
## Changes to the API
We will create a new API route specifically for this test: `[api-root]/jobs/hello-world`.
## Location of test servers
During development, we will run a test back-end on CS-RDSH-02. Our hope is to run a virtual machine on a CS-owned hypervisor that we can use for our staging deployments.
