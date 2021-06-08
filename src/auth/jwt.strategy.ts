import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

/**
 * Classe che definisce la strategia di controllo del token JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Costruttore
   * @param userRepository Repository per l'accesso alle operazioni CRUD per l'entità User
   */
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'topsecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Valida se utente è presente a DB
   * @param payload Payload del tocken JWT
   * @returns Promise con lo user
   */
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
