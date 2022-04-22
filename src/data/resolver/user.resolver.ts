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
import { AuthenticationService } from '../../auth/authentication.service';
import { QueryUserInput } from '../type/query-user-input.type';
import { InternalServerError } from '../../error/internal-server.error';

@Resolver()
export class UserResolver {
  authenticationService: AuthenticationService;
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    this.authenticationService = new AuthenticationService(userRepository);
  }

  @Query(() => [User])
  public users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(() => User)
  public async user(@Arg('queryUserInput') queryUserInput: QueryUserInput): Promise<User> {
    if (!(await this.authenticationService.verifyToken(queryUserInput.token))) {
      throw new InvalidDataError('Unauthorized.');
    }

    return this.userRepository.findOneOrFail(queryUserInput.id);
  }

  @Mutation(() => User)
  async createUser(@Arg('userInput') userInput: UserInput): Promise<User> {
    if (!(await this.authenticationService.verifyToken(userInput.token))) {
      throw new InvalidDataError('Unauthorized');
    }

    if ((await this.userRepository.find({ where: { email: userInput.email } })).length > 0) {
      throw new InvalidDataError('This email already exists');
    }

    const user = this.userRepository.create({ ...userInput });

    user.password = bcrypt.hashSync(user.password, 10);

    return this.userRepository.save(user);
  }

  @Mutation(() => Login)
  async login(@Arg('loginInput') loginInput: LoginInput): Promise<Login> {
    const authCredentials = await this.authenticationService.auth(loginInput);
    const login = new Login();

    login.token = authCredentials.token;
    login.user = authCredentials.user;
    //TODO Change UserEntity 'birthDate' to DateTime type as it is mapped as a Date by Typeorm, unlike the type Date that gets mapped as string
    login.user.birthDate = new Date(authCredentials.user.birthDate);

    return login;
  }
}
