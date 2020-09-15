# verify-serverless

A simple demo of Twilio's Verify call and sms functionality.

## Technology used
 * [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit)
 * [Twilio Verify](https://www.twilio.com/verify)
 * [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
 
 ## Configure .ENV
 
 * ACCOUNT_SID= Your primary Twilio account identifier - find this in the [Console](https://www.twilio.com/console)
 * AUTH_TOKEN= Used to authenticate - just like the above, you'll [find this here](https://www.twilio.com/console)
 * VERIFY_SERVICE=Create a verify service [here](https://www.twilio.com/console/verify/services)
 
 ## Run
 
To Run Functions Locally

```
npm install

npm start
```

To Deploy Functions to your account

```
npm run deploy or twilio serverless:deploy
```
