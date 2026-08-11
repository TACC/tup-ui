const SAFE_PROTOCOLS = ['http:', 'https:'];
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * Resolve a user-provided web address to an absolute, safe-to-link URL
 *
 * An address without a scheme (e.g. `doi.org/10.1234/x`) is assumed to be
 * `https`, and any address that is not `http`/`https` (e.g. `javascript:…`)
 * is not linkable.
 *
 * @param {string} [url] - A web address, with or without a scheme
 * @returns {string|undefined} An absolute `http`/`https` URL, or `undefined`
 */
export function toExternalUrl(url?: string): string | undefined {
  const value = (url ?? '').trim();

  if (!value) return undefined;

  try {
    const parsed = new URL(HAS_SCHEME.test(value) ? value : `https://${value}`);

    return SAFE_PROTOCOLS.includes(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}
