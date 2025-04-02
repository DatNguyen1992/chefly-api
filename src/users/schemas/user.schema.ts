import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@shared/schemas/base.schema';

@Schema({
  collection: 'users',
})
export class User extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop()
  image?: string;

  @Prop()
  password?: string;

  @Prop()
  provider?: string;

  @Prop()
  providerId?: string;

  @Prop()
  pinCode?: string;

  @Prop()
  avatar?: string;

  @Prop()
  refreshToken?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  curPlanType?: string;

  @Prop()
  curPlanStatus?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
