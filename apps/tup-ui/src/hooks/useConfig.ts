// Get config provided to the window object via SSR.
const useConfig = () => {
  const config = window.__TUP_CONFIG__;
  // return a default if no config exists on the window.
  return config ?? { baseUrl: 'http://localhost' };
};

export default useConfig;
