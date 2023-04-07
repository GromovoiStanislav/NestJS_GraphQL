import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {StudentModule} from './student/student.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import config from "./mikro-orm.config";


@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true
        }),
        MikroOrmModule.forRoot(config),
        StudentModule,
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
