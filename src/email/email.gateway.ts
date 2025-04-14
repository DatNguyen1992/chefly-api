import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { EmailService } from './email.service';

@WebSocketGateway()
export class EmailGateway {
  constructor(private readonly emailService: EmailService) {}

  @SubscribeMessage('watchEmail')
  async handleWatchEmail(@MessageBody() email: string) {
    // Logic thông báo email mới
    console.log('email ', email);
    return email;
  }
}
