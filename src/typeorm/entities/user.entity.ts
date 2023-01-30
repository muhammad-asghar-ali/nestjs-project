import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPost } from './post.entity';
import { UserProfile } from './profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  // one to one relation
  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  // one to many relation
  @OneToMany(() => UserPost, (userPost) => userPost.user)
  post: UserPost[];
}
