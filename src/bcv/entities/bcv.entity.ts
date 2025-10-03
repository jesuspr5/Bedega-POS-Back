
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bcv')
export class Bcv {
 @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column('decimal', { precision: 12, scale: 2 })
  value: number;
}