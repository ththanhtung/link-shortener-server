import { NextFunction, Request, Response } from 'express';
import { URLServices } from '../services/url.services';

export class URLControllers {
  static async createNewShortenLink(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(201).send(await URLServices.createNewShortenLink(req.body));
    } catch (error) {
      next(error);
    }
  }

  static async redirectShortenLink(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { shortenLink } = req.params;
    try {
      res.redirect(await URLServices.redirectShortenLink(shortenLink));
    } catch (error) {
      next(error);
    }
  }
  static async updateLink(
    req: Request<{ shortenLink: string }, {}, { fullLink: string }, {}>,
    res: Response,
    next: NextFunction
  ) {
    const { shortenLink } = req.params;
    try {
      res.send(
        await URLServices.updateLink({
          shortenLink,
          fullLink: req.body.fullLink,
        })
      );
    } catch (error) {
      next(error);
    }
  }
  static async getLinks(req: Request, res: Response, next: NextFunction) {
    try {
      res.send(await URLServices.getLinks());
    } catch (error) {
      next(error);
    }
  }
}
