// WARNING: Relies on `Icon` because of `getByRole('img')`
import React from 'react';
import { render } from '@testing-library/react';
import Button, * as BTN from './Button';

import '@testing-library/jest-dom/extend-expect';

const TEST_TEXT = '…';
const TEST_TYPE = 'primary';
const TEST_SIZE = 'medium';

function testClassnamesByType(type, size, getByRole, getByTestId) {
  const root = getByRole('button');
  const text = getByTestId('text');
  const typeClassName = BTN.TYPE_MAP[type];
  const sizeClassName = BTN.SIZE_MAP[size];
  expect(root.className).toMatch('root');
  expect(root.className).toMatch(new RegExp(typeClassName));
  expect(root.className).toMatch(new RegExp(sizeClassName));
  expect(text.className).toMatch('text');
}

function isPropertyLimitation(type, size) {
  let isLimited = false;

  if (
    (type === 'primary' && size === 'small') ||
    (type !== 'link' && !size) ||
    (type === 'link' && size)
  )
    isLimited = true;

  return isLimited;
}

describe('Button', () => {
  it('uses given text', () => {
    const { getByTestId } = render(<Button>{TEST_TEXT}</Button>);
    expect(getByTestId('text').textContent).toEqual(TEST_TEXT);
  });

  describe('icons exist as expected when', () => {
    test('only `iconNameBefore` is given', () => {
      const { queryByTestId } = render(
        <Button iconNameBefore="folder">{TEST_TEXT}</Button>
      );
      expect(queryByTestId('icon-before')).toBeInTheDocument();
      expect(queryByTestId('icon-after')).not.toBeInTheDocument();
    });
    test('only `iconNameAfter` is given', () => {
      const { queryByTestId } = render(
        <Button iconNameAfter="folder">{TEST_TEXT}</Button>
      );
      expect(queryByTestId('icon-before')).not.toBeInTheDocument();
      expect(queryByTestId('icon-after')).toBeInTheDocument();
    });
    test('both `iconNameAfter` and `iconNameBefore` are given', () => {
      const { queryByTestId } = render(
        <Button iconNameBefore="folder" iconNameAfter="file">
          {TEST_TEXT}
        </Button>
      );
      expect(queryByTestId('icon-before')).toBeInTheDocument();
      expect(queryByTestId('icon-after')).toBeInTheDocument();
    });
  });

  describe('all type & size combinations render accurately', () => {
    it.each(BTN.TYPES)('type is "%s"', (type) => {
      if (isPropertyLimitation(type, TEST_SIZE)) {
        return Promise.resolve();
      }
      const { getByRole, getByTestId } = render(
        <Button type={type} size={TEST_SIZE}>
          {TEST_TEXT}
        </Button>
      );

      testClassnamesByType(type, TEST_SIZE, getByRole, getByTestId);
    });
    it.each(BTN.SIZES)('size is "%s"', (size) => {
      if (isPropertyLimitation(TEST_TYPE, size)) {
        return Promise.resolve();
      }
      const { getByRole, getByTestId } = render(
        <Button type={TEST_TYPE} size={size}>
          {TEST_TEXT}
        </Button>
      );

      testClassnamesByType(TEST_TYPE, size, getByRole, getByTestId);
    });
  });

  describe('loading', () => {
    it('does not render button without text', () => {
      const { queryByTestId } = render(
        <Button data-testid="no button here">{TEST_TEXT}</Button>
      );
      const el = queryByTestId('no button here');
      expect(el).toBeNull();
    });
    it('disables button when in loading state', () => {
      const { queryByText } = render(
        <Button isLoading={true}>Loading Button</Button>
      );
      const el = queryByText('Loading Button').closest('button');
      expect(el).toBeDisabled();
    });
  });
});
