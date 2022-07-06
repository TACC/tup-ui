

// Get config provided to the window object via SSR.
const useConfig = () => {
  const config = window.__TUP_CONFIG__;
  if (!config) {
    console.warn("No baseUrl has been set, defaulting to http://localhost:8000");
  }
  // return a default if no config exists on the window.
  return config ?? { baseUrl: 'http://localhost:8000' };
};

export default useConfig;