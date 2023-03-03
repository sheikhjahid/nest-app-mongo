import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { fileFilter, fileName } from 'src/utils/file-helper';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { ReportService } from './report.service';
import { UpdateReportDto } from './dtos/update-report.dto';
import { PoliciesGuard } from 'src/guards/policies.guard';
import { CheckPolicies } from 'src/decorators/check-permission.decorator';
import { CreateReportHandler } from 'src/utils/handlers/create-report.handler';
import { UpdateReportHandler } from 'src/utils/handlers/update-report.handler';
import { DeleteReportHandler } from 'src/utils/handlers/delete-report.handler';
import { FindReportHandler } from 'src/utils/handlers/find-report.handler';
import { AdminGuard } from 'src/guards/admin.guard';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(
    private reportService: ReportService,
    private userService: UserService,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(new CreateReportHandler())
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        filename: fileName,
        destination: './public/uploads/report',
      }),
      fileFilter: fileFilter,
    }),
  )
  @Post()
  async createReport(
    @Body() body: CreateReportDto,
    @currentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const report = await this.reportService.create(body, user, files);

    await this.userService.updateUser(
      user.id,
      {
        report: report,
      },
      null,
    );

    return report;
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(new FindReportHandler())
  @Get()
  async listReports() {
    return await this.reportService.listReport();
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(new FindReportHandler())
  @Get('/:id')
  async findReport(@Param('id') id: string) {
    return await this.reportService.findReport({ _id: id });
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(new UpdateReportHandler())
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        filename: fileName,
        destination: './public/uploads/report',
      }),
      fileFilter: fileFilter,
    }),
  )
  @Put('/:id')
  async updateReport(
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(body);
    return this.reportService.updateReport(id, body, files);
  }

  @UseGuards(AdminGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteReportHandler())
  @Delete('/:id')
  async deleteReport(@Param('id') id: string) {
    return await this.reportService.deleteReport(id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new UpdateReportHandler())
  @Put('confirm-approval/:id')
  async confirmApproval(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ) {
    return await this.reportService.confirmReport(id, body);
  }
}
