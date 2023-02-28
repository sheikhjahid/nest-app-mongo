import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report, ReportSchema } from './schemas/report.schema';
@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    MulterModule.register({
      dest: './public/uploads/report',
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
