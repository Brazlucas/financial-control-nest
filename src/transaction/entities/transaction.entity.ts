import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

export type CategoryType = 'ENTRY' | 'EXIT';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  type: CategoryType;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.transactions, { eager: true })
  user: User;

  @ManyToOne(() => Category, (category) => category.transactions, { eager: true })
  category: Category;
}
