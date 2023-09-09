<h1 align="center">SMSPORTAL</h1>

## ℹ️️ Description

This TypeScript library simplifies interaction with the [SMSPortal](https://docs.smsportal.com/docs/getting-started) API for sending SMS messages. It provides a convenient class, `SmsPortal`, that handles the API authentication and sending of SMS messages, making it easy to integrate SMS functionality into your TypeScript or JavaScript applications.

<br>

## 🔧 How to Install

Install using npm:

```
npm install @kernet/smsportal
```

Install using yarn:

```
yarn add @kernet/smsportal

```
Install using pnpm:

```
pnpm add @kernet/smsportal

```

<br>

## 👨🏻‍🏫 How to Use

### Get full details
```ts
import SmsPortal, { SmsMessage , ApiResponse } from "@kernet/smsportal";

const apiKey = 'your-api-key';
const apiSecret = 'your-api-secret';

const smsClient = new SmsPortal(apiKey, apiSecret);

const messages: SmsMessage[] = [{ content: 'Hello SMS World from NodeJS', destination: phone }]

smsClient.sendSMS(message)
  .then((response: ApiResponse) => {
    console.log("Success:");
    console.log(response);
  })
  .catch(error => {
    console.log("Failure:");
    console.error(error.message);
  });
```

<br>

## 💁🏻 Contributing

This is an open source project. Any contribution would be greatly appreciated!
