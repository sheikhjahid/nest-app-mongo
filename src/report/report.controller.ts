import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { currentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportService } from './report.service';

// @Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Post()
  create(@Body() body: CreateReportDto, @currentUser() user: User) {
    return this.service.create(body, user);
  }

  @Get()
  listReports() {
    return this.service.listReport();
  }
}
