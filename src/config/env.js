const rawEnv = import.meta.env;

export const env = {
  apiBaseUrl: rawEnv.VITE_API_BASE_URL || "http://localhost:4000",
};
