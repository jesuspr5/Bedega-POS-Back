import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
  const user = await this.usersService.findByEmail(email);


  if (user && await bcrypt.compare(pass, user.password)) {
    const { password, ...result } = user;
    return result; 
  }

  return null;
}

    async login(user: any) {
      const payload = { username: user.email, sub: user.id };
      
      // devolvemos solo los datos necesarios
      return {
        token: this.jwtService.sign(payload),
        user: {
          name: user.name,
          email: user.email,
        },
      };
    }

    }
