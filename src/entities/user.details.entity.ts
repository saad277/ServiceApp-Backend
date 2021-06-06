import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @OneToOne(() => User, (user: User) => user.Id)
  @Column({ default: null })
  UserId: string;

  @Column('simple-json', { default: null })
  Location: { Lat: number; Long: number };

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
}
