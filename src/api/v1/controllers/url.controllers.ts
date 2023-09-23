import { NextFunction, Request, Response } from "express";
import { URLServices } from "../services/url.services";

export class URLControllers {
  static async createNewShortenLink(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(201).send(await URLServices.createNewShortenLink(req.body))
    } catch (error) {
        next(error)
    }
  }
}
