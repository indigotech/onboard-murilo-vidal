import { IsString, Matches, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class UserInput implements Partial<UserEntity> {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?=.*\d)(?=.*[a-z]).*$/, {
    message: 'Password must be at least 6 characters long and must be alphanumeric.',
  })
  @Field()
  password!: string;

  @Field()
  birthDate!: Date;

  @Field()
  token?: string;
}
