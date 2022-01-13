import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieName: string;

  @Column()
  startDate: Date;

  @Column()
  time: number;

  @Column()
  evaluate: number;

  @Column()
  poster: string;

  @Column()
  trailer: string;
}
