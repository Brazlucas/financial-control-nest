import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<User> {
    return this.authService.register(dto.name, dto.email, dto.password, dto.isAdmin);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ token: string, user: User }> {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('logout')
  logout(): Promise<{ message: string }> {
    return this.authService.logout();
  }
}
