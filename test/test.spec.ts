import SmsPortal from '../src';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Mock Axios for testing purposes
jest.mock('axios');

// Define your test cases
describe('SmsPortal', () => {
  const apiKey = process.env.API_KEY || '';
  const apiSecret = process.env.API_SECRET || '';
  const smsClient = new SmsPortal(apiKey, apiSecret);
  const messages = [{ content: 'Hello SMS World from NodeJS', destination: 'Your test phone number' }]

  it('should send an SMS successfully', async () => {
    // Mock Axios.post to return a successful response
    axios.post = jest.fn().mockRejectedValueOnce
      ({ data: { status: 'success', message: 'SMS sent' } });

    const response = await smsClient.sendSMS(messages);
    expect(response).toEqual({ status: 'success', message: 'SMS sent' });
  });

  it('should handle API errors', async () => {
    // Mock Axios.post to simulate an API error
    axios.post = jest.fn().mockRejectedValueOnce({ response: { data: 'API error message' } });

    try {
      await smsClient.sendSMS(messages);
    } catch (error) {
      expect(error.message).toEqual('API error message');
    }
  });

  it('should handle network errors', async () => {
    // Mock Axios.post to simulate a network error
    axios.post = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    try {
      await smsClient.sendSMS(messages);
    } catch (error) {
      expect(error.message).toEqual('Something went wrong during the network request.');
    }
  });
});

