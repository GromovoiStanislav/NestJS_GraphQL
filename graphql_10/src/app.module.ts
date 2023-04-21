import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "node:path";
import { CoffeeModule } from "./coffee/coffee.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DateScalar } from "./common/scalars/date.scalar";
import { Tea } from "./teas/entities/tea.entity";
import { DrinksResolver } from "./drinks/drinks.resolver";
import { PubSubModule } from "./pub-sub/pub-sub.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
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
      synchronize: true,
      logging: ["query"]
    }),
    CoffeeModule,
    PubSubModule
  ],
  controllers: [AppController],
  providers: [DateScalar, DrinksResolver]
})
export class AppModule {
}
