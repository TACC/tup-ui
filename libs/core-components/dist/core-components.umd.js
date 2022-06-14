(function (i, c) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? c(exports, require('react'), require('reactstrap'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'react', 'reactstrap'], c)
    : ((i = typeof globalThis != 'undefined' ? globalThis : i || self),
      c((i['@tacc/core-components'] = {}), i.react, i.reactstrap));
})(this, function (i, c, w) {
  'use strict';
  function x(t) {
    return t && typeof t == 'object' && 'default' in t ? t : { default: t };
  }
  var k = x(c),
    q = '',
    u = { exports: {} },
    l = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var $ = k.default,
    S = Symbol.for('react.element'),
    N = Symbol.for('react.fragment'),
    O = Object.prototype.hasOwnProperty,
    T = $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(t, e, _) {
    var n,
      r = {},
      o = null,
      d = null;
    _ !== void 0 && (o = '' + _),
      e.key !== void 0 && (o = '' + e.key),
      e.ref !== void 0 && (d = e.ref);
    for (n in e) O.call(e, n) && !C.hasOwnProperty(n) && (r[n] = e[n]);
    if (t && t.defaultProps)
      for (n in ((e = t.defaultProps), e)) r[n] === void 0 && (r[n] = e[n]);
    return {
      $$typeof: S,
      type: t,
      key: o,
      ref: d,
      props: r,
      _owner: T.current,
    };
  }
  (l.Fragment = N), (l.jsx = p), (l.jsxs = p), (u.exports = l);
  const a = u.exports.jsx,
    E = u.exports.jsxs,
    m = ({ className: t, dataTestid: e, label: _, name: n }) => {
      const r = `icon icon-${n}`,
        o = t ? [t, r].join(' ') : r;
      return a('i', {
        className: o,
        role: 'img',
        'aria-label': _,
        'data-testid': e,
      });
    };
  var A = '';
  const y = ({ placement: t = 'section', className: e }) =>
    a('div', {
      className: `loading-icon ${e}`,
      'data-testid': 'loading-spinner',
      children: a(w.Spinner, { className: t }),
    });
  var s = {
    root: '_root_7gr2i_1 _c-button_19jn6_2',
    primary: '_primary_7gr2i_5 _c-button--primary_19jn6_2',
    secondary: '_secondary_7gr2i_8 _c-button--secondary_19jn6_2',
    tertiary: '_tertiary_7gr2i_11 _c-button--tertiary_19jn6_2',
    active: '_active_7gr2i_14 _c-button--is-active_19jn6_2',
    'size-small': '_size-small_7gr2i_18 _c-button--size-small_19jn6_2',
    'width-short': '_width-short_7gr2i_21 _c-button--width-short_19jn6_2',
    'width-medium': '_width-medium_7gr2i_24 _c-button--width-medium_19jn6_2',
    'width-long': '_width-long_7gr2i_27 _c-button--width-long_19jn6_2',
    'as-link': '_as-link_7gr2i_31 _c-button--as-link_19jn6_2',
    'icon--before': '_icon--before_7gr2i_35 _c-button__icon--before_19jn6_2',
    'icon--after': '_icon--after_7gr2i_38 _c-button__icon--after_19jn6_2',
    loading: '_loading_7gr2i_42 _c-button--is-busy_19jn6_2',
    'loading-over-button': '_loading-over-button_7gr2i_48',
    text: '_text_7gr2i_55 _c-button__text_19jn6_2',
  };
  const g = {
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'tertiary',
      active: 'is-active',
      link: 'as-link',
    },
    b = {
      short: 'width-short',
      medium: 'width-medium',
      long: 'width-long',
      small: 'size-small',
    },
    P = ({
      children: t,
      className: e,
      iconNameBefore: _,
      iconNameAfter: n,
      type: r = 'secondary',
      size: o = 'short',
      dataTestid: d,
      disabled: h,
      onClick: v,
      attr: L = 'button',
      isLoading: f = !1,
    }) => {
      function M(j) {
        if (h) {
          j.preventDefault();
          return;
        }
        if (v) return v(j);
      }
      return (
        r === 'link' &&
          o &&
          console.warn('A <Button type="link"> ignores `size` prop.'),
        r === 'primary' &&
          o === 'small' &&
          ((r = 'secondary'),
          console.error(
            'A <Button type="primary" size="small"> is not allowed. Using `type="secondary"` instead.'
          )),
        r !== 'link' &&
          !o &&
          ((o = 'short'),
          console.debug(
            'A <Button> that is not `type="link"` and has no `size` is automatically assigned `size="short"`.'
          )),
        E('button', {
          className: `
        ${s.root}
        ${g[r] ? s[g[r]] : ''}
        ${b[o] ? s[b[o]] : ''}
        ${f ? s.loading : ''}
        ${e}
      `,
          disabled: h || f,
          type: L,
          onClick: M,
          'data-testid': d,
          children: [
            f &&
              a(y, {
                placement: 'inline',
                className: s['loading-over-button'],
              }),
            _
              ? a(m, {
                  name: _,
                  dataTestid: 'icon-before',
                  className: _ ? s['icon--before'] : '',
                })
              : '',
            a('span', {
              className: s.text,
              'data-testid': 'text',
              children: t,
            }),
            n &&
              a(m, {
                name: n,
                dataTestid: 'icon-after',
                className: n ? s['icon--after'] : '',
              }),
          ],
        })
      );
    };
  var I = {};
  function R(t) {
    return a('div', {
      className: I.container,
      children: a('h1', { children: 'Welcome to CoreComponents!' }),
    });
  }
  (i.Button = P),
    (i.Icon = m),
    (i.LoadingSpinner = y),
    (i.Message = R),
    Object.defineProperties(i, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' },
    });
});
