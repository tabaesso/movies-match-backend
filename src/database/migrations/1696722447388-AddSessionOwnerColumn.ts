import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSessionOwnerColumn1696722447388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'session',
      new TableColumn({
        name: 'owner',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'session',
      new TableForeignKey({
        name: 'SessionOwnerUser',
        columnNames: ['owner'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('session', 'SessionOwnerUser');
    await queryRunner.dropColumn('session', 'owner');
  }
}
