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
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportService } from './report.service';

@Serialize(ReportDto)
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Post()
  createReport(@Body() body: CreateReportDto, @currentUser() user: User) {
    return this.service.create(body, user);
  }

  @Get()
  listReports() {
    return this.service.listReport();
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    return this.service.updateReport(id, body);
  }
}
