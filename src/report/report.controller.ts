import {
  Body,
  Controller,
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
import { AdminGuard } from 'src/guards/admin.guard';
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
import { checkPolicies } from 'src/decorators/check-permission.decorator';
import { CreateReportHandler } from 'src/utils/handlers/create-report.handler';
import { UpdateReportHandler } from 'src/utils/handlers/update-report.handler';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(
    private service: ReportService,
    private userService: UserService,
  ) {}

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
  @UseGuards(PoliciesGuard)
  @checkPolicies(new CreateReportHandler())
  async createReport(
    @Body() body: CreateReportDto,
    @currentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const report = await this.service.create(body, user, files);

    await this.userService.updateUser(
      user.id,
      {
        report: report,
      },
      null,
    );

    return report;
  }

  @Get()
  async listReports() {
    return await this.service.listReport();
  }

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
  @UseGuards(PoliciesGuard)
  @checkPolicies(new UpdateReportHandler())
  async updateReport(
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.service.updateReport(id, body, files);
  }

  @UseGuards(AdminGuard)
  @Put('confirm-approval/:id')
  async confirmApproval(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ) {
    return await this.service.confirmReport(id, body);
  }
}
