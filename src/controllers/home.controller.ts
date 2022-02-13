import { controller, httpGet } from 'inversify-express-utils';
import HttpError from 'http-errors';

@controller('/')
export class HomeController {
  @httpGet('/')
  public get(): string {
    throw new HttpError.BadRequest('este es un error');
  }
}