import express from 'express'
import urlRoutes from './url'

const router = express.Router()

router.use('/v1/api/url', urlRoutes)

export default router