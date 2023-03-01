import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/schemas/user.schema';
@Injectable()
export class MailService {
  constructor(private service: MailerService) {}

  async signup(user: User) {
    await this.service.sendMail({
      to: user.email,
      subject: 'User Signed Up!!',
      template: 'signup',
      context: {
        name: user.name,
      },
    });
  }
}
