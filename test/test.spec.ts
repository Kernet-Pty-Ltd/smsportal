import SmsPortal from '../src';
import { beforeEach, describe, expect, test, vi } from 'vitest'
import * as dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Mock Axios for testing purposes
vi.mock('axios');

// Define your test cases
describe('SmsPortal', () => {
  const apiKey = process.env.API_KEY || '';
  const apiSecret = process.env.API_SECRET || '';
  const phone = process.env.PHONE || '';
  const smsClient = new SmsPortal(apiKey, apiSecret);
  const messages = [{ content: 'Hello SMS World from NodeJS', destination: phone }]

  test('should send an SMS successfully', async () => {
    // Mock Axios.post to return a successful response
    axios.post = vi.fn().mockRejectedValueOnce
      ({ sample: 'Hello SMS World from NodeJS' });

    const response = await smsClient.sendSMS(messages);
    expect(response).toContain({ sample: 'Hello SMS World from NodeJS' });
  });

  test('should handle API errors', async () => {
    // Mock Axios.post to simulate an API error
    axios.post = vi.fn().mockRejectedValueOnce({ response: { data: 'API error message' } });

    try {
      await smsClient.sendSMS(messages);
    } catch (error) {
      expect(error.message).toEqual('API error message');
    }
  });

  test('should handle network errors', async () => {
    // Mock Axios.post to simulate a network error
    axios.post = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    try {
      await smsClient.sendSMS(messages);
    } catch (error) {
      expect(error.message).toEqual('Something went wrong during the network request.');
    }
  });
});

