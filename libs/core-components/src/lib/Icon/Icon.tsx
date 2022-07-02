import React from 'react';
import './Icon.module.css';

type IconProps = React.PropsWithChildren<{
  className?: string;
  dataTestid?: string;
  label?: string;
  name: string;
}>;

const Icon: React.FC<IconProps> = ({
  children,
  className,
  dataTestid,
  label,
  name,
}) => {
  const iconClassName = `icon icon-${name}`;
  // FAQ: The conditional avoids an extra space in class attribute value
  const fullClassName = className
    ? [className, iconClassName].join(' ')
    : iconClassName;

  return (
    <i
      className={fullClassName}
      role="img"
      aria-label={label}
      data-testid={dataTestid}
    >
      {children}
    </i>
  );
};

export default Icon;
