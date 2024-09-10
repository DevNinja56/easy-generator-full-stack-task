import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration from 'config/index';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

/**
 * The root module of the Nest application.
 */
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        autoIndex: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
