export type Nullable<T> = T | null
export type Prettify<T> = {
  [K in keyof T]: T[K]
}
