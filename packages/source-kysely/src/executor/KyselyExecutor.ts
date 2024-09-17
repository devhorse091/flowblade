import { isParsableSafeInt } from '@httpx/assert';
import type { InferResult, Kysely } from 'kysely';
import type { Writable } from 'type-fest';

import type { IColumnModel } from '../column-model/IColumnModel';
import type { QueryBuilder } from '../query/IGetQuery';
import type {
  DataSourceExecutorResponse,
  IDataSourceExecutor,
} from './IDataSourceExecutor';

type Params<TDatabase> = {
  connection: Kysely<TDatabase>;
};

export class KyselyExecutor<TDatabase> implements IDataSourceExecutor {
  constructor(private params: Params<TDatabase>) {}

  /**
   * @throw Error
   */
  query = async <
    TQuery extends QueryBuilder<TDatabase>,
    TRet = InferResult<TQuery>,
  >(
    query: TQuery,
    meta?: { columnModel?: IColumnModel }
  ): Promise<DataSourceExecutorResponse<TRet>> => {
    const compiled = query.compile(this.params.connection);
    const start = performance.now();
    const data = await this.params.connection.executeQuery(query);
    const timeMs = performance.now() - start;
    // Cause kysely uses bigint (not json serializable)
    // to do choose if we could use a different technique than string
    const affectedRows =
      data?.numAffectedRows === undefined
        ? null
        : data.numAffectedRows.toString(10);
    return {
      data: data.rows as TRet,
      meta: {
        query: {
          sql: compiled.sql,
          params: compiled.parameters as Writable<unknown[]>,
          timeMs,
        },
        columnModel: meta?.columnModel,
        affectedRows: isParsableSafeInt(affectedRows)
          ? Number.parseInt(affectedRows, 10)
          : undefined,
      },
    };
  };

  // eslint-disable-next-line require-yield,sonarjs/generator-without-yield
  async *stream<
    TQuery extends QueryBuilder<TDatabase>,
    TRet = InferResult<TQuery>,
  >(
    _query: QueryBuilder<TDatabase>,
    _chunkSize: number
  ): AsyncIterableIterator<DataSourceExecutorResponse<TRet>> {
    throw new Error('Not implemented yet');
  }
}
