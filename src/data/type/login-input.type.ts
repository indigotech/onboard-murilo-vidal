import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class LoginInputType {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
