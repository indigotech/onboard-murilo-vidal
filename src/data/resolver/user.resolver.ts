import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../entity/user.entity';
import { UserInputType } from '../type/user-input.type';
import { UserOutputType } from '../type/user-output.type';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  @Query((returns) => [UserOutputType])
  public users(): Promise<UserOutputType[]> {
    return this.userRepository.find();
  }

  @Mutation((returns) => UserOutputType)
  async createUser(@Arg('userInput') userInput: UserInputType): Promise<UserOutputType> {
    const user = this.userRepository.create({ ...userInput });

    return await this.userRepository.save(user);
  }
}
