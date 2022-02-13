import {createLogger, format, transports} from 'winston'
const {simple, colorize, combine, printf, timestamp} = format

const myFormat = printf(({ level, timestamp, message }) => {
  return `[${level}] ${timestamp} ${message}`;
});

export const loggerDeveloper = createLogger({
  level: 'info',
  format: combine(simple(), colorize(), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console()
  ],
});