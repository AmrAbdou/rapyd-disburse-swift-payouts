# Swift Payout with Rapyd Disburse API 
A simple Node.js application to send Swift payout to international customers using Rapyd Disburse API which allows businesses to issue international payments using the Swift method.

## What do you need to start
- Rapyd Account (https://dashboard.rapyd.net/sign-up).
- In order for webhooks to work properly, it is necessary to expose the corresponding port of your computer to the outside world. You can use the ngrok application (https://ngrok.com) which will generate a random web address for you and redirect all traffic to a specified port on your local machine.
- Node.js and npm.

## How to run a sample application
- Log in to your Rapyd account
- Make sure you are using the panel in "sandbox" mode (switch in the top right part of the panel)
- Go to the "Developers" tab. You will find your API keys there. Copy them to the .env file.
- Go to the "Webhooks" tab and enter the URL where the application listens for events. In this application routes, it is "https://{YOUR_BASE_URL}/payment-complete" and mark which events should be reported to your app
- Clone this repository.
- Open a terminal in the cloned directory and run "npm install"
- In the same terminal window, run "nodemon index.js".
- Turn on your browser and go to "http://localhost:3000"
