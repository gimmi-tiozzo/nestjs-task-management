import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

/**
 * Repository per per le operazioni CRUD sull'entity User
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Crea un nuovo utente a DB
   * @param authCredentialsDto Dto per le credenziali di uno user
   * @returns Promise operazione
   */
  public async createUSer(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(`user ${username} already exists`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }
}
