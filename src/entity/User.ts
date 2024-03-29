import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository,
  MoreThan,
  Between, MoreThanOrEqual
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import {Subscription} from './Subscription';
import { Advertisement } from "./Advertisement";
import { Plan } from "./Plan";
import { throws } from "assert";

@Entity('users')
// @Unique(["username"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: true})
  email: string;

  @Column({ length: 15, nullable: true})
  phone_number: string;

  @Column({ length: 60, nullable: true })
  first_name: string;
  
  @Column({ length: 60, nullable: true })
  last_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({default: '/images/profile.jpg'})
  profile_image: string;

  @BeforeInsert()
  beforeInsertActions() {
    this.profile_image = '/images/profile.jpg';
  }

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
  

  hashPassword() {
    if(this.password) this.password = bcrypt.hashSync(this.password, 8);
  }

  generateToken(){
    const token = jwt.sign(
      { userId: this.id },
      config.jwtSecret,
      { expiresIn: "10d" }
    );
    return token;
  }

  async getCurrentSubscriptionPlan(){
    const subscriptionRepository = getRepository(Subscription);
    const subscription = await subscriptionRepository.findOne({
      where:{
        user:this,
      },
      order: {
        created_at:'DESC'
      },
      relations:['plan']
    })
    
    return subscription;
  }

  async getCurrentSubscriptionAds(currentSubscriptionPlan){
    // if(expires_at === null){
    //   const advertisements = await getRepository(Advertisement).find({
    //     created_at: MoreThanOrEqual(created_at),
    //     deleted_at:null
    //   });
    //   return advertisements;
    // }
    const advertisements = await getRepository(Advertisement).find({
      user:this,
      deleted_at:null
    });
    return advertisements;
  }

  async checkIfAddIsInCurrentSubscriptionPlan(advertisemnt_id){
    const currentSubscriptionPlan = await this.getCurrentSubscriptionPlan();
    if(currentSubscriptionPlan.expires_at != null && currentSubscriptionPlan.expires_at < new Date()){
      return false
    }
    const advertisemnt = await getRepository(Advertisement).findOne({
      where:{
        id:advertisemnt_id,
        deleted_at:null,
        user: this
      }
    });  
    return advertisemnt;
  }

  async addFreePlan(payment_method){
    const plan = await getRepository(Plan).findOne(1);
    let subscription = new Subscription();
            subscription.plan = plan;
            subscription.user = this,
            subscription.expires_at = null,
            subscription.payment_method = payment_method;
      return await getRepository(Subscription).save(subscription);
  }

}
