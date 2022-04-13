import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { UserEntity } from '../entity/user.entity';

@InputType()
export class UserInputType implements Partial<UserEntity> {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*\d)(?=.*[a-z]).*$/, {
    message: 'password should be at least 6 characters long and have at least 1 letter and 1 digit',
  })
  @Field()
  password!: string;

  @Field()
  dateOfBirth!: Date;
}
