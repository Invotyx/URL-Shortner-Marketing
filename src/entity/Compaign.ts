import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";

  import {User} from './User';
  import {Advertisement} from './Advertisement';

  enum PaymentMethods {
    Apple = 'apple',
    Google = 'google',
  }

  @Entity('compaigns')
  // @Unique(["username"])
  export class Compaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
  
    @Column()
    destination_url: string;

    @Column({length:6})
    internal_url: string;

    @Column({default: 0})
    views: number;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Advertisement)
    @JoinColumn()
    advertisement: Advertisement;

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    @UpdateDateColumn()
    updated_at: Date;
    
    @Column({ name: 'deleted_at', default: null, nullable:true })
    deletedAt: Date;
  }
  