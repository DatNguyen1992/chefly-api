import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('generate')
  async generateEmail() {
    return { email: await this.emailService.generateEmail() };
  }

  @Get(':email/messages')
  async getMessages(@Param('email') email: string) {
    return await this.emailService.getMessages(email);
  }

  @Get(':email/messages/:messageId')
  async getMessage(
    @Param('email') email: string,
    @Param('messageId') messageId: string,
  ) {
    return await this.emailService.getMessage(email, messageId);
  }

  @Post(':email/extend')
  async extendEmail(@Param('email') email: string) {
    await this.emailService.extendEmail(email);
    return { message: 'Email extended' };
  }

  @Delete(':email')
  async deleteEmail(@Param('email') email: string) {
    await this.emailService.deleteEmail(email);
    return { message: 'Email deleted' };
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    try {
      // Kiểm tra body có tồn tại và hợp lệ
      if (!body || typeof body !== 'object') {
        throw new BadRequestException('Invalid webhook payload');
      }

      // Kiểm tra signature
      if (
        !body.signature ||
        !body.signature.timestamp ||
        !body.signature.token ||
        !body.signature.signature
      ) {
        throw new BadRequestException('Missing or invalid signature');
      }

      // Xác minh chữ ký Mailgun
      const apiKey = '943400ecf659fd87022197efa4bd1a24-17c877d7-a972715e';
      const signature = body.signature;
      console.log('Signature:', signature);
      const data = `${signature.timestamp}${signature.token}`;
      const hmac = crypto
        .createHmac('sha256', apiKey)
        .update(data)
        .digest('hex');

      if (hmac !== signature.signature) {
        throw new BadRequestException('Invalid webhook signature');
      }

      // Kiểm tra các trường cần thiết
      const { recipient, sender, subject, 'stripped-text': content } = body;
      if (!recipient || !sender || !subject) {
        throw new BadRequestException(
          'Missing required fields: recipient, sender, or subject',
        );
      }

      // Lưu email
      await this.emailService.receiveEmail(recipient, {
        from: sender,
        subject,
        content: content || '',
      });

      return { status: 'received' };
    } catch (error) {
      console.error('Webhook error:', error);
      throw error; // Ném lỗi để client nhận được chi tiết
    }
  }
}
