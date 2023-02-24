import { ConfigModule, ConfigService } from '@nestjs/config';

export const dbConfig = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return {
      uri: config.get<string>('MONGO_URI'),
    };
  },
};
