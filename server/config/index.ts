import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  PORT: +process.env.PORT || 3001,
  MONGO: {
    URL: process.env.MONGO_URI || '',
    logging: false,
    synchronize: true,
    migrationsRun: false,
    autoLoadEntites: true,
    entities: ['dist/src/modules/**/entities/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
  },
  JWT: {
    JWT_SECRET_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    JWT_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '',
    JWT_SECRET_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    JWT_REFRESH_TOKEN_EXPIRATION:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '',
  },
  
});
