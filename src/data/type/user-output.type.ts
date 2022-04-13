import { ObjectType, Field, ID } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@ObjectType()
export class UserOutputType implements Partial<UserEntity> {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  dateOfBirth!: Date;
}
