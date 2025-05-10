import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
  private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(name: string, email: string, password: string): Promise<{ token: string }> {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      name,
      email,
      password: hashed,
    });
    return this.login(user.email, password);
  }  

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async logout(): Promise<{ message: string }> {
    return { message: 'Logout realizado com sucesso' };
  }

  async validateUser(email: string): Promise<User | null > {
    return this.userService.findByEmail(email);
  }
}
