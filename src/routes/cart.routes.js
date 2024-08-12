import express from "express";
import { getCart , getProductCart , addToCart , removeFromCart , clearCart , updateItemQuantity} from "../controllers/cart.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = express.Router()

router.get('/cart' , authRequired , getCart)
router.post('/products' , authRequired , addToCart)
router.post('/cart' , authRequired , getProductCart)
router.patch('/cart/:productId', authRequired, updateItemQuantity);
router.delete('/cart/:productId' , authRequired , removeFromCart)
router.delete('/cart' , authRequired , clearCart)

export default router