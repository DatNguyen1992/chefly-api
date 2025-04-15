import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@shared/schemas/base.schema';

@Schema({
  collection: 'histories',
})
export class History extends BaseSchema {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  qr: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  value: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
