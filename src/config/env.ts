interface FrontendEnv {
  readonly VITE_API_BASE_URL?: string;
}

const rawEnv = import.meta.env as ImportMetaEnv & FrontendEnv;

export const env = {
  apiBaseUrl: rawEnv.VITE_API_BASE_URL || 'http://localhost:4000',
};
