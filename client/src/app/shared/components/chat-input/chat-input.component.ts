import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Input() placeholder = 'Write your message...';
  @Input() bgColor = '#FFFFFF'
  @Input() inputType: 'text' | 'email' = 'text'
  @Output() sendText = new EventEmitter<string>();

  text: string = '';

  sendMessage(): void {
    this.sendText.emit(this.text);
    this.text = '';
  }
}
