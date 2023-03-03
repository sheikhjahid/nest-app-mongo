import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Permission } from 'src/permission/schemas/permission.schema';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permission: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
