import { Session } from '../../sessions/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'session_votes' })
export class SessionVotes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  movie_id: number;

  @Column()
  session_id: string;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
