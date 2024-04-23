import { MigrationInterface, QueryRunner } from "typeorm";

export class StateLogsTimestampIndex1713718721958
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE INDEX "TIMESTAMP_INDEX" ON "stateLogs" (timestamp)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP INDEX "TIMESTAMP_INDEX"`);
  }
}
