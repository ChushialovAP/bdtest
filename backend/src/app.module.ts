import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService, AppGateway],
})
export class AppModule {}
