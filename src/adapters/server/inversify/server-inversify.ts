import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import * as http from 'http';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { IServer } from '../server.interface';
import { bindings } from './inversify.config';


export class ServerInversify implements IServer{
  private readonly port: string;

  constructor(port: string) {
    this.port = port;
  }

  async start () {
    let container = new Container();
    await container.loadAsync(bindings);
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(helmet.xssFilter());
      app.use(helmet.noSniff());
      app.use(helmet.hidePoweredBy());
      app.use(helmet.frameguard({action: 'deny'}));
      app.use(compress())
    });
    return server;
  }


  async listen(): Promise<void> {
    const server = await this.start();
    let serverInstance = server.build();
    serverInstance.listen(this.port);
    console.log(`App is running at http://localhost:${this.port}`);
  }
}
