declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    REDISCLOUD_URL: string;
    DATABASE_URL: string;
  }
}