import React from 'react';
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

type ButtonProps = React.PropsWithChildren<{
  className?: string;
  iconNameBefore?: string;
  iconNameAfter?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'active' | 'link';
  size?: 'short' | 'medium' | 'long' | 'small';
  dataTestid?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  attr?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  iconNameBefore,
  iconNameAfter,
  type = 'secondary',
  size = 'short',
  dataTestid,
  disabled,
  onClick,
  attr = 'button',
  isLoading = false,
}) => {
  function onclick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      return onClick(e);
    }
  }

  // Manage prop warnings
  /* eslint-disable no-console */
  if (type === 'link' && size) {
    // DISABLING: empty string is not a valid value for size
    // size = '';
    // Component will work, except `size` is ineffectual
    console.warn('A <Button type="link"> ignores `size` prop.');
  }
  if (type === 'primary' && size === 'small') {
    type = 'secondary';
    // Component will work, except `type` is overridden
    console.error(
      'A <Button type="primary" size="small"> is not allowed. ' +
        'Using `type="secondary"` instead.'
    );
  }
  /* eslint-enable no-console */

  return (
    <button
      className={`
        ${styles['root']}
        ${TYPE_MAP[type] ? styles[TYPE_MAP[type]] : ''}
        ${SIZE_MAP[size] ? styles[SIZE_MAP[size]] : ''}
        ${isLoading ? styles['loading'] : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      type={attr}
      onClick={onclick}
      data-testid={dataTestid}
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
          className={iconNameBefore ? styles['icon--before'] : ''}
        />
      ) : (
        ''
      )}
      <span className={styles['text']} data-testid="text">
        {children}
      </span>
      {iconNameAfter && (
        <Icon
          name={iconNameAfter}
          dataTestid="icon-after"
          className={iconNameAfter ? styles['icon--after'] : ''}
        />
      )}
    </button>
  );
};

export default Button;
