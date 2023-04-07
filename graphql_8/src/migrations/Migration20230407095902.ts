import { Migration } from '@mikro-orm/migrations';

export class Migration20230407095902 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "students" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "age" int null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "students" cascade;');
  }

}
