import express from 'express'
import { PORT } from './config.js'
import indexRoutes from './routes/index.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()
const _dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())

app.use(indexRoutes)
app.use(taskRoutes)

app.use(express.static(join(_dirname, '../client/dist')))

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)
