import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { AsyncPipe, DatePipe, LowerCasePipe, NgClass, NgIf } from "@angular/common";
import { ChatInfoService } from "../../../core/services/chat-info.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ChatInfo } from "../../models/chat-info.model";
import { FirstServerMessage, Message } from "../../models/message.model";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatInputComponent,
    NgClass,
    AsyncPipe,
    NgIf,
    DatePipe,
    LowerCasePipe
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  showChat = true;
  chatInfo$: Observable<ChatInfo> | undefined;
  firstMessage$: Observable<FirstServerMessage> | undefined;
  message$: Observable<Message> | undefined;
  messages$ = new BehaviorSubject<Message[]>([]);

  constructor(
    private chatInfoService: ChatInfoService,
    private websocketService: WebSocketService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initChatData();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }

  private initChatData(): void {
    this.chatInfo$ = this.chatInfoService.getChatInfo();
    this.firstMessage$ = this.websocketService.firstMessageOnConnection();
    this.message$ = this.websocketService.receiveMessage();

    this.message$?.subscribe(newMessage => {
      this.messages$?.next([...this.messages$.getValue(), newMessage]);
      if (this.messagesContainer) {
        setTimeout(() => {
          this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        },0);
      }
    });
  }

  sendText(text: string): void {
    this.websocketService.sendMessage(text);
  }

  sendEmail(email: string): void {
    console.log('send email: ', email)
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private disconnectSocket() {
    this.websocketService.disconnectFromServer();
  }
}
