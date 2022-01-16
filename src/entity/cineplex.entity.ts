import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CineplexEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  logo: string;
}
