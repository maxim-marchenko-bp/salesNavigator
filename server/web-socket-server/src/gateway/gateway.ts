import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { OnModuleInit } from "@nestjs/common";
import { Server } from "socket.io"

@WebSocketGateway(8080,
  {
    cors: {
      origin: ['http://localhost:4200'],
      credentials: true
    }
  })
export class WsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleEvents(client: any, data: string): any {
    this.server.emit('messageFromServer', {
      userId: client.id,
      message: data,
      messageFrom: 'client',
      messageType: 'text',
      timestamp: new Date()
    })

    if (data?.toLowerCase() === 'pricing') {
      const botAnswer: string = `
        Our pricing plans are as follows:<br>
        <ul>
          <li>Personal plan: $0/month (10 free messages per sign-up)</li>
          <li>Basic plan: $99/month (1000 messages per month)</li>
          <li>Professional plan: $499/month (10 free messages per sign-up)</li>
        </ul>
        Yearly subscription offer 2 months free. For more details, visit
        <a href="https://cognitiion.io/pricing" target="_blank">https://cognitiion.io/pricing</a>
      `;
      this.server.emit('messageFromServer', {
        userId: client.id,
        message: botAnswer,
        messageFrom: 'bot',
        messageType: 'price',
        timestamp: new Date()
      });
    } else {
      this.server.emit('messageFromServer', {
        userId: client.id,
        message: `Your message is ${data}`,
        messageFrom: 'bot',
        messageType: 'text',
        timestamp: new Date()
      })
    }
  }

  onModuleInit(): void {
    this.server.on('connection', (socket) => {
      setTimeout(() => {
        this.server.emit('onConnection', {
          message: 'Hi! I\'m support bot',
          messageFrom: 'bot',
          messageType: 'text',
          timestamp: new Date(),
          initial: true
        })
      }, 500)
    })
  }
}
