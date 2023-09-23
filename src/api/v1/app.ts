import express from 'express'
import { dbInstance } from '../../database/init.database'
import { errorsHandler } from './middlewares/errorsHandler'
import router from './routes'

const app = express()

app.use(express.json())


// init database
const db = dbInstance

app.use(router)
app.use(errorsHandler)

export default app