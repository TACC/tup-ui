import React from 'react';
import PropTypes from 'prop-types';

import { Icon, LoadingSpinner } from '../';

import styles from './Button.module.css';

export const KINDS = ['', 'primary', 'secondary', 'active', 'link'];

export const SIZES = ['', 'short', 'medium', 'long', 'small'];

export const ATTRIBUTES = ['button', 'submit', 'reset'];

const Button = ({
  children,
  className,
  iconNameBefore,
  iconNameAfter,
  kind,
  size,
  disabled,
  isLoading,
}) => {

  // Manage prop warnings
  /* eslint-disable no-console */
  if (kind === 'link' && size) {
    size = '';
    // Component will work, except `size` is ineffectual
    console.warn('A <Button kind="link"> ignores `size` prop.');
  }
  if (kind === 'primary' && size === 'small') {
    kind = 'secondary';
    // Component will work, except `kind` is overridden
    console.error(
      'A <Button kind="primary" size="small"> is not allowed. ' +
        'Using `kind="secondary"` instead.'
    );
  }
  if (kind !== 'link' && !size) {
    size = 'short';
    // Component will work, except `size` is auto-set
    console.debug(
      'A <Button> that is not `kind="link"` and has no `size` ' +
        'is automatically assigned `size="short"`.'
    );
  }
  /* eslint-enable no-console */

  const buttonRootClass = styles['root'];

  let buttonTypeClass;
  if (kind === 'link') {
    buttonTypeClass = styles['as-link'];
  } else if (kind === 'primary' || kind === 'secondary' || kind === 'active') {
    buttonTypeClass = styles[`${kind}`];
  } else if (kind === '') {
    buttonTypeClass = kind;
  }

  let buttonSizeClass;
  if (size === 'small') {
    buttonSizeClass = styles['size-small'];
  } else {
    buttonSizeClass = styles[`width-${size}`];
  }

  return (
    <button
      className={`
        ${buttonRootClass} ${buttonTypeClass} ${buttonSizeClass} ${className}
      `}
      disabled={disabled || isLoading}
      // So users can pass `type` or global attributes
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {isLoading && (
        loadingSpinner
      )}
      {iconNameBefore ? (
        <Icon
          name={iconNameBefore}
          className={iconNameBefore ? styles['icon--before'] : ''}
        ></Icon>
      ) : (
        ''
      )}
      <span className={isLoading ? styles['loading-text'] : ''}>
        {children}
      </span>
      {iconNameAfter ? (
        <Icon
          name={iconNameAfter}
          className={iconNameAfter ? styles['icon--after'] : ''}
        ></Icon>
      ) : (
        ''
      )}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  iconNameBefore: PropTypes.string,
  iconNameAfter: PropTypes.string,
  kind: PropTypes.oneOf(KINDS),
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
  loadingSpinner: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};
Button.defaultProps = {
  className: '',
  iconNameBefore: '',
  iconNameAfter: '',
  kind: 'secondary',
  loadingSpinner: undefined,
  size: '', // unless `kind="link", defaults to `short` after `propTypes`
  disabled: false,
  isLoading: false,
};

export default Button;
