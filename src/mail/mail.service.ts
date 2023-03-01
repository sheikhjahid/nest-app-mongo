import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private service: MailerService) {}

  async sendMail(
    email: string,
    subject: string,
    template: string,
    context: any,
  ): Promise<void> {
    await this.service.sendMail({
      to: email,
      subject: subject,
      template: template,
      context: context,
    });
  }
}
