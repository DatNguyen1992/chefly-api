import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BaseSchema extends Document {
  @ApiProperty()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseSchema);
