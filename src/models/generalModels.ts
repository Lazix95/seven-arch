export interface GeneralFormSubmitModel<D, I> {
  readonly data: D;
  readonly images: I;
}

export type Optional<T> = T | null | undefined;
