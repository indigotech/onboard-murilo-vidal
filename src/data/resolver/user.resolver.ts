import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../entity/user.entity';
import { UserInputType } from '../type/user-input.type';
import { UserOutputType } from '../type/user-output.type';
import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  @Query(() => [UserOutputType])
  public users(): Promise<UserOutputType[]> {
    return this.userRepository.find();
  }

  @Mutation(() => UserOutputType)
  async createUser(@Arg('userInput') userInput: UserInputType): Promise<UserOutputType> {
    const user = this.userRepository.create({ ...userInput });

    user.password = bcrypt.hashSync(user.password, 10);

    return this.userRepository.save(user);
  }
}
