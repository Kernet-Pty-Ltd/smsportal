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

