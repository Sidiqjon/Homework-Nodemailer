import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from '../auth/auth.module'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtAuthGuard],
  exports: [CategoryService, JwtAuthGuard],
})
export class CategoryModule {}
