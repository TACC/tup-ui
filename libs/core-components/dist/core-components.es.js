import require$$0 from 'react';
import { Spinner } from 'reactstrap';
var Icon_module = '';
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0,
  k = Symbol.for('react.element'),
  l = Symbol.for('react.fragment'),
  m = Object.prototype.hasOwnProperty,
  n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b,
    d = {},
    e = null,
    h = null;
  g !== void 0 && (e = '' + g);
  a.key !== void 0 && (e = '' + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in ((a = c.defaultProps), a)) d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Icon = ({ className, dataTestid, label, name }) => {
  const iconClassName = `icon icon-${name}`;
  const fullClassName = className
    ? [className, iconClassName].join(' ')
    : iconClassName;
  return /* @__PURE__ */ jsx('i', {
    className: fullClassName,
    role: 'img',
    'aria-label': label,
    'data-testid': dataTestid,
  });
};
var LoadingSpinner$1 = '';
const LoadingSpinner = ({ placement = 'section', className }) => {
  return /* @__PURE__ */ jsx('div', {
    className: `loading-icon ${className}`,
    'data-testid': 'loading-spinner',
    children: /* @__PURE__ */ jsx(Spinner, {
      className: placement,
    }),
  });
};
const root = '_root_7gr2i_1 _c-button_19jn6_2';
const primary = '_primary_7gr2i_5 _c-button--primary_19jn6_2';
const secondary = '_secondary_7gr2i_8 _c-button--secondary_19jn6_2';
const tertiary = '_tertiary_7gr2i_11 _c-button--tertiary_19jn6_2';
const active = '_active_7gr2i_14 _c-button--is-active_19jn6_2';
const loading = '_loading_7gr2i_42 _c-button--is-busy_19jn6_2';
const text = '_text_7gr2i_55 _c-button__text_19jn6_2';
var styles$1 = {
  root,
  primary,
  secondary,
  tertiary,
  active,
  'size-small': '_size-small_7gr2i_18 _c-button--size-small_19jn6_2',
  'width-short': '_width-short_7gr2i_21 _c-button--width-short_19jn6_2',
  'width-medium': '_width-medium_7gr2i_24 _c-button--width-medium_19jn6_2',
  'width-long': '_width-long_7gr2i_27 _c-button--width-long_19jn6_2',
  'as-link': '_as-link_7gr2i_31 _c-button--as-link_19jn6_2',
  'icon--before': '_icon--before_7gr2i_35 _c-button__icon--before_19jn6_2',
  'icon--after': '_icon--after_7gr2i_38 _c-button__icon--after_19jn6_2',
  loading,
  'loading-over-button': '_loading-over-button_7gr2i_48',
  text,
};
const TYPE_MAP = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  active: 'is-active',
  link: 'as-link',
};
const SIZE_MAP = {
  short: 'width-short',
  medium: 'width-medium',
  long: 'width-long',
  small: 'size-small',
};
const Button = ({
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
  function onclick(e) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      return onClick(e);
    }
  }
  if (type === 'link' && size) {
    console.warn('A <Button type="link"> ignores `size` prop.');
  }
  if (type === 'primary' && size === 'small') {
    type = 'secondary';
    console.error(
      'A <Button type="primary" size="small"> is not allowed. Using `type="secondary"` instead.'
    );
  }
  if (type !== 'link' && !size) {
    size = 'short';
    console.debug(
      'A <Button> that is not `type="link"` and has no `size` is automatically assigned `size="short"`.'
    );
  }
  return /* @__PURE__ */ jsxs('button', {
    className: `
        ${styles$1['root']}
        ${TYPE_MAP[type] ? styles$1[TYPE_MAP[type]] : ''}
        ${SIZE_MAP[size] ? styles$1[SIZE_MAP[size]] : ''}
        ${isLoading ? styles$1['loading'] : ''}
        ${className}
      `,
    disabled: disabled || isLoading,
    type: attr,
    onClick: onclick,
    'data-testid': dataTestid,
    children: [
      isLoading &&
        /* @__PURE__ */ jsx(LoadingSpinner, {
          placement: 'inline',
          className: styles$1['loading-over-button'],
        }),
      iconNameBefore
        ? /* @__PURE__ */ jsx(Icon, {
            name: iconNameBefore,
            dataTestid: 'icon-before',
            className: iconNameBefore ? styles$1['icon--before'] : '',
          })
        : '',
      /* @__PURE__ */ jsx('span', {
        className: styles$1['text'],
        'data-testid': 'text',
        children,
      }),
      iconNameAfter &&
        /* @__PURE__ */ jsx(Icon, {
          name: iconNameAfter,
          dataTestid: 'icon-after',
          className: iconNameAfter ? styles$1['icon--after'] : '',
        }),
    ],
  });
};
var styles = {};
function CoreComponents(props) {
  return /* @__PURE__ */ jsx('div', {
    className: styles['container'],
    children: /* @__PURE__ */ jsx('h1', {
      children: 'Welcome to CoreComponents!',
    }),
  });
}
export { Button, Icon, LoadingSpinner, CoreComponents as Message };
