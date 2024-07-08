import { Migration } from '@mikro-orm/migrations';

export class Migration20240708093147 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add `profile_image` varchar(255) not null;');
    this.addSql('alter table `user` modify `provider_user_id` varchar(255) not null;');
    this.addSql('alter table `user` change `nickname` `username` varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `user` drop column `profile_image`;');

    this.addSql('alter table `user` modify `provider_user_id` int not null;');
    this.addSql('alter table `user` change `username` `nickname` varchar(255) not null;');
  }

}
