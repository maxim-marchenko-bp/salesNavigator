import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { ChatInfo } from "../../shared/models/chat-info.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatInfoService {
  chatInfo: ChatInfo = {
    imageLink: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
    agentName: 'Cognition Agent'
  }

  constructor(private http: HttpClient ) { }

  getChatInfo(): Observable<ChatInfo> {
    return of(this.chatInfo);
  }
}
