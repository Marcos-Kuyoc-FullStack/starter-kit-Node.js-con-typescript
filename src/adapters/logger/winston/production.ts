import {createLogger, format, transports} from 'winston'
const {json} = format

export const loggerProduction = createLogger({
  level: 'info',
  format: json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});