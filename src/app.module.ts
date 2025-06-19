import { Module } from '@nestjs/common';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import jwtConfig from './modules/auth/config/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersModule } from './modules/providers/providers.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { PollingService } from './modules/polling/polling.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PollingModule } from './modules/polling/polling.module';
import { HttpModule } from '@nestjs/axios';
import { MetricsModule } from './modules/metrics/metrics.module';
import { AIModule } from './modules/ai/ai.module';
import { SentryController } from './modules/sentry/sentry.controller';
import aiConfig from './config/ai.config';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      load: [appConfig, jwtConfig, aiConfig],
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    // user can make 100 requests every 15 minutes.
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 5 * 60,
          limit: 200,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    ProvidersModule,
    FeedbacksModule,
    PollingModule,
    FeedbacksModule,
    MetricsModule,
    AIModule,
  ],

  controllers: [AppController, SentryController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PollingService,
  ],
})
export class AppModule {}
