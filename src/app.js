import express from "express";
import productsRoutes from './routes/products.routes.js'
import userRoutes from './routes/user.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    //establece las cookies a la solicitud
    credentials: true
}))

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

app.use('/' , userRoutes)
app.use('/api' , productsRoutes)
app.use('/api' , cartRoutes)
app.use('/uploads', express.static('uploads'));


export default app