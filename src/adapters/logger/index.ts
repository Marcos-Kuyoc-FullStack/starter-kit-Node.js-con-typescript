import { loggerDeveloper } from "./winston/developer";
import { loggerProduction } from "./winston/production";

let loggerWiston;

if (process.env.ENVIROTMENT === 'production') {
  loggerWiston = loggerProduction;
} else {
  loggerWiston = loggerDeveloper;
}

export const logger = loggerWiston;