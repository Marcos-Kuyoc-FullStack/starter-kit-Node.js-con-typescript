import { ServerInversify } from './adapters/server/inversify/server-inversify';
import dontenv from 'dotenv'
dontenv.config();

export default class App {
  private port: string;

  constructor(port?: string) {
    this.port = (port) ? port : process.env.PORT || '3000'
  }

  async start() : Promise<void> {
    const server = new ServerInversify(this.port);
    await server.listen();
    console.log(`App is running at http://localhost:${this.port}`);
  }
}