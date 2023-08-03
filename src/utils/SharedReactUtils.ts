import React, { ReactNode } from "react";

export function getNamedChild(children: ReactNode, name: string): React.ReactElement | undefined {
  return React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.name === name
  ) as React.ReactElement;
}
