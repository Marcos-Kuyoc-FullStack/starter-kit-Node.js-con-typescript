import { ServerInversify } from "../../adapters/server/inversify/server-inversify";
import { setupApplication } from "../helpers/setup-application";

describe('Acceptance Test - Health-check', () => {
  let app: ServerInversify, client: any; 

  beforeEach(async() => {
    ({app, client} = await setupApplication());
  })
  
  test('/', async() => {
    const response = await client.get('/').set('Accept', 'application/json');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('greeting');
    expect(response.body.greeting).toEqual('Bienvenido a nuestra API');
  })

  test('/home', async() => {
    const response = await client.get('/home').set('Accept', 'application/json');

    expect(response.statusCode).toEqual(404);
  })
})