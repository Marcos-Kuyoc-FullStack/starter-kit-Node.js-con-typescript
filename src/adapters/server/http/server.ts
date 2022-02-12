import express, { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import * as http from 'http';
import { IServer } from '../server.interface';

export class Server implements IServer{
  private express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.init();
  }

  init () {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({action: 'deny'}));
    this.express.use(compress())

    const router = Router();

    router.use((error: Error, req: Request, res: Response, next: Function) => {
      console.log(error);
      res.status(500).send(error.message);
    })
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`App is running at http://localhost:${this.port}`);
      })
      resolve();
    })
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        })
        return resolve();
      }
    })
  }
}
