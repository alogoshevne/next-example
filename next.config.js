/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_SENTRY_ENVIRONMENT: process.env.NEXT_APP_SENTRY_ENVIRONMENT,
    NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
    NEXT_APP_PROD_ENVIRONMENT: process.env.NEXT_APP_PROD_ENVIRONMENT,
    HTPASSW_USERNAME: process.env.HTPASSW_USERNAME,
    HTPASSW_PASS: process.env.HTPASSW_PASS,
    AUTH_TOKEN_NAME: process.env.AUTH_TOKEN_NAME || 'auth_token',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  },
};

module.exports = nextConfig;
