import { ObjectType, Field, ID, Int } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@ObjectType()
export class UserOutputType implements Partial<UserEntity> {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  birthDate!: Date;
}
