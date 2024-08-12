import Product from "../models/product.model.js";
import db from '../database.js'
import { ObjectId } from "mongodb";

export const getAllProducts = async (req , res) => {
   try {
    let collection = await db.collection("products");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
   } catch (error) {
        res.status(500).json({message: error})
   }
}

export const getProduct = async (req , res) => {
    try {
        let collection = await db.collection("products");
        let query = { _id: new ObjectId(req.params.id)}
        const productFound = await collection.findOne(query)

        if(!productFound) return res.status(401).json({message: 'Product not found'})
        
        res.send(productFound).status(200) 
    } catch (error) {
        res.status(500).json({message: error})
    }
}