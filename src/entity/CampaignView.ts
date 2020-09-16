import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";

  import {Campaign} from './Campaign';
  import {Advertisement} from './Advertisement';
  
  @Entity('campaign_views')
  // @Unique(["username"])
  export class CampaignView {
    @PrimaryGeneratedColumn()
    id: number;
    
    
    @ManyToOne(() => Campaign)
    @JoinColumn({name:'campaign_id'})
    campaign: Campaign

    @ManyToOne(() => Advertisement)
    @JoinColumn({name:'advertisement_id'})
    advertisement: Advertisement

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
  }
  