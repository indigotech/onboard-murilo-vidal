import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class UserInputType implements Partial<UserEntity> {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  dateOfBirth!: string;
}
