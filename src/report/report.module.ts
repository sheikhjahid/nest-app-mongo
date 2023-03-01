import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report, ReportSchema } from './schemas/report.schema';
@Module({
  imports: [
    UserModule,
    MailModule,
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    MulterModule.register({
      dest: './public/uploads/report',
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
