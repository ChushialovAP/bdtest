import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
