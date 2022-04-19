import { ObjectType, Field } from 'type-graphql';
import { UserOutputType } from './user-output.type';

@ObjectType()
export class LoginOutputType {
  @Field()
  user!: UserOutputType;

  @Field()
  token!: string;
}
