import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
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
      .populate('user')
      .sort({ created_at: -1 });
  }
}
