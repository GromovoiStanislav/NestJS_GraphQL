import {Module} from "@nestjs/common";
import {PetsModule} from "./pets/pets.module";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {join} from "node:path";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OwnersModule} from './owners/owners.module';
import {AppController} from "./app.controller";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {DataLoaderInterceptor} from 'nestjs-dataloader'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql")
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            autoLoadEntities: true,
            synchronize: true,
            logging: true
        }),
        PetsModule,
        OwnersModule],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: DataLoaderInterceptor,
        },
    ]
})
export class AppModule {
}
