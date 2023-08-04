import React, { ButtonHTMLAttributes } from 'react';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import styles from './Button.module.css';

export const TYPE_MAP = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  active: 'is-active',
  link: 'as-link',
};

export const SIZE_MAP = {
  short: 'width-short',
  medium: 'width-medium',
  long: 'width-long',
  small: 'size-small',
};

export const TYPES = [''].concat(Object.keys(TYPE_MAP));

export const SIZES = [''].concat(Object.keys(SIZE_MAP));

export const ATTRIBUTES = ['button', 'submit', 'reset'];

type ButtonTypeLinkSize = {
  type?: 'link';
  size?: never;
};
type ButtonTypePrimarySize = {
  type?: 'primary';
  size?: 'short' | 'medium' | 'long';
};
type ButtonTypeOtherSize = {
  type?: 'secondary' | 'tertiary' | 'active';
  size?: 'short' | 'medium' | 'long' | 'small';
};

type ButtonProps = React.PropsWithChildren<{
  className?: string;
  iconNameBefore?: string;
  iconNameAfter?: string;
  id?: string;
  dataTestid?: string;
  disabled?: boolean;
  attr?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement> &
  (ButtonTypeLinkSize | ButtonTypePrimarySize | ButtonTypeOtherSize);

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  iconNameBefore,
  iconNameAfter,
  id,
  type = 'secondary',
  size = '',
  dataTestid,
  disabled,
  attr = 'button',
  isLoading = false,
  ...props
}) => {
  return (
    <button
      id={id}
      className={`
        ${styles['root']}
        c-button
        ${TYPE_MAP[type] ? `c-button--${[TYPE_MAP[type]]}` : ''}
        ${SIZE_MAP[size] ? `c-button--${[SIZE_MAP[size]]}` : ''}
        ${isLoading ? 'c-button--is-busy' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      type={attr}
      data-testid={dataTestid}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner
          placement="inline"
          className={styles['loading-over-button']}
        />
      )}
      {iconNameBefore ? (
        <Icon
          name={iconNameBefore}
          dataTestid="icon-before"
          className="c-button__icon--before"
        />
      ) : (
        ''
      )}
      {children}
      {iconNameAfter && (
        <Icon
          name={iconNameAfter}
          dataTestid="icon-after"
          className="c-button__icon--after"
        />
      )}
    </button>
  );
};

export default Button;
