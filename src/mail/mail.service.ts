import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtp(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      template: './otp',
      context: {
        otp,
      },
    });
  }

  async sendNewLoginNotification(email: string, ip: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'New Login Detected',
      template: './new-login',
      context: {
        ip,
      },
    });
  }
}
