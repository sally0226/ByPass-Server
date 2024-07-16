import { Migration } from '@mikro-orm/migrations';

export class Migration20240716020925 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `invite_link` (`token` varchar(255) not null, `creator_id` int unsigned not null, `wallet_id` int unsigned not null, `expires_at` datetime not null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`token`)) default character set utf8mb4 engine = InnoDB;',
    );
    this.addSql(
      'alter table `invite_link` add index `invite_link_creator_id_index`(`creator_id`);',
    );
    this.addSql(
      'alter table `invite_link` add index `invite_link_wallet_id_index`(`wallet_id`);',
    );

    this.addSql(
      'alter table `invite_link` add constraint `invite_link_creator_id_foreign` foreign key (`creator_id`) references `user` (`id`) on update cascade;',
    );
    this.addSql(
      'alter table `invite_link` add constraint `invite_link_wallet_id_foreign` foreign key (`wallet_id`) references `wallet` (`id`) on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `invite_link`;');
  }
}
