import React from 'react';
import { Link } from 'react-router-dom';
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
type ButtonTypeOtherSize = {
  type?: 'primary' | 'secondary' | 'tertiary' | 'active';
  size?: 'short' | 'medium' | 'long' | 'small';
};

const Button = (props: ButtonProps) => {
  const {
    as,
    attr = 'button',
    children,
    className,
    iconNameBefore,
    iconNameAfter,
    type = 'secondary',
    size = '',
    dataTestid,
    disabled,
    onClick,
    isLoading = false,
    href,
    ...rest
  } = props as ButtonProps & {
    href?: string;
    attr?: 'button' | 'submit' | 'reset';
  };

  function onclick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      return (onClick as React.MouseEventHandler<HTMLButtonElement>)(e);
    }
  }

  const isEffectivelyDisabled = Boolean(disabled || isLoading);

  const rootClassName = `
        ${styles['root']}
        c-button
        ${TYPE_MAP[type] ? `c-button--${[TYPE_MAP[type]]}` : ''}
        ${SIZE_MAP[size] ? `c-button--${[SIZE_MAP[size]]}` : ''}
        ${isLoading ? 'c-button--is-busy' : ''}
        ${className}
      `;

  const content = (
    <>
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
    </>
  );

  const onAnchorOrLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isEffectivelyDisabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(e);
  };

  if (as === 'a') {
    const aProps: React.AnchorHTMLAttributes<HTMLAnchorElement> &
      WithDisabledAttr = {
      ...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>),
      href,
      className: rootClassName,
      disabled: isEffectivelyDisabled,
      onClick: onAnchorOrLinkClick,
      'data-testid': dataTestid,
    };
    return <a {...aProps}>{content}</a>;
  }

  if (as === Link) {
    const linkProps: RouterLinkProps & WithDisabledAttr = {
      ...(rest as RouterLinkProps),
      className: rootClassName,
      disabled: isEffectivelyDisabled,
      onClick: onAnchorOrLinkClick,
      'data-testid': dataTestid,
    };
    return <Link {...linkProps}>{content}</Link>;
  }

  return (
    <button
      {...(rest as Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'type'
      >)}
      className={rootClassName}
      disabled={disabled || isLoading}
      type={attr}
      onClick={onclick}
      data-testid={dataTestid}
    >
      {content}
    </button>
  );
};

export default Button;

type SharedProps = React.PropsWithChildren<{
  className?: string;
  iconNameBefore?: string;
  iconNameAfter?: string;
  id?: string;
  dataTestid?: string;
  disabled?: boolean;
  isLoading?: boolean;
}> &
  (ButtonTypeLinkSize | ButtonTypeOtherSize);

type ButtonAsButtonProps = SharedProps & {
  as?: 'button';
  attr?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'onClick'
>;

type ButtonAsAnchorProps = SharedProps & {
  as: 'a';
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'type' | 'className' | 'children' | 'disabled' | 'onClick' | 'href'
>;

type RouterLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

type ButtonAsRouterLinkProps = SharedProps & {
  as: typeof Link;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  RouterLinkProps,
  'className' | 'children' | 'disabled' | 'onClick' | 'type'
>;

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsAnchorProps
  | ButtonAsRouterLinkProps;

/** Non-standard `disabled` on `<a>` / `<Link>` — styled via @tacc/core-styles */
type WithDisabledAttr = { disabled?: boolean; 'data-testid'?: string };
