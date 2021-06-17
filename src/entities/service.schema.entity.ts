import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  Id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  Img: string;

  @Column()
  @OneToOne(() => User, (user: User) => user.Id)
  CreatedBy: number;
}
