import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { IServer } from '../server.interface';
import { bindings } from './inversify.config';
import { loggerMiddleware } from '../../../middlewares/logger';
import { errorHandler } from '../../../middlewares/error-handler';

export class ServerInversify implements IServer{
  private port: string;
  private app: InversifyExpressServer;
  public server: any;
  
  constructor(port: string) {
    this.port = port;
    let container = new Container();
    container.loadAsync(bindings);
    this.app = new InversifyExpressServer(container);
    this.init();
  }

  init () {
    this.app.setConfig((app) => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(helmet.xssFilter());
      app.use(helmet.noSniff());
      app.use(helmet.hidePoweredBy());
      app.use(helmet.frameguard({action: 'deny'}));
      app.use(compress());
      app.use(loggerMiddleware);
    });
    this.app.setErrorConfig((app) => {
      app.use(errorHandler);
    });    
    this.server = this.app.build();
  }

  getHTTPServer() {
    return this.server;
  }

  async listen(): Promise<void> {
    try {
      this.server.listen(this.port);
    } catch (error) {
      console.log(`Puerto no valido ${error}`)
    }
  }

  async close(): Promise<void> {
    process.on('exit', function() { process.exit(1); });
  }
}
