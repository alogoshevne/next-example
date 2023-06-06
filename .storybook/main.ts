import type { StorybookConfig } from "@storybook/nextjs";
const path = require("path");
const toPath = filePath => path.join(process.cwd(), filePath);
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mui-mode",
    "storybook-addon-perfect-design",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async config => {
    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve(__dirname, '../src'),
      'node_modules'
    ];
    config.resolve.fallback = {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "domain": false,
      "console": false,
      "tty": false,
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser")
    };
    return {
      ...config,
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@sentry/node':'@sentry/browser',
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "@emotion/styled": toPath("node_modules/@emotion/styled"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
          '@mocks': path.resolve(__dirname, "../src/REST/mocks"),
          '@core': path.resolve(__dirname, "../src/core"),
          '@setup': path.resolve(__dirname, "../src/setup"),
          '@bus': path.resolve(__dirname, "../src/bus"),
          '@components': path.resolve(__dirname, "../src/components"),
          '@REST': path.resolve(__dirname, "../src/REST"),
          '@helpers': path.resolve(__dirname, "../src/helpers"),
          '@public': path.resolve(__dirname, "../public"),
          '@layouts': path.resolve(__dirname, "../src/layouts"),
          '@utils': path.resolve(__dirname, "../src/utils"),
        },
      },
    };
  },
  docs: {
    autodocs: "tag",
  },
  // @ts-ignore
  env: (config) => {
    return ({
      ...config,
      IS_STORYBOOK: true
    });
  },
};
export default config;
