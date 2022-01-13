import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaEntity } from './cinema.entity';
import { MovieEntity } from './movie.entity';

@Entity()
export class CinemaMovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CinemaEntity, cinema => cinema.id)
  @Column()
  cinemaId: number;

  @OneToOne(() => MovieEntity, movie => movie.id)
  @Column()
  movieId: number;
}
