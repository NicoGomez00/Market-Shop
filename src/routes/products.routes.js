import express from "express";
import { getAllProducts , getProduct } from "../controllers/products.controller.js";

const router = express.Router()

router.get('/products' , getAllProducts)
router.get('/products/:id' , getProduct)


export default router