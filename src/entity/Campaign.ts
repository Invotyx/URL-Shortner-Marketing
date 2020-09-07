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

  @Entity('campaigns')
  // @Unique(["username"])
  export class Campaign {
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

    @Column()
    meta_title: string;

    @Column('text')
    meta_description: string;

    @Column()
    meta_image: string;

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
    deleted_at: Date;
  }
  