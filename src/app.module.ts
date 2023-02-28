import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from 'db/dbConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ReportModule } from './report/report.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
@Module({
  imports: [
    MongooseModule.forRootAsync(dbConfig),
    UserModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private config: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.config.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
