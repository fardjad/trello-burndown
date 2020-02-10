type ExcludeKeyFromType<
  Type extends object,
  KeyToExclude extends keyof Type
> = {
  [Key in Exclude<keyof Type, KeyToExclude>]: Type[Key];
};

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
  B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
