import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMovieIdColumnSessionTable1696295976758
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'session',
      new TableColumn({
        name: 'movie_id',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('session', 'movie_id');
  }
}
