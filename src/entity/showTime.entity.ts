import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaEntity } from './cinema.entity';

@Entity()
export class ShowTimeEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'datetime', nullable: false })
  startTime: Date;

  @OneToOne(() => CinemaEntity, cinema => cinema.id)
  @Column({ type: 'varchar', length: 30, nullable: false })
  cinemaId: string;
}
