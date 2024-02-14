export interface FirstServerMessage {
  message: string,
  messageFrom: string;
  messageType: string;
  timestamp: Date
  initial: boolean;
}

export interface Message {
  userId: string,
  message: string,
  messageFrom: string,
  messageType: string;
  timestamp: Date
}
