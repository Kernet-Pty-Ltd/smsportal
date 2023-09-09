import axios, { AxiosRequestConfig } from 'axios';

export type SmsMessage = {
  content: string;
  destination: string;
}

export type CostBreakdownItem = {
  quantity: number;
  cost: number;
  network: string;
};

export type ErrorReport = {
  noNetwork: number;
  noContents: number;
  duplicates: number;
  optedOuts: number;
  faults: string[]; // Assuming faults is an array of error messages
};

export type ApiResponse = {
  cost: number;
  remainingBalance: number;
  eventId: number;
  sample: string;
  costBreakdown: CostBreakdownItem[];
  messages: number;
  parts: number;
  errorReport: ErrorReport;
};

class SmsPortal {
  private base64Credentials: string;
  private baseUrl: string;

  constructor(public apiKey: string, public apiSecret: string) {
    this.base64Credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    this.baseUrl = 'https://rest.smsportal.com/bulkmessages';
  }

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

export default SmsPortal;
