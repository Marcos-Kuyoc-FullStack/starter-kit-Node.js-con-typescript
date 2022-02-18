import { controller, httpGet } from 'inversify-express-utils';
import HttpError from 'http-errors';
import { Request, Response } from 'express';

@controller('/')
export class HomeController {
  @httpGet('/')
  public get(req: Request): object {
    return {
      greeting: 'Bienvenido a nuestra API',
      date: new Date(),
      url: req.url,
      headers: Object.assign({}, req.headers),
    };
  }
}