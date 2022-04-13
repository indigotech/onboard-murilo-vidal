import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserOutputType {
  @Field((type) => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  dateOfBirth!: string;
}
