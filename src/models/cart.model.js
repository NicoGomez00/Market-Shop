import mongoose from "mongoose";


// Definir el esquema de Item dentro del carrito
const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

// Definir el esquema del Carrito
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [itemSchema]
}, { timestamps: true });

// Crear el modelo del Carrito
const Cart = mongoose.model('Cart', cartSchema);

export default Cart