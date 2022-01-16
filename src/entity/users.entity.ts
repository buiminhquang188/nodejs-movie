import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { User } from '@interfaces/users.interface';

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

  @Column({ type: 'char', length: 6, nullable: false })
  @IsNotEmpty()
  roleID: string;

  @Column({ type: 'int', nullable: false })
  @IsNotEmpty()
  createdBy: number;

  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  @IsNotEmpty()
  updateBy: number;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
