import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Mailgun from 'mailgun-js';
import { Email } from './schemas/email.schema';

@Injectable()
export class EmailService {
  //   private mg = mailgun({ apiKey: '943400ecf659fd87022197efa4bd1a24-17c877d7-a972715e', domain: 'diaty.com' });
  private mg: Mailgun.Mailgun;
  constructor(@InjectModel(Email.name) private tempEmailModel: Model<Email>) {
    this.mg = Mailgun({
      apiKey: '943400ecf659fd87022197efa4bd1a24-17c877d7-a972715e',
      domain: 'sandbox1640064e04114303ac6dbb770cb34e1a.mailgun.org',
    });
  }

  async generateEmail(): Promise<string> {
    const randomId = Math.random().toString(36).substring(2, 10);
    const email = `${randomId}@sandbox1640064e04114303ac6dbb770cb34e1a.mailgun.org`;
    const newEmail = new this.tempEmailModel({ email, messages: [] });
    await newEmail.save();
    return email;
  }

  async getMessages(email: string): Promise<any[]> {
    const tempEmail = await this.tempEmailModel.findOne({ email });
    return tempEmail ? tempEmail.messages : [];
  }

  async getMessage(email: string, messageId: string): Promise<any> {
    const tempEmail = await this.tempEmailModel.findOne({ email });
    return tempEmail ? tempEmail.messages[parseInt(messageId)] : null;
  }

  async extendEmail(email: string): Promise<void> {
    await this.tempEmailModel.updateOne(
      { email },
      { $set: { createdAt: new Date() } }, // Reset thời gian để gia hạn
    );
  }

  async deleteEmail(email: string): Promise<void> {
    await this.tempEmailModel.deleteOne({ email });
  }

  async receiveEmail(
    email: string,
    message: {
      from: string;
      subject: string;
      content: string;
      isHtml?: boolean;
    },
  ) {
    await this.tempEmailModel.updateOne(
      { email },
      { $push: { messages: { ...message, receivedAt: new Date() } } },
      { upsert: true }, // Tùy chọn: Tạo mới nếu email không tồn tại
    );
  }
}
