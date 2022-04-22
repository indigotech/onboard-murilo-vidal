import { IsString, Matches, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class QueryUserInput {
  @Field()
  id!: number;

  @Field()
  token!: string;
}
