import { User } from '../../users/entities/user.entity';
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

@Entity({ name: 'session_members' })
export class SessionMembers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true, nullable: false })
  is_connected: boolean;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
