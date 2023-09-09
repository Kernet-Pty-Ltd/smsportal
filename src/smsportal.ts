import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, SmsMessage } from './models';

export class SmsPortal {
  private base64Credentials: string;
  private baseUrl: string;

  /**
   * @param apiKey 
   * @param apiSecret 
   */
  constructor(private apiKey: string, private apiSecret: string) {
    this.base64Credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    this.baseUrl = 'https://rest.smsportal.com/bulkmessages';
  }

  /**
   * Send Bulk sms
   * @param messages 
   */
  sendSMS(messages: SmsMessage[]): Promise<ApiResponse> {
    const requestData = {
      messages
    };

    const requestHeaders: AxiosRequestConfig = {
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`,
        'Content-Type': 'application/json',
      },
    };

    return axios.post<ApiResponse>(this.baseUrl, requestData, requestHeaders)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          throw new Error(error.response.data);
        } else {
          throw new Error('Something went wrong during the network request.');
        }
      });
  }
}

