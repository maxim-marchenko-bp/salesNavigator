import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket!: Socket;
  constructor() {
    // // TODO: replace real address
    // this.webSocket = new Socket({
    //   url: "wss://echo.websocket.org",
    //   options: {},
    // });
  }

  connectToServer(): void {
    this.webSocket.connect();
  }

  sendMessage(message: string): void {
    this.webSocket.emit('message', message);
  }

  receiveMessage(): Observable<unknown> {
    return this.webSocket.fromEvent('message');
  }

  disconnectFromServer(): void {
    this.webSocket.disconnect();
  }
}
