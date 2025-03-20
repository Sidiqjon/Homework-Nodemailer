// import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateUserDto } from '../user/dto/create-user.dto';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private jwtService: JwtService) {}

//   async register(dto: CreateUserDto) {
//     const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
//     if (userExists) throw new ConflictException('Email already in use');

//     const hashedPassword = await bcrypt.hash(dto.password, 10);
//     await this.prisma.user.create({
//       data: {
//         name: dto.name,
//         email: dto.email,
//         password: hashedPassword,
//         role: dto.role ?? 'USER',
//       },
//     });

//     return { message: 'User registered successfully' };
//   }

//   async login(email: string, password: string, ip: string) {
//     const user = await this.prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const existingSession = await this.prisma.session.findFirst({
//       where: { userId: user.id, ip },
//     });

//     if (!existingSession) {
//       await this.prisma.session.create({
//         data: {
//           userId: user.id,
//           ip,
//         },
//       });
//     }

//     const token = this.jwtService.sign({ id: user.id, role: user.role });
//     return { accessToken: token };
//   }
// }


// auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(dto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (userExists) throw new ConflictException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role ?? 'USER',
      },
    });

    await this.mailService.sendOtp(dto.email, otp);

    return { message: 'User registered successfully. OTP sent to email.' };
  }

  async login(email: string, password: string, ip: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const existingSession = await this.prisma.session.findFirst({
      where: { userId: user.id, ip },
    });

    if (!existingSession) {
      await this.prisma.session.create({
        data: {
          userId: user.id,
          ip,
        },
      });
      await this.mailService.sendNewLoginNotification(email, ip);
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { accessToken: token };
  }
}
