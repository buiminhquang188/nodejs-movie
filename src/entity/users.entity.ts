import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';

@Entity()
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  roleID: string;

  @Column()
  @IsNotEmpty()
  createdBy: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
