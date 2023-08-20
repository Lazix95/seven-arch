import { ComponentType, HTMLProps } from 'react';

export interface GeneralFormSubmitModel<D, I> {
  readonly data: D;
  readonly images: I;
}

export type Optional<T> = T | null | undefined;

export type ReactComponent = ComponentType<any>;

export type DivProps = HTMLProps<HTMLDivElement>;
