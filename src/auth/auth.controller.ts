import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
/**
 * Controller per le operazioni CRUD relative all'entità User
 */
@Controller('/auth')
export class AuthController {
  /**
   * Costruttore
   * @param authService servizio per la gestione degli user iniettato tramite dependecy injection
   */
  constructor(private authService: AuthService) {}

  /**
   * Crea un nuovo User
   * @param authCredentialsDto Dto per le credenziali di uno user
   * @returns Promise operazione
   */
  @Post('/signup')
  public signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  /**
   * Esegui un login
   * @param authCredentialsDto Dto per le credenziali di uno user
   * @returns Promise con il token JWT
   */
  @Post('/signin')
  public signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /**
   * Request di test per testsare le guard è l'autorizzazione tramite JWT
   * @param req richiesta http
   */
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
