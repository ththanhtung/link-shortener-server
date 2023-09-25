import express from 'express';
import { URLControllers } from '../../controllers/url.controllers';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validateRequest';

const urlRoutes = express.Router();

urlRoutes.post(
  '/url',
  [body('fullLink').notEmpty().isURL().withMessage('you must provide a valid link')],
  validateRequest,
  URLControllers.createNewShortenLink
);

urlRoutes.get('/url/all', URLControllers.getLinks);
urlRoutes.get('/url/:shortenLink', URLControllers.redirectShortenLink);
urlRoutes.patch('/url/:shortenLink', URLControllers.updateLink)
urlRoutes.delete('/url/:shortenLink', URLControllers.deleteLink)
urlRoutes.post('/url/deactive/:shortenLink', URLControllers.deActiveLink)
urlRoutes.post('/url/active/:shortenLink', URLControllers.activeLink)

export default urlRoutes;
