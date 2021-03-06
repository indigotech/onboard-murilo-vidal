import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../entity/user.entity';
import bcrypt from 'bcrypt';
import { InvalidDataError } from '../../error/invalid-data.error';
import { UserInput } from '../type/user-input.type';
import { User } from '../type/user.type';
import { LoginInput } from '../type/login-input.type';
import { Login } from '../type/login.type';

@Resolver()
export class UserResolver {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  @Query(() => [User])
  public users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(() => User)
  async createUser(@Arg('userInput') userInput: UserInput): Promise<User> {
    if ((await this.userRepository.find({ where: { email: userInput.email } })).length > 0) {
      throw new InvalidDataError('This email already exists');
    }
    const user = this.userRepository.create({ ...userInput });

    user.password = bcrypt.hashSync(user.password, 10);

    return this.userRepository.save(user);
  }

  @Mutation(() => Login)
  async login(@Arg('loginInput') loginInput: LoginInput): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userRepository.findOne({ where: { email: loginInput.email } });

    if (user && (await bcrypt.compare(loginInput.password, user.password))) {
      return {
        user,
        token: 'the_token',
      };
    } else {
      throw new InvalidDataError('Incorrect password or email.');
    }
  }
}
