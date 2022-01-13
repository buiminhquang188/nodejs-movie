import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CineplexEntity } from './cineplex.entity';

@Entity()
export class CinemaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @OneToOne(() => CineplexEntity, cineplex => cineplex.id)
  @Column()
  cineplexId: number;
}
