import {MigrationInterface, QueryRunner} from "typeorm";

export class Version11605095792795 implements MigrationInterface {
    name = 'Version11605095792795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `plans` (`id` int NOT NULL AUTO_INCREMENT, `apple_product_id` varchar(255) NULL, `google_product_id` varchar(255) NULL, `title` varchar(30) NOT NULL, `slug` varchar(30) NOT NULL, `limit` int NULL, `rate` double NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `subscriptions` (`id` int NOT NULL AUTO_INCREMENT, `payment_method` enum ('apple', 'google') NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `expires_at` datetime NULL DEFAULT NULL, `user_id` int NULL, `plan_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(60) NULL, `phone_number` varchar(15) NULL, `first_name` varchar(60) NULL, `last_name` varchar(60) NULL, `password` varchar(255) NULL, `profile_image` varchar(255) NOT NULL DEFAULT '/images/profile.jpg', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `advertisements` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `attachment` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, `display` enum ('title', 'image', 'both') NOT NULL, `views` int NOT NULL DEFAULT 0, `is_default` tinyint NOT NULL DEFAULT 0, `width` int NOT NULL DEFAULT 1920, `height` int NOT NULL DEFAULT 1080, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime NULL DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `campaigns` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `destination_url` varchar(511) NOT NULL, `internal_url` varchar(6) NOT NULL, `views` int NOT NULL DEFAULT 0, `meta_title` varchar(255) NULL, `meta_description` text NULL, `meta_image` varchar(511) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime NULL DEFAULT NULL, `user_id` int NULL, `advertisement_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `campaign_views` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `campaign_id` int NULL, `advertisement_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `social_logins` (`id` int NOT NULL AUTO_INCREMENT, `provider` varchar(30) NOT NULL, `social_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `IDX_21d2211bf482911960ddcadfcc` (`social_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_devices` (`id` int NOT NULL AUTO_INCREMENT, `device_name` varchar(60) NOT NULL, `device_id` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `subscriptions` ADD CONSTRAINT `FK_d0a95ef8a28188364c546eb65c1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subscriptions` ADD CONSTRAINT `FK_e45fca5d912c3a2fab512ac25dc` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `advertisements` ADD CONSTRAINT `FK_6277b5b1c6ac26154f49ba2ef7c` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `campaigns` ADD CONSTRAINT `FK_45455b21195721407322ddce007` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `campaigns` ADD CONSTRAINT `FK_94f9315a496deb3e6a23748bbd0` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisements`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `campaign_views` ADD CONSTRAINT `FK_34607c1557a5c7c9eb8a7ee4ebc` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `campaign_views` ADD CONSTRAINT `FK_cd1e5928afebb5b2d01e09708a7` FOREIGN KEY (`advertisement_id`) REFERENCES `advertisements`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `social_logins` ADD CONSTRAINT `FK_30a3318b26f1c7e6f7c24ff1594` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_devices` ADD CONSTRAINT `FK_28bd79e1b3f7c1168f0904ce241` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_devices` DROP FOREIGN KEY `FK_28bd79e1b3f7c1168f0904ce241`");
        await queryRunner.query("ALTER TABLE `social_logins` DROP FOREIGN KEY `FK_30a3318b26f1c7e6f7c24ff1594`");
        await queryRunner.query("ALTER TABLE `campaign_views` DROP FOREIGN KEY `FK_cd1e5928afebb5b2d01e09708a7`");
        await queryRunner.query("ALTER TABLE `campaign_views` DROP FOREIGN KEY `FK_34607c1557a5c7c9eb8a7ee4ebc`");
        await queryRunner.query("ALTER TABLE `campaigns` DROP FOREIGN KEY `FK_94f9315a496deb3e6a23748bbd0`");
        await queryRunner.query("ALTER TABLE `campaigns` DROP FOREIGN KEY `FK_45455b21195721407322ddce007`");
        await queryRunner.query("ALTER TABLE `advertisements` DROP FOREIGN KEY `FK_6277b5b1c6ac26154f49ba2ef7c`");
        await queryRunner.query("ALTER TABLE `subscriptions` DROP FOREIGN KEY `FK_e45fca5d912c3a2fab512ac25dc`");
        await queryRunner.query("ALTER TABLE `subscriptions` DROP FOREIGN KEY `FK_d0a95ef8a28188364c546eb65c1`");
        await queryRunner.query("DROP TABLE `user_devices`");
        await queryRunner.query("DROP INDEX `IDX_21d2211bf482911960ddcadfcc` ON `social_logins`");
        await queryRunner.query("DROP TABLE `social_logins`");
        await queryRunner.query("DROP TABLE `campaign_views`");
        await queryRunner.query("DROP TABLE `campaigns`");
        await queryRunner.query("DROP TABLE `advertisements`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `subscriptions`");
        await queryRunner.query("DROP TABLE `plans`");
    }

}
