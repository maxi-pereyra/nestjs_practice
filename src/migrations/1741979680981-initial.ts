import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1741979680981 implements MigrationInterface {
    name = 'Initial1741979680981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \` files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`data\` longblob NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`DROP TABLE \` files\``);
    }

}
