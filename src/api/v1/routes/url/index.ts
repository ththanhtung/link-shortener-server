import express from 'express';
import { URLControllers } from '../../controllers/url.controllers';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validateRequest';

const urlRoutes = express.Router();

urlRoutes.post(
  '/url',
  [body('fullLink').notEmpty().withMessage('you must provide a link')],
  validateRequest,
  URLControllers.createNewShortenLink
);

urlRoutes.get('/url/all', URLControllers.getLinks);
urlRoutes.get('/url/:shortenLink', URLControllers.redirectShortenLink);
urlRoutes.patch('/url/:shortenLink', URLControllers.updateLink)
urlRoutes.delete('/url/:shortenLink', URLControllers.deleteLink)

export default urlRoutes;
