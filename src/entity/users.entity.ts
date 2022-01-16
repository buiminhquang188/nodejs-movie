import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, VersionColumn, DeleteDateColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';
import { Roles } from '@/utils/enum';

@Entity()
@Unique(['email'])
export class UserEntity implements User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsNotEmpty()
  password: string;

  @Column({ type: 'char', default: Roles.USER, length: 6, nullable: false })
  @IsNotEmpty()
  roleID: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: number;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
