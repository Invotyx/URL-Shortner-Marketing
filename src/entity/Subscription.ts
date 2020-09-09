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
    
    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(type => Plan)
    @JoinColumn({ name: "plan_id" })
    plan: Plan;

    @Column({type:'enum', enum:PaymentMethods })
    payment_method:PaymentMethods

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column({default:null})
    expires_at: Date;
    
  }
  