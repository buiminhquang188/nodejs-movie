import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CineplexEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;
}
