import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { Report } from './schemas/report.schema';
@Injectable()
export class ReportService {
  constructor(@InjectModel(Report.name) private model: Model<Report>) {}

  async create(payload: CreateReportDto, user: User) {
    const reportModel = new this.model({ ...payload, user: user });

    return await reportModel.save();
  }

  async listReport(condition: any = {}) {
    return await this.model
      .find(condition)
      .sort({ created_at: -1 })
      .populate('user', null, User.name)
      .exec();
  }

  async findReport(condition: { [index: string]: string } = {}) {
    return await this.model
      .findOne(condition)
      .populate('user', null, User.name)
      .exec();
  }

  async updateReport(id: string, payload: UpdateReportDto) {
    const reportModel = await this.findReport({ _id: id });
    reportModel.approved = payload.approved;

    return await reportModel.save();
  }
}
