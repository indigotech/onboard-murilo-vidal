import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HelloWorldResolver {
  @Query((returns) => String)
  public helloWorld(): string {
    return 'Hello, world!';
  }
}
