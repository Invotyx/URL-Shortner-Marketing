import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

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
      { expiresIn: "1h" }
    );
    return token;
  }
  // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
  //   return bcrypt.compareSync(unencryptedPassword, this.password);
  // }
}
