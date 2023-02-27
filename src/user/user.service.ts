import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from 'src/report/schemas/report.schema';
import { SignUpDto } from './dtos/signup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { User } from './schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async create(body: SignUpDto) {
    const userModel = await new this.model(body);
    return await userModel.save();
  }

  async listUser(condition: any = {}) {
    return await this.model
      .find(condition)
      .sort({ created_at: -1 })
      .populate('report', null, Report.name)
      .exec();
  }

  async findUser(payload: { [index: string]: string }) {
    return await this.model
      .findOne(payload)
      .populate('report', null, Report.name)
      .exec();
  }

  async updateUser(id: string, body: Partial<UpdateProfileDto>) {
    const userModel = await this.findUser({ _id: id });
    userModel.email = body.email;
    userModel.name = body.name;
    userModel.password = body.password;
    return await userModel.save();
  }
}
