import { ServerInversify } from "../../adapters/server/inversify/server-inversify";
import request from 'supertest'

export const setupApplication = async(): Promise<AppAndClient> => {
  const server = new ServerInversify('5000');
  const app = server.server
  const client = request(app);
  return {app, client};
}

export interface AppAndClient {
  app: ServerInversify
  client: any
}