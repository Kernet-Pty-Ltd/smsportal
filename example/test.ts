import SmsPortal from '../lib/';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.API_SECRET || '';
const phone = process.env.PHONE || '';
const messages = [{ content: 'Hello SMS World from NodeJS', destination: phone }]

const smsClient = new SmsPortal(apiKey, apiSecret);

console.log(apiKey, phone)

smsClient.sendSMS(messages)
  .then(response => {
    console.log("Success:");
    console.log(response);
  })
  .catch(error => {
    console.log("Failure:");
    console.error(error.message);
  });
