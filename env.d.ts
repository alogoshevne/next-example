declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_TOKEN_NAME: string;
    NEXT_APP_API_URL: string;
    NEXT_APP_SENTRY_ENVIRONMENT: string;
    NEXT_APP_SENTRY_DSN: string;
    NEXT_APP_PROD_ENVIRONMENT: string;
    HTPASSW_USERNAME: string;
    HTPASSW_PASS: string;
    // тут ви можете додавати інші змінні середовища, які використовуєте у вашому додатку
  }
}