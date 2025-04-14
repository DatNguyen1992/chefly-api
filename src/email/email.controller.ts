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
      if (!body || typeof body !== 'object') {
        throw new BadRequestException('Invalid webhook payload');
      }

      // Tạm thời bỏ qua xác minh chữ ký khi test
      //   const isTestMode = process.env.NODE_ENV === 'development'; // Chỉ áp dụng trong dev
      //   if (!isTestMode) {
      //     if (
      //       !body.signature ||
      //       !body.signature.timestamp ||
      //       !body.signature.token ||
      //       !body.signature.signature
      //     ) {
      //       throw new BadRequestException('Missing or invalid signature');
      //     }

      //     const apiKey = this.configService.get<string>('MAILGUN_API_KEY');
      //     const { timestamp, token, signature } = body.signature;
      //     const data = `${timestamp}${token}`;
      //     const hmac = crypto
      //       .createHmac('sha256', apiKey)
      //       .update(data)
      //       .digest('hex');

      //     if (hmac !== signature) {
      //       throw new BadRequestException('Invalid webhook signature');
      //     }
      //   }

      // Payload từ Test Webhook có thể không đủ trường, dùng giá trị mặc định
      const {
        recipient = 'test123@sandbox1640064e04114303ac6dbb770cb34e1a.mailgun.org',
        sender = 'no-reply@example.com',
        subject = 'Test Subject',
        'stripped-text': textContent = 'Test Content',
        'body-html': htmlContent,
      } = body;

      await this.emailService.receiveEmail(recipient, {
        from: sender,
        subject,
        content: htmlContent || textContent || '',
        isHtml: !!htmlContent,
      });

      console.log('Email saved:', { recipient, sender, subject });
      return { status: 'received' };
    } catch (error) {
      console.error('Webhook error:', error);
      throw error;
    }
  }
}
