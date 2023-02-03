import logo from './TACC-formal-Black-1c.svg';

// https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
const logoUrl = new URL(logo, import.meta.url).href;

export const blackLogo = logoUrl;
