import express, { query } from 'express'
import dotenv from 'dotenv'
import routerTask from './router/taskRouter.js'
import cors from 'cors'

//configuracion inicial
const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())

//importando rutas
app.use(routerTask)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server corriendo en el puerto', PORT)
})
