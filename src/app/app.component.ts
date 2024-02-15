import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from "./shared/components/chat/chat.component";
import { HttpClientModule } from "@angular/common/http";
import { ChatInfoService } from "./core/services/chat-info.service";
import { ClientResponseService } from "./core/services/client-response.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ChatComponent, HttpClientModule ],
  providers: [ ChatInfoService, ClientResponseService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ai-assistant';
}
