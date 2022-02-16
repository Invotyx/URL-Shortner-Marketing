import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("plans")
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  apple_product_id: string;

  @Column({ nullable: true })
  google_product_id: string;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 30 })
  slug: string;

  @Column({ nullable: true })
  limit: number;

  @Column()
  rate: number;
}
