export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      ENVIRONMENT: "dev" | "prod";
      // add more environment variables and their types here
    }
  }
}
