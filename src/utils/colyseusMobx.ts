import { ArraySchema, MapSchema, Schema } from '@colyseus/schema';
import { runInAction } from 'mobx';
import { NonFunctionKeys } from 'utility-types';

type Unmap<T> = T extends MapSchema<infer U> ? U : T;
type Unarray<T> = T extends ArraySchema<infer U> ? U : T;

export function listenPrimitive<T extends Schema, K extends NonFunctionKeys<T>>(
  schema: T,
  store: any,
  prop: K,
  transformValue: (value: T[K]) => any = (v) => v,
) {
  const set = (value: T[K]) => {
    runInAction(() => (store[prop] = transformValue(value)));
  };

  schema.listen(prop, set);
}

export function listenArray<T extends Schema, K extends NonFunctionKeys<T>>(
  schema: T,
  store: any,
  prop: K,
  transformValue: (value: Unarray<T[K]>) => any = (v) => v,
) {
  const set = (value: any, index: number) => {
    if (value == null || !store[prop]) return;
    runInAction(() => (store[prop][index] = transformValue(value)));
  };

  const remove = (_: any, index: number) => {
    runInAction(() => store[prop]?.splice(index, 1));
  };

  (schema[prop] as ArraySchema)?.onAdd(set);
  (schema[prop] as ArraySchema)?.onChange(set);
  (schema[prop] as ArraySchema)?.onRemove(remove);
}

export function listenMap<T extends Schema, K extends NonFunctionKeys<T>>(
  schema: T,
  store: any,
  prop: K,
  transformValue: (value: Unmap<T[K]>, key: string) => any = (v) => v,
) {
  const set = (value: any, key: string) => {
    if (value == null) return;
    runInAction(() => store[prop]?.set(key, transformValue(value, key)));
  };

  const remove = (_: any, key: string) => {
    runInAction(() => store[prop]?.delete(key));
  };

  (schema[prop] as MapSchema)?.onAdd(set);
  (schema[prop] as MapSchema)?.onChange(set);
  (schema[prop] as MapSchema)?.onRemove(remove);
}
