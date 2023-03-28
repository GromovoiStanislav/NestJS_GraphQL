import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ConfigService],
      // @ts-ignore
      useFactory:  async (config: ConfigService) => ({
        type: config.get<string>('DB_CONNECTION'),
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        port: config.get<number>('DB_PORT'),
        //entities: [ __dirname + 'dist/**/*.entity{.ts,.js}' ],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),

    }),
    UsersModule,
  ],
})
export class AppModule {}
