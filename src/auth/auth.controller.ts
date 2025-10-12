import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    if (!token) throw new UnauthorizedException('Credenciales incorrectas');
    return token;
  }
}
