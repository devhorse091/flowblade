import { Result } from 'typescript-result';

import type { QMeta } from '../meta/q-meta';

export type QError = {
  message: string;
};

type ConstructorParams<
  TData extends unknown[] | undefined,
  TError extends QError | undefined,
> = {
  meta: QMeta;
  data?: TData | undefined;
  error?: TError | undefined;
};

export class QResult<
  TData extends unknown[] | undefined,
  TError extends QError | undefined,
> {
  private _result: Result<
    {
      rows: TData;
      meta: QMeta;
    },
    TError
  >;

  constructor(private params: ConstructorParams<TData, TError>) {
    const { data, error, meta } = this.params;
    this._result =
      error === undefined
        ? Result.ok({
            meta: meta,
            rows: data!,
          })
        : Result.error(error);
  }

  get meta(): QMeta {
    return this.params.meta;
  }

  get data(): TData | undefined {
    if (this._result.isOk()) {
      return this._result.value.rows;
    }
    return undefined;
  }

  get error(): TError | undefined {
    if (this._result.isOk()) {
      return undefined;
    }
    return this._result.error;
  }

  isOk(): boolean {
    return this._result.isOk();
  }

  map = <ReturnType>(fn: (row: NonNullable<TData>[number]) => ReturnType) => {
    const start = performance.now();
    if (this._result.isOk()) {
      const result = this._result.map((value) => {
        return {
          meta: this.params.meta,
          rows: value.rows!.map((row) => fn(row)),
        };
      });
      return new QResult({
        data: result.value.rows,
        meta: this.params.meta.withSpan({
          type: 'map',
          timeMs: performance.now() - start,
        }),
        error: undefined,
      });
    }
    return new QResult({
      data: undefined,
      meta: this.params.meta,
      error: this.params.error,
    });
  };

  toJsonifiable = (): {
    data?: TData;
    error?: TError;
    meta: ReturnType<QMeta['toJSON']>;
  } => {
    return {
      ...(this.data === undefined ? {} : { data: this.data }),
      ...(this.error === undefined ? {} : { error: this.error }),
      meta: this.meta.toJSON(),
    };
  };
}
