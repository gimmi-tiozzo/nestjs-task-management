import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

/**
 * Servizio per le operazioni CRUD relative allo User
 */
@Injectable()
export class AuthService {
  /**
   * Costruttore
   * @param userRepository Repository per l'accesso alle operazioni CRUD per l'entità User
   * @param jwtService Servizio per la gestione del token JWT
   */
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Crea un nuovo utente a DB
   * @param authCredentialsDto Dto per le credenziali di uno user
   * @returns Promise operazione
   */
  public signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUSer(authCredentialsDto);
  }

  /**
   * Esegui un login
   * @param authCredentialsDto Dto per le credenziali di uno user
   * @returns Promise con il token JWT
   */
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }
}
