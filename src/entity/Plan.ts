import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  
  @Entity('plans')
  export class Plan {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    apple_product_id: string;
    
    @Column({ nullable: true })
    google_product_id: string;
  
    @Column({length:30})
    title: string;

    @Column({length:30})
    slug: string;

    @Column({nullable: true})
    limit: number;

    @Column('double')
    rate: number;
    
  }
  