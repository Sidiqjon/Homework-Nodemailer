import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [    
    ConfigModule.forRoot({
    isGlobal: true, 
  }),
    PrismaModule, CategoryModule, ProductModule, UserModule, AuthModule, MailModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
