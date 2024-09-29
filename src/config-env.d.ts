/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    PROCESS_NAME: string;
    LISTEN_PORT: string;
    NODE_ENV: "development" | "production";
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
