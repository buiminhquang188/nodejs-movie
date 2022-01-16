import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  movieName: string;

  @Column({ type: 'datetime', nullable: false })
  startDate: Date;

  @Column({ type: 'tinyint', nullable: false })
  time: number;

  @Column({ type: 'tinyint', nullable: false })
  evaluate: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  poster: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  trailer: string;
}
