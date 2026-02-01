import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1738540800000 implements MigrationInterface {
  name = 'InitialSchema1738540800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp extension if not exists
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create enum type for post status
    await queryRunner.query(`CREATE TYPE "posts_status_enum" AS ENUM('draft', 'published')`);

    // Create admins table
    await queryRunner.query(`
      CREATE TABLE "admins" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_admins_email" UNIQUE ("email"),
        CONSTRAINT "PK_admins" PRIMARY KEY ("id")
      )
    `);

    // Create posts table
    await queryRunner.query(`
      CREATE TABLE "posts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "slug" character varying NOT NULL,
        "title" character varying NOT NULL,
        "intro" character varying,
        "content" text NOT NULL,
        "coverImage" character varying,
        "tags" text NOT NULL,
        "category" character varying NOT NULL,
        "readTime" integer NOT NULL DEFAULT 0,
        "featured" boolean NOT NULL DEFAULT false,
        "status" "posts_status_enum" NOT NULL DEFAULT 'draft',
        "author" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "publishedAt" TIMESTAMP,
        CONSTRAINT "UQ_posts_slug" UNIQUE ("slug"),
        CONSTRAINT "PK_posts" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "admins"`);
    await queryRunner.query(`DROP TYPE "posts_status_enum"`);
  }
}
