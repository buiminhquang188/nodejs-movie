import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from './users.entity';

@Entity()
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, user => user.id)
  @Column()
  userId: number;

  @OneToOne(() => MovieEntity, movie => movie.id)
  @Column()
  movieId: number;
}
