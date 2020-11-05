import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  getRepository
} from "typeorm";

import { User } from './User';
import { Advertisement } from './Advertisement';
var randomize = require('randomatic');

enum PaymentMethods {
  Apple = 'apple',
  Google = 'google',
}

@Entity('campaigns')
// @Unique(["username"])
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Advertisement)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement: Advertisement;

  @Column()
  title: string;

  @Column({ length: 511 })
  destination_url: string;

  @Column({ length: 6 })
  internal_url: string;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @Column({ nullable: true })
  meta_image: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ name: 'deleted_at', default: null, nullable: true })
  deleted_at: Date;


  async getInternalID() {
    const internal_url = randomize('Aa0', 6);
    var campaign = null
    do {
      campaign = await getRepository(Campaign).findOne({
        where: { internal_url: internal_url }
      });
    }
    while (campaign);
    return internal_url;
  }

}
