export class CreateUserDto {
  name: string;
  email: string;
  isAdmin?: boolean;
  password: string;
}
