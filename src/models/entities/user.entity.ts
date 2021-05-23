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

  @Column()
  Type: UserRoles;

  @Column('simple-json')
  Location: { Lat: number; Long: number };

  @Column()
  Contact: string;

  @Column()
  Age: string;

  @Column()
  Language: string;

  @Column()
  Country: string;

  @Column()
  City: string;

  @Column()
  ProfileImg: string;

  @Column({ default: null })
  IsVendor: boolean ;

  @Column()
  Salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.Salt);

    return hash === this.Password;
  }
}
