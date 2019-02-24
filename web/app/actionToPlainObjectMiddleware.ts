import { Middleware, Dispatch, AnyAction, Action } from "redux";

export const actionToPlainObject: Middleware = <S extends AnyAction>() => (next: Dispatch<S>) =>
  <A extends S>(action: A) => next({...action as object} as A);