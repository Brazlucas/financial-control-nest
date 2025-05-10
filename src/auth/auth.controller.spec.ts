import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({
      user: {
        name: 'Lucas',
        email: 'lukkascomics@gmail.com',
        isAdmin: false,
      }
    }),
    login: jest.fn().mockResolvedValue({
      user: {
        name: 'Lucas',
        email: 'lukkascomics@gmail.com',
        isAdmin: false,
      },
      token: 'mocked-jwt-token',
    }),
    logout: jest.fn().mockResolvedValue({ message: 'Logged out successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user and return user response', async () => {
    const result = await controller.register({
      name: 'Lucas',
      email: 'lucas@email.com',
      password: '123456',
      isAdmin: false,
    });

    expect(result).toEqual(result);
    expect(authService.register).toHaveBeenCalledWith(
      'Lucas',
      'lucas@email.com',
      '123456',
      false
    );
  });

  it('should login and return user response and a token', async () => {
    const result = await controller.login({
      email: 'lucas@email.com',
      password: '123456',
    });

    expect(result).toEqual({
      user: {
        name: 'Lucas',
        email: 'lukkascomics@gmail.com',
        isAdmin: false,
      },
      token: 'mocked-jwt-token'
    });
  });

  it('should logout and return a message', async () => {
    const result = await controller.logout();

    expect(result).toEqual({ message: 'Logged out successfully' });
    expect(authService.logout).toHaveBeenCalled();
  });
});
