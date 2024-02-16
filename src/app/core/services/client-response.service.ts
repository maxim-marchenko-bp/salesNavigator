import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ContactResponse, EmailResponse, MessageFeedbackResponse } from "../../shared/models/client-response";

@Injectable({
  providedIn: 'root'
})
export class ClientResponseService {

  constructor(private http: HttpClient ) { }

  getQuestions(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/questions');
  }

  sendContact(body: ContactResponse): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('http://localhost:3000/contact-us', body);
  }

  sendClientEmail(userId: string, email: string): Observable<EmailResponse> {
    return this.http.post<EmailResponse>('http://localhost:3000/email', { userId, email });
  }

  sendClientMessageFeedback(messageId: string, feedback: string): Observable<MessageFeedbackResponse> {
    return this.http.post<MessageFeedbackResponse>('http://localhost:3000/message-feedback', { messageId, feedback });
  }
}
