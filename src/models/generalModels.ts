import { ComponentType, HTMLProps } from 'react';

export interface GeneralFormSubmitModel<D, I, E = null> {
  readonly data: D;
  readonly images: I;
  readonly externalImages: E;
}

export type Optional<T> = T | null | undefined;

export type ReactComponent = ComponentType<any>;

export type DivProps = HTMLProps<HTMLDivElement>;
