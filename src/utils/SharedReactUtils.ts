import React, { ReactNode } from 'react';

export function getNamedChild(children: ReactNode, name: string = 'default'): React.ReactElement[] | undefined {
  const elements = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return;
    const childName = child.props.name || 'default';
    return childName === name;
  }) as React.ReactElement[];

  return elements.length > 0 ? elements : undefined;
}
