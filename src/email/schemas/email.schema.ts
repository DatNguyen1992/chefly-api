import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@shared/schemas/base.schema';

@Schema({
  collection: 'emails',
})
export class Email extends BaseSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: [
      {
        from: { type: String, required: true },
        subject: { type: String, required: true },
        content: { type: String, required: true },
        receivedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  messages: Array<{
    from: string;
    subject: string;
    content: string;
    receivedAt: Date;
  }>;

  @Prop({ default: Date.now, expires: 600 })
  expiresAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
