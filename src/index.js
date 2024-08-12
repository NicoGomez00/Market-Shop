import app from './app.js'
import db from "./database.js";

const PORT = process.env.PORT || 3000

db //Connectar la base de datos

app.listen(PORT)
console.log(`Server listener on port ${PORT}`)