import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { CoffeeModule } from "./coffee/coffee.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DateScalar } from "./common/scalars/date.scalar";
import { Tea } from "./teas/entities/tea.entity";
import { DrinksResolver } from './drinks/drinks.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      buildSchemaOptions: {
        // numberScalarMode:'integer',
        // dateScalarMode: "timestamp",
        orphanedTypes: [Tea]
      }
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ":memory:",
      autoLoadEntities: true,
      synchronize: true
    }),
    CoffeeModule
  ],
  controllers: [AppController],
  providers: [DateScalar, DrinksResolver]
})
export class AppModule {
}
