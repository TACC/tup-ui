import React from 'react';
import PropTypes from 'prop-types';

import '@tacc/core-styles/source/_imports/components/cortal.icon.css';

/**
 * An icon that supports:
 *
 * - name of a "Cortal" icon
 * - extra class names
 * - an ARIA label (passed as child content)
 *
 * __Notice__: Using this component adds global CSS for `.icon` and `.icon-*`.
 *
 * @example
 * // returns <i class="icon icon-allocations"></i>
 * <Icon name="allocations"></i>
 * @example
 * // returns <i class="icon icon-allocations" aria-label="trash-bin"></i>
 * <Icon name="trash">trash bin</i>
 */
const Icon = ({ children, className, name }) => {
  const iconClassName = `icon icon-${name}`;
  const fullClassName = [className, iconClassName].join(' ').trim();
  const label = children;

  return <i className={fullClassName} role="img" aria-label={label} />;
};
Icon.propTypes = {
  /** A text alternative to the icon (for accessibility) */
  children: PropTypes.string,
  /** Additional className for the root element */
  className: PropTypes.string,
  /** Name of icon from icon font (without the (`icon-` prefix) */
  name: PropTypes.string.isRequired,
};
Icon.defaultProps = {
  children: '',
  className: '',
};

export default Icon;
