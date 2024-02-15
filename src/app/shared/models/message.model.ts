export interface FirstServerMessage {
  message: string,
  messageFrom: string;
  messageType: string;
  timestamp: Date
  initial: boolean;
}

export interface Message {
  userId: string,
  messageId: string,
  message: string,
  feedback: string,
  messageFrom: string,
  messageType: string;
  timestamp: Date
}
