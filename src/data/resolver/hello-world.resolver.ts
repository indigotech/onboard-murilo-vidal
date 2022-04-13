import { Resolver, Query } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@Resolver((of) => UserEntity)
export class HelloWorldResolver {
  @Query((returns) => String)
  public helloWorld(): string {
    return 'Hello, world!';
  }
}
