import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CineplexEntity } from './cineplex.entity';

@Entity()
export class CinemaEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  image: string;

  @OneToOne(() => CineplexEntity, cineplex => cineplex.id)
  @Column({ type: 'int', nullable: false })
  cineplexId: number;
}
