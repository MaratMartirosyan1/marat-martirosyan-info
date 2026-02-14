import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectsTable1739750400000 implements MigrationInterface {
  name = 'CreateProjectsTable1739750400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "intro" character varying,
        "description" text NOT NULL,
        "image" character varying,
        "technologies" text NOT NULL,
        "category" character varying NOT NULL,
        "demoUrl" character varying,
        "githubUrl" character varying,
        "featured" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
