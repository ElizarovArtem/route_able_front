export type EnvConfig = {
  API_URL: string;
};

export const config: EnvConfig = {
  API_URL: import.meta.env.VITE_API_URL,
};
