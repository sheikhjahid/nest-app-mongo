import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.pre('save', () => console.log('saving report'));
