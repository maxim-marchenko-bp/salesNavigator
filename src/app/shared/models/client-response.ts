export interface EmailResponse {
  userId: string;
  email: string;
}

export interface ContactResponse {
  email: string;
  message: string;
}

export interface MessageFeedbackResponse {
  messageId: string;
  feedback: 'LIKE' | 'DISLIKE';
}
