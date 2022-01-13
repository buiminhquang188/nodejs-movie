import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaEntity } from './cinema.entity';

@Entity()
export class ShowTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @OneToOne(() => CinemaEntity, cinema => cinema.id)
  @Column()
  cinemaId: string;
}
