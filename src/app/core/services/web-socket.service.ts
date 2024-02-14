import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from "rxjs";
import { FirstServerMessage, Message } from "../../shared/models/message.model";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private webSocket: Socket) {}

  sendMessage(message: string): void {
    this.webSocket.emit('message', message);
  }

  firstMessageOnConnection(): Observable<FirstServerMessage> {
    return this.webSocket.fromEvent('onConnection');
  }

  receiveMessage(): Observable<Message> {
    return this.webSocket.fromEvent('messageFromServer');
  }

  disconnectFromServer(): void {
    this.webSocket.disconnect();
  }
}
