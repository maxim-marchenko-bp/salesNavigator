import { Controller, Get } from '@nestjs/common';

interface ChatInfo {
  imageLink: string;
  agentName: string;
}

@Controller()
export class AppController {
  constructor() {}

  @Get('/chat-info')
  getChatInfo(): ChatInfo {
    return {
      imageLink: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
      agentName: 'Cognition Agent'
    }
  }
}
