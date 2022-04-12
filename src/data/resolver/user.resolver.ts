import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../entity/user.entity';
import { UserInputType } from '../type/user-input.type';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  @Query((returns) => [UserEntity])
  public users(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  @Mutation((returns) => UserEntity)
  async createUser(@Arg('UserEntity') userInput: UserInputType): Promise<UserEntity> {
    const user = this.userRepository.create({ ...userInput });

    return await this.userRepository.save(user);
  }
}
