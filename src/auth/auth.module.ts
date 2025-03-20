import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '60m' },
    }),
    MailModule,
  ],
  providers: [AuthService, PrismaService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
