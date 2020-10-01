import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { DeleteDateColumn } from 'typeorm-plus'
import {User} from './User';

  enum Display {
    Title = 'title',
    Image = 'image',
    Both = 'both'
  }

  @Entity("advertisements")
  // @Unique(["username"])
  export class Advertisement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name:'user_id'})
    user: User;
    
    @Column()
    user_id: number

    @Column()
    title: string;

    @Column('text',{nullable:true})
    description: string;
    
    @Column()
    attachment: string;
  
    @Column()
    link: string;

    @Column({type:'enum', enum:Display })
    display:Display

    @Column({default: 0})
    views: number;

    @Column({default: 0})
    is_default: boolean;

    @Column({ nullable:true })
    width:number

    @Column({ nullable:true })
    height:number
    
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column({ name: 'deleted_at', default: null, nullable:true })
    deleted_at: Date;

  }
  