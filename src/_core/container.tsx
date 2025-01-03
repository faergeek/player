import type { JSX } from 'react';
import { createElement } from 'react';

import { cn } from './cn';

export function Container<
  T extends
    | keyof JSX.IntrinsicElements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<any> = 'div',
>({
  as,
  className,
  ...otherProps
}: { [K in keyof React.ComponentProps<T>]: React.ComponentProps<T>[K] } & {
  as?: T;
}) {
  return createElement(as ?? 'div', {
    className: cn('container mx-auto px-4', className),
    ...otherProps,
  });
}
