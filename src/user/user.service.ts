import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = this.userRepo.find();
    if (!users) throw new NotFoundException('No users found');
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  async update(id: number, data: Partial<User>): Promise<UpdateResult> {
    return this.userRepo.update(id, data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }
}
