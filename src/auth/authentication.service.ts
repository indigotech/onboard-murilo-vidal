import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserEntity } from '../data/entity/user.entity';
import { LoginInput } from '../data/type/login-input.type';
import { InternalServerError } from '../error/internal-server.error';
import { InvalidDataError } from '../error/invalid-data.error';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';

export class AuthenticationService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async auth(login: LoginInput): Promise<{ token: string; user: UserEntity }> {
    let expiresIn = authConfig.expires;
    try {
      const user = await this.userRepository.findOne({ where: { email: login.email } });

      if (!user || !(await bcrypt.compare(login.password, user.password))) {
        throw new InvalidDataError('Incorrect email or password');
      }
      const token = sign(
        {
          id: user.id,
          name: user.name,
        },
        authConfig.secret,
        {
          expiresIn: login.rememberMe ? '7d' : authConfig.expires,
        },
      );

      return { token: token, user: user };
    } catch (e) {
      throw new InternalServerError('Failed to autenticate.');
    }
  }
}
