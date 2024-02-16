import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { AsyncPipe, DatePipe, LowerCasePipe, NgClass, NgIf } from "@angular/common";
import { ChatInfoService } from "../../../core/services/chat-info.service";
import { filter, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { ChatInfo } from "../../models/chat-info.model";
import { FirstServerMessage, Message } from "../../models/message.model";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ClientResponseService } from "../../../core/services/client-response.service";
import { MessageFeedback } from "../../enums/message-feeback.enum";
import { DialogService } from "@ngneat/dialog";
import { ContactUsModalComponent } from "../contact-us-modal/contact-us-modal.component";
import { ContactResponse } from "../../models/client-response";

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
  ],
  providers: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  MessageFeedback = MessageFeedback;
  showChat: boolean = true;
  chatInfo$: Observable<ChatInfo> | undefined;
  firstMessage$: Observable<FirstServerMessage> | undefined;
  message$: Observable<Message> | undefined;
  messages: Message[] = [];
  questions$: Observable<string[]> | undefined;
  private unsubscribe$ = new Subject();

  constructor(
    private chatInfoService: ChatInfoService,
    private clientResponseService: ClientResponseService,
    private websocketService: WebSocketService,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initChatData();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  private initChatData(): void {
    this.chatInfo$ = this.chatInfoService.getChatInfo();
    this.firstMessage$ = this.websocketService.firstMessageOnConnection();
    this.message$ = this.websocketService.receiveMessage();
    this.questions$ = this.clientResponseService.getQuestions();

    this.message$?.pipe(
      takeUntil(this.unsubscribe$)
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
      switchMap((data: ContactResponse) => {
        const { email, message } = data;
        return this.clientResponseService.sendContact(email, message);
      }),
    ).subscribe();
  }

  sendQuestion(question: string): void {
    this.websocketService.sendMessage(question);
  }

  sendText(text: string): void {
    this.websocketService.sendMessage(text);
  }

  sendEmail(userId: string, email: string): void {
    this.clientResponseService.sendClientEmail(userId, email).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  sendFeedback(messageId: string, feedback: string, index: number): void {
    this.messages[index].messageId = messageId;
    this.messages[index].feedback = feedback;
    this.messages = [...this.messages];

    this.clientResponseService.sendClientMessageFeedback(messageId, feedback).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }

  isLike(messageId: string, index: number, feedback: string): boolean {
    return  messageId === 'a' + index && feedback === MessageFeedback.like
  }

  isDislike(messageId: string, index: number, feedback: string): boolean {
    return  messageId === 'a' + index && feedback === MessageFeedback.dislike
  }

  private disconnectSocket() {
    this.websocketService.disconnectFromServer();
  }
}
