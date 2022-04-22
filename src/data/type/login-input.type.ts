import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ defaultValue: false })
  rememberMe?: boolean;
}
