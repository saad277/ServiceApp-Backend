import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRoles } from '../user/user.roles.enum';
import { UserStatus } from '../user/user.status.enum';
import { UserDetails } from './user.details.entity';

@Entity()
@Unique(['UserName', 'Email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @Column()
  UserName: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column({ default: UserStatus.PendingVerification })
  Status: UserStatus;

  @Column()
  Type: UserRoles;

  @Column()
  Contact: string;

  @Column()
  Salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);

    return hash === this.Password;
  }
}
