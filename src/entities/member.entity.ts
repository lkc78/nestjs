import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryColumn({ length: 30 })
  userid: string;

  @Column({ length: 50 })
  userpass: string;

  @Column({ length: 30 })
  nickname: string;

  @Column({ length: 50 })
  email: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}
