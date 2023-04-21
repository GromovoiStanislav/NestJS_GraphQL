import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { UserInputError } from "@nestjs/apollo";


@Catch(UserInputError)
export class UserInputErrorExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Cathing exception');
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}