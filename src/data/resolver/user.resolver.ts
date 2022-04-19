import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../entity/user.entity';
import { UserInputType } from '../type/user-input.type';
import { UserOutputType } from '../type/user-output.type';
import bcrypt from 'bcrypt';
import { InvalidDataError } from '../../error/invalid-data.error';
import { LoginInputType } from '../type/login-input.type';
import { LoginOutputType } from '../type/login-output.type';

@Resolver()
export class UserResolver {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  @Query(() => [UserOutputType])
  public users(): Promise<UserOutputType[]> {
    return this.userRepository.find();
  }

  @Mutation(() => UserOutputType)
  async createUser(@Arg('userInput') userInput: UserInputType): Promise<UserOutputType> {
    if ((await this.userRepository.find({ where: { email: userInput.email } })).length > 0) {
      throw new InvalidDataError('This email already exists');
    }
    const user = this.userRepository.create({ ...userInput });

    user.password = bcrypt.hashSync(user.password, 10);

    return this.userRepository.save(user);
  }
  @Mutation(() => LoginOutputType)
  async login(@Arg('loginInput') loginInput: LoginInputType): Promise<LoginOutputType> {
    return {
      user: {
        id: 1,
        name: 'User Name',
        email: 'User e-mail',
        birthDate: new Date('04-25-1990'),
      },
      token: 'the_token',
    };
  }
}
