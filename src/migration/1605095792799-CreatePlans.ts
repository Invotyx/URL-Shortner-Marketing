import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Plan } from "../entity/Plan";

export class CreatePlans1605095792799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let plan1 = new Plan();
    plan1.apple_product_id = "1-apple-asfasdfasd";
    plan1.google_product_id = "1-google-asdfasdfasdf";
    plan1.title = "Cause";
    plan1.slug = "cause";
    plan1.limit = 1;
    plan1.rate = 0;
    const planRepository = getRepository(Plan);
    await planRepository.save(plan1);

    let plan2 = new Plan();
    plan2.apple_product_id = "com.shurly.app.business";
    plan2.google_product_id = "2-google-asdfasdfasdf";
    plan2.title = "Business";
    plan2.slug = "enterprise";
    plan2.limit = 3;
    plan2.rate = 3.99;
    await planRepository.save(plan2);

    let plan3 = new Plan();
    plan3.apple_product_id = "com.shurly.app.Agency";
    plan3.google_product_id = "3-google-asdfasdfasdf";
    plan3.title = "Agency";
    plan3.slug = "agency";
    plan3.limit = 10;
    plan3.rate = 7.99;
    await planRepository.save(plan3);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
