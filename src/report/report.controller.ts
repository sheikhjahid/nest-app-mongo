import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportService } from './report.service';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(
    private service: ReportService,
    private userService: UserService,
  ) {}

  @Post()
  async createReport(@Body() body: CreateReportDto, @currentUser() user: User) {
    const report = await this.service.create(body, user);

    await this.userService.updateUser(user.id, {
      report: report,
    });

    return report;
  }

  @Get()
  async listReports() {
    return await this.service.listReport();
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  async updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    return await this.service.updateReport(id, body);
  }
}
