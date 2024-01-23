export const IS_SECURE = window.location.protocol.includes('https');

export const HOSTNAME =
  import.meta.env.VITE_SERVER_HOST || window.location.hostname;

export const PORT = import.meta.env.VITE_SERVER_PORT || window.location.port;
