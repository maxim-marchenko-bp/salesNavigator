import { Component, DestroyRef, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { AsyncPipe, DatePipe, LowerCasePipe, NgClass, NgIf } from "@angular/common";
import { ChatInfoService } from "../../../core/services/chat-info.service";
import { filter, Observable, switchMap } from "rxjs";
import { ChatInfo } from "../../models/chat-info.model";
import { FirstServerMessage, Message } from "../../models/message.model";
import { ClientResponseService } from "../../../core/services/client-response.service";
import { MessageFeedback } from "../../enums/message-feeback.enum";
import { DialogService } from "@ngneat/dialog";
import { ContactUsModalComponent } from "../contact-us-modal/contact-us-modal.component";
import { ContactResponse } from "../../models/client-response";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { IsLikePipe } from "../../pipes/is-like.pipe";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatInputComponent,
    NgClass,
    AsyncPipe,
    NgIf,
    DatePipe,
    LowerCasePipe,
    SafeHtmlPipe,
    IsLikePipe,
  ],
  providers: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  MessageFeedback = MessageFeedback;
  showChat = true;
  chatInfo$: Observable<ChatInfo> | undefined;
  firstMessage$: Observable<FirstServerMessage> | undefined;
  message$: Observable<Message> | undefined;
  messages: Message[] = [];
  questions$: Observable<string[]> | undefined;

  constructor(
    private chatInfoService: ChatInfoService,
    private clientResponseService: ClientResponseService,
    private websocketService: WebSocketService,
    private dialogService: DialogService,
    private destroyRef: DestroyRef
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
    this.questions$ = this.clientResponseService.getQuestions();

    this.message$?.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(newMessage => {
      this.messages = [...this.messages, newMessage];
      if (this.messagesContainer) {
        setTimeout(() => {
          this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        },0);
      }
    });
  }

  openContactUsDialog(): void {
    this.dialogService.open(ContactUsModalComponent, {
      width: '400px',
      minHeight: 'auto'
    }).afterClosed$.pipe(
      filter(data => data),
      switchMap((data: ContactResponse) => this.clientResponseService.sendContact(data)),
    ).subscribe();
  }

  sendMessage(message: string): void {
    this.websocketService.sendMessage(message);
  }

  sendEmail(userId: string, email: string): void {
    this.clientResponseService.sendClientEmail(userId, email).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  sendFeedback(messageId: string, feedback: string, index: number): void {
    this.messages[index].messageId = messageId;
    this.messages[index].feedback = feedback;
    this.messages = [...this.messages];

    this.clientResponseService.sendClientMessageFeedback(messageId, feedback).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  private disconnectSocket() {
    this.websocketService.disconnectFromServer();
  }
}
