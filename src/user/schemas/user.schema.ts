import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report.name' }],
  })
  report: Report[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', () => {
  console.log('creating user');
});
