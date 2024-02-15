import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailDto } from "./dto/email.dto";
import { MessageFeedbackDto } from "./dto/message-feedback.dto";
import { ContactDto } from "./dto/contact-dto";

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

  @Get('/questions')
  getQuestions(): string[] {
    return [
      'How can I return my order?',
      'What is your return policy?'
    ]
  }

  @Post('/contact-us')
  contactUs(@Body() contactDto: ContactDto): ContactDto {
    return contactDto;
  }

  @Post('/email')
  saveEmail(@Body() emailDto: EmailDto): EmailDto {
    return emailDto;
  }

  @Post('/message-feedback')
  saveMessageFeedback(@Body() messageFeedbackDto: MessageFeedbackDto): MessageFeedbackDto {
    return messageFeedbackDto;
  }
}
