import { ObjectType, Field } from 'type-graphql';
import { User } from './user.type';

@ObjectType()
export class Login {
  @Field()
  user!: User;

  @Field()
  token!: string;
}
