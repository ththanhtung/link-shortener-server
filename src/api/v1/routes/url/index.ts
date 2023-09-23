import express from 'express';
import { URLControllers } from '../../controllers/url.controllers';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validateRequest';

const urlRoutes = express.Router();

urlRoutes.post(
  '/',
  [body('fullLink').notEmpty().withMessage('you must provide a link')],
  validateRequest,
  URLControllers.createNewShortenLink
);

export default urlRoutes;