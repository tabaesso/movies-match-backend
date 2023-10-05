import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStartedColumnSessionTable1696378754995
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'session',
      new TableColumn({
        name: 'started',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('session', 'started');
  }
}
