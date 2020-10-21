import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1603307866838 implements MigrationInterface {
    name = 'migration1603307866838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account_contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "value" character varying NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_de89afd8b66aaee77dfd091801a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip" character varying NOT NULL, "address" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "handbook" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text, "date" TIMESTAMP NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_c1ae96a9519c8dc535434a4ba86" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "scheduling" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "establishmentId" uuid NOT NULL, "patientId" uuid NOT NULL, "professionalId" uuid NOT NULL, "handbookId" uuid, "clerkId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_a19510fdc2c3f1c9daff8b6e395" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "establishment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "main" boolean NOT NULL DEFAULT false, "networkId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_8f8264c2d37cbbd8282ee9a3c97" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file" character varying NOT NULL, "provider" character varying NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "account_network_role_enum" AS ENUM('admin', 'manager', 'professional', 'clerk', 'patient')`, undefined);
        await queryRunner.query(`CREATE TABLE "account_network" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "account_network_role_enum" NOT NULL DEFAULT 'patient', "networkId" uuid NOT NULL, "accountId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_5b17f3dcb3f9ee0168af08a06e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "account_genre_enum" AS ENUM('masc', 'fem', 'others')`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying, "genre" "account_genre_enum" NOT NULL DEFAULT 'others', "dateOfBirth" character varying, "password" character varying NOT NULL, "networkId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP, "deletedAt" TIMESTAMP DEFAULT null, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "account_contact" ADD CONSTRAINT "FK_d5cb6fc24e412b06e4e1fea2b24" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_4e264321ca24b46d163fbce28c2" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "handbook" ADD CONSTRAINT "FK_430f0602a50f5771ea8d291c2fb" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" ADD CONSTRAINT "FK_b33bb243d365b54280197099556" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" ADD CONSTRAINT "FK_95c99eef84baad1e5c7fe58cbe7" FOREIGN KEY ("patientId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" ADD CONSTRAINT "FK_81383db76eafa3990d3c4f94808" FOREIGN KEY ("professionalId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" ADD CONSTRAINT "FK_0221904279b2e7301db21132c86" FOREIGN KEY ("handbookId") REFERENCES "handbook"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" ADD CONSTRAINT "FK_41f1d39792203d73156cd76ebfd" FOREIGN KEY ("clerkId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_747ec3b59aaa5e6469c80a31cf3" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_e24844d05e48306398d10d45736" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account_network" ADD CONSTRAINT "FK_25b6cd52ee7d2af6a3125d2609d" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account_network" ADD CONSTRAINT "FK_d86899c601df9c6e0df397cd166" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_c609c07ce9354d1180a0df12b25" FOREIGN KEY ("networkId") REFERENCES "network"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_c609c07ce9354d1180a0df12b25"`, undefined);
        await queryRunner.query(`ALTER TABLE "account_network" DROP CONSTRAINT "FK_d86899c601df9c6e0df397cd166"`, undefined);
        await queryRunner.query(`ALTER TABLE "account_network" DROP CONSTRAINT "FK_25b6cd52ee7d2af6a3125d2609d"`, undefined);
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_e24844d05e48306398d10d45736"`, undefined);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_747ec3b59aaa5e6469c80a31cf3"`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" DROP CONSTRAINT "FK_41f1d39792203d73156cd76ebfd"`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" DROP CONSTRAINT "FK_0221904279b2e7301db21132c86"`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" DROP CONSTRAINT "FK_81383db76eafa3990d3c4f94808"`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" DROP CONSTRAINT "FK_95c99eef84baad1e5c7fe58cbe7"`, undefined);
        await queryRunner.query(`ALTER TABLE "scheduling" DROP CONSTRAINT "FK_b33bb243d365b54280197099556"`, undefined);
        await queryRunner.query(`ALTER TABLE "handbook" DROP CONSTRAINT "FK_430f0602a50f5771ea8d291c2fb"`, undefined);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_4e264321ca24b46d163fbce28c2"`, undefined);
        await queryRunner.query(`ALTER TABLE "account_contact" DROP CONSTRAINT "FK_d5cb6fc24e412b06e4e1fea2b24"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TYPE "account_genre_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "account_network"`, undefined);
        await queryRunner.query(`DROP TYPE "account_network_role_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "attachment"`, undefined);
        await queryRunner.query(`DROP TABLE "network"`, undefined);
        await queryRunner.query(`DROP TABLE "establishment"`, undefined);
        await queryRunner.query(`DROP TABLE "scheduling"`, undefined);
        await queryRunner.query(`DROP TABLE "handbook"`, undefined);
        await queryRunner.query(`DROP TABLE "adresses"`, undefined);
        await queryRunner.query(`DROP TABLE "account_contact"`, undefined);
    }

}
