import { toExternalUrl } from './externalUrl';

describe('toExternalUrl', () => {
  it('should keep an absolute web address', () => {
    expect(
      toExternalUrl('https://doi.org/10.1523/JNEUROSCI.1169-19.2019')
    ).toEqual('https://doi.org/10.1523/JNEUROSCI.1169-19.2019');
    expect(toExternalUrl('http://example.org/paper')).toEqual(
      'http://example.org/paper'
    );
  });

  it('should assume https for an address without a scheme', () => {
    expect(toExternalUrl('doi.org/10.1234/x')).toEqual(
      'https://doi.org/10.1234/x'
    );
    expect(toExternalUrl('www.example.org/paper')).toEqual(
      'https://www.example.org/paper'
    );
  });

  it('should ignore surrounding whitespace', () => {
    expect(toExternalUrl('  https://example.org/paper  ')).toEqual(
      'https://example.org/paper'
    );
  });

  it('should not link an address that is not http(s)', () => {
    expect(toExternalUrl('javascript:alert(document.cookie)')).toBeUndefined();
    expect(toExternalUrl('data:text/html,<script></script>')).toBeUndefined();
    expect(toExternalUrl('file:///etc/passwd')).toBeUndefined();
  });

  it('should not link an empty or unparseable address', () => {
    expect(toExternalUrl(undefined)).toBeUndefined();
    expect(toExternalUrl('')).toBeUndefined();
    expect(toExternalUrl('   ')).toBeUndefined();
    expect(toExternalUrl('https://')).toBeUndefined();
  });
});
