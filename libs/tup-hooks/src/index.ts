// Extend the window type to support custom config passed from the server side.
declare global {
  interface Window {
    __TUP_CONFIG__: {
      baseUrl: string;
    };
  }
}

export * from './auth';
export * from './sysmon';
export * from './projects';
export * from './tickets';
export * from './news';
export * from './mfa';

export { default as useConfig } from './useConfig';
