import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  
import {User} from "./User";

  @Entity('social_logins')
  @Unique(["social_id"])
  export class SocialLogin {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({length: 30})
    provider: string;
  
    @Column()
    social_id: string;
            
    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    @UpdateDateColumn()
    updated_at: Date;

  }
