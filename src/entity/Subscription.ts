import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";

  import {User} from './User';
  import {Plan} from './Plan';

  enum PaymentMethods {
    Apple = 'apple',
    Google = 'google',
  }

  @Entity('subscriptions')
  // @Unique(["username"])
  export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'enum', enum:PaymentMethods })
    payment_method:PaymentMethods

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Plan)
    @JoinColumn()
    plan: Plan;

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    expires_at: Date;
    
  }
  