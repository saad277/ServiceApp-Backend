import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRoles } from '../../user/user.roles.enum';

@Entity()
@Unique(['UserName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @Column()
  UserName: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column({ type: 'enum', enum: UserRoles })
  Type: UserRoles;

  @Column()
  Salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);

    return hash === this.Password;
  }
}
