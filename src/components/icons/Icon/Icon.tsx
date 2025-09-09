import cn from 'classnames';
import * as React from 'react';

import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  const { className, color, width = 24, height = 24, children, ...rest } = props;

  return (
    <svg
      width={width}
      height={height}
      color={color}
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={cn(color ? styles[color] : undefined, className)}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Icon;
