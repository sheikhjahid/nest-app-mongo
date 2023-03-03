import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/role/schemas/role.schema';

@Schema({ timestamps: true })
export class Permission extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  role: Role;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
