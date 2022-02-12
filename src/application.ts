import { ServerInversify } from './adapters/server/inversify/server-inversify';
import { IServer } from './adapters/server/server.interface';

export class App {
  server?: IServer;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new ServerInversify(port);
    await this.server.listen();
  }
}