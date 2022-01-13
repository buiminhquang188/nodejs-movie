import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShowTimeEntity } from './showTime.entity';

@Entity()
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;

  @Column()
  price: number;

  @Column()
  type: string;

  @OneToOne(() => ShowTimeEntity, showTime => showTime.id)
  @Column()
  showTimeId: string;
}
