import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
        default: 0
    },
    img: {
        type: String,
        require: true,
        default: '/'
    }
}, 
{ 
    //Crea una propiedad similar a date
    timestamps: true 
});
//Interactua los metodos con la base de datos
const Product = mongoose.model('Product' , productSchema)

export default Product