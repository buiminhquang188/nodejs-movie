import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaEntity } from './cinema.entity';
import { MovieEntity } from './movie.entity';

@Entity()
export class CinemaMovieEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => CinemaEntity, cinema => cinema.id)
  @Column({ type: 'int', nullable: false })
  cinemaId: number;

  @OneToOne(() => MovieEntity, movie => movie.id)
  @Column({ type: 'int', nullable: false })
  movieId: number;
}
