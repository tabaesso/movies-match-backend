import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'session' })
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  isOpen: boolean;

  @Column()
  category: string;

  @Column({ nullable: true })
  movie_id: number;

  @Column({ nullable: true, default: false })
  started: boolean;

  @Column({ nullable: true })
  owner: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'owner' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
