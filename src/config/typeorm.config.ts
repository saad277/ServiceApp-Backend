import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DATA_BASE_HOST'),
      port: configService.get('DATA_BASE_PORT'),
      username: configService.get('DATA_BASE_USERNAME'),
      password: configService.get('DATA_BASE_PASSWORD'),
      database: configService.get('DATA_BASE_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsRun: true,
     // logging: true,
      migrationsTableName: 'custom_migration_table',
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'migration',
      },
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    };
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
};
