import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { Report } from './schemas/report.schema';
import { UpdateReportDto } from './dtos/update-report.dto';
@Injectable()
export class ReportService {
  constructor(@InjectModel(Report.name) private model: Model<Report>) {}

  async create(
    payload: CreateReportDto,
    user: User,
    files: Array<Express.Multer.File>,
  ) {
    let filePaths = [];
    if (files !== undefined && files.length > 0) {
      filePaths = files.map((file) => 'uploads/report/' + file.filename);
    }

    const reportModel = new this.model({
      ...payload,
      user: user,
      attachments: filePaths,
    });
    return await reportModel.save();
  }

  async listReport(condition: any = {}) {
    return await this.model
      .find(condition)
      .sort({ created_at: -1 })
      .populate('user');
  }

  async findReport(condition: { [index: string]: string } = {}) {
    return await this.model.findOne(condition).populate('user');
  }

  async updateReport(
    id: string,
    payload: Partial<UpdateReportDto>,
    files: Array<Express.Multer.File>,
  ) {
    const reportModel = await this.findReport({ _id: id });

    reportModel.title = payload?.title || reportModel.title;
    reportModel.description = payload?.description || reportModel.description;
    reportModel.price = payload?.price || reportModel.price;
    if (files.length > 0) {
      const formattedFilePaths = files.map(
        (file) => 'uploads/report/' + file.filename,
      );
      reportModel.attachments = [
        ...reportModel.attachments,
        ...formattedFilePaths,
      ];
    }

    return await reportModel.save();
  }

  async confirmReport(id: string, payload: ApproveReportDto) {
    const reportModel = await this.findReport({ _id: id });
    reportModel.approved = payload.approved;

    return await reportModel.save();
  }
}
