export interface Curried1<A, R> {
  (a: A): R;
}

export interface Curried2<A, B, R> {
  (a: A): Curried1<B, R>;
  (a: A, b: B): R;
}

export interface Curried3<A, B, C, R> {
  (a: A): Curried2<B, C, R>;
  (a: A, b: B): Curried1<C, R>;
  (a: A, b: B, c: C): R;
}

export interface Curried4<A, B, C, D, R> {
  (a: A): Curried3<B, C, D, R>;
  (a: A, b: B): Curried2<C, D, R>;
  (a: A, b: B, c: C): Curried1<D, R>;
  (a: A, b: B, c: C, d: D): R;
}
export interface Curried5<A, B, C, D, E, R> {
  (a: A): Curried4<B, C, D, E, R>;
  (a: A, b: B): Curried3<C, D, E, R>;
  (a: A, b: B, c: C): Curried2<D, E, R>;
  (a: A, b: B, c: C, d: D): Curried1<E, R>;
  (a: A, b: B, c: C, d: D, e: E): R;
}
export interface Curried6<A, B, C, D, E, F, R> {
  (a: A): Curried5<B, C, D, E, F, R>;
  (a: A, b: B): Curried4<C, D, E, F, R>;
  (a: A, b: B, c: C): Curried3<D, E, F, R>;
  (a: A, b: B, c: C, d: D): Curried2<E, F, R>;
  (a: A, b: B, c: C, d: D, e: E): Curried1<F, R>;
  (a: A, b: B, c: C, d: D, e: E, f: F): R;
}
