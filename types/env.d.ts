declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;

    BOT_REDIS_URL: string;
    SERVER_REDIS_URL: string;
    DATABASE_URL: string;

    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_CALLBACK_URL: string;

    JWT_SECRET: string;
    WEB_CLIENT_URL: string;
    COOKIE_DOMAIN: string;
  }
}
