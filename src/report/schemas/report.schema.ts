import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true, default: false })
  approved: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User.name' })
  user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.pre('save', () => console.log('saving report'));
