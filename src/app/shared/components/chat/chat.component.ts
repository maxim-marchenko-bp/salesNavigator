import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { ChatInfoService } from "../../../core/services/chat-info.service";
import { Observable } from "rxjs";
import { ChatInfo } from "../../models/chat-info.model";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatInputComponent,
    NgClass,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  showChat = true;
  chatInfo$: Observable<ChatInfo> | undefined;

  constructor(
    private chatInfoService: ChatInfoService,
    private websocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.chatInfo$ = this.chatInfoService.getChatInfo();
    // this.initSocketConnection();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }

  sendText(text: string): void {
    console.log('send text: ', text)
  }

  sendEmail(email: string): void {
    console.log('send email: ', email)
  }

  private initSocketConnection(): void {
    this.websocketService.connectToServer();
  }

  private sendMessage(): void {
    this.websocketService.sendMessage('hello');
  }

  private receiveMessage(): void {
    this.websocketService.receiveMessage().subscribe(receivedMessage => {
      console.log(receivedMessage);
    });
  }

  private disconnectSocket() {
    this.websocketService.disconnectFromServer();
  }
}
