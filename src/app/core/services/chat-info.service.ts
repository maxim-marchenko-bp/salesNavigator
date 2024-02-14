import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ChatInfo } from "../../shared/models/chat-info.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatInfoService {
  constructor(private http: HttpClient ) { }

  getChatInfo(): Observable<ChatInfo> {
    return this.http.get<ChatInfo>('http://localhost:3000/chat-info');
  }
}
