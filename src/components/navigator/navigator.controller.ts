import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';
import { NavigatorService } from './navigator.service';

@route('/api/v1/navigator')
export class NavigatorController {
  constructor(private readonly navigatorService: NavigatorService) {}

  @route('/')
  @GET()
  public async navigator(req: Request, res: Response) {
    try {
      const menu = await this.navigatorService.navigator();

      res.status(200).json(menu);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }

}
