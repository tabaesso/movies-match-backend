import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGenresColumnSessionTable1694924008009
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'session',
      new TableColumn({
        name: 'genres',
        type: 'integer[]',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('session', 'genres');
  }
}
