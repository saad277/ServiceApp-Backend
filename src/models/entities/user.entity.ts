import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserRoles } from '../../user/user.roles.enum';
import { UserStatus } from '../../user/user.status.enum';

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

  @Column('simple-json', { default: null })
  Location: { Lat: number; Long: number };

  @Column()
  Contact: string;

  @Column({ default: null })
  Age: string;

  @Column({ default: null })
  Language: string;

  @Column({ default: null })
  Country: string;

  @Column({ default: null })
  City: string;

  @Column({ default: null })
  ProfileImg: string;

  @Column({ default: null })
  IsVendor: boolean;

  @Column()
  Salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);

    return hash === this.Password;
  }
}
