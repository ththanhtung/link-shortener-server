import express from 'express'
import { URLControllers } from '../../controllers/url.controllers'

const urlRoutes = express.Router()

urlRoutes.post('/', URLControllers.createNewShortenLink)

export default urlRoutes
