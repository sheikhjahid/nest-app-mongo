import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Report } from 'src/report/schemas/report.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 6 })
  password: string;

  @Prop({ required: false, default: false })
  admin: boolean;

  @Prop({ required: false, default: null })
  picUrl: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }] })
  report: Report[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', () => {
  console.log('creating user');
});
