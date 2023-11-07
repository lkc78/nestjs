import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Group {
  @Transform((params) => params.value.trim())
  @Column({ length: 30 })
  @PrimaryColumn()
  groupcode: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 30 })
  groupname: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
