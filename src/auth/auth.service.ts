import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJWT(user: User): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }
}
