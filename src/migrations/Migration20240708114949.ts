import { Migration } from '@mikro-orm/migrations';

export class Migration20240708114949 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `bank` (`code` varchar(255) not null, `name` varchar(255) not null, `icon_url` varchar(255) not null, primary key (`code`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `username` varchar(255) not null, `provider` varchar(255) not null, `provider_user_id` varchar(255) not null, `oauth_access_token` varchar(255) not null, `oauth_refresh_token` varchar(255) not null, `profile_image` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `wallet` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `account_number` varchar(255) not null, `bank_code` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `wallet` add index `wallet_bank_code_index`(`bank_code`);');

    this.addSql('create table `wallet_user` (`user_id` int unsigned not null, `wallet_id` int unsigned not null, `role` enum(\'ADMIN\', \'READ\', \'WRITE\') not null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`user_id`, `wallet_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `wallet_user` add index `wallet_user_user_id_index`(`user_id`);');
    this.addSql('alter table `wallet_user` add index `wallet_user_wallet_id_index`(`wallet_id`);');

    this.addSql('alter table `wallet` add constraint `wallet_bank_code_foreign` foreign key (`bank_code`) references `bank` (`code`) on update cascade;');

    this.addSql('alter table `wallet_user` add constraint `wallet_user_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `wallet_user` add constraint `wallet_user_wallet_id_foreign` foreign key (`wallet_id`) references `wallet` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `wallet` drop foreign key `wallet_bank_code_foreign`;');

    this.addSql('alter table `wallet_user` drop foreign key `wallet_user_user_id_foreign`;');

    this.addSql('alter table `wallet_user` drop foreign key `wallet_user_wallet_id_foreign`;');

    this.addSql('drop table if exists `bank`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `wallet`;');

    this.addSql('drop table if exists `wallet_user`;');
  }

}
