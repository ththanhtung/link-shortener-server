import express from 'express'
import { dbInstance } from '../../database/init.database'
import { errorsHandler } from './middlewares/errorsHandler'
import router from './routes'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression';

const app = express()

app.use(express.json())
app.use(helmet())
app.use(compression())

app.use(cors({
    origin: '*'
}))


// init database
const db = dbInstance

app.use(router)
app.use(errorsHandler)

export default app