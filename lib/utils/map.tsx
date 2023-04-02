export type MapKey<T> = T extends Map<infer K, any> ? K : never
