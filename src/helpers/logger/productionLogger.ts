import winston from 'winston';
import { SentryTransport } from 'winston-sentry-javascript-node';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

import { verifyEnvironment } from '@helpers/env';

const { isProduction } = verifyEnvironment();

const transports: ConsoleTransportInstance[] = [
  new winston.transports.Console(),
];
if (isProduction) {
  const sentryTransport = new SentryTransport({
    sentry: {
      dsn: '',
    },
  });
  transports.push(sentryTransport as ConsoleTransportInstance);
}
export const productionLogger = winston.createLogger({
  transports,
  format: winston.format.json(),
});
