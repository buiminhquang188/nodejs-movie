import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShowTimeEntity } from './showTime.entity';

@Entity()
export class SeatEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'smallint', nullable: false })
  price: number;

  @Column({ type: 'char', length: 6, nullable: false })
  type: string;

  @OneToOne(() => ShowTimeEntity, showTime => showTime.id)
  @Column({ type: 'varchar', length: 30, nullable: false })
  showTimeId: string;
}
