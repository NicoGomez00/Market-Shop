import Cart from "../models/cart.model.js";
import db from '../database.js'
import { ObjectId } from "mongodb";

let collection;
let productsCollection;

(async () => {
    collection = await db.collection("cart");
    productsCollection = await db.collection("products");
})();


export const getCart = async (req , res) => {
    const userLogged = new ObjectId(req.user.id)
    try {
        let results = await collection.find({userId: userLogged}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getProductCart = async (req, res) => {
    const { productIds } = req.body;
    try {
        const objectIds = productIds.map(id => new ObjectId(id));
        const products = await productsCollection.find({ _id: { $in: objectIds } }).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información de los productos' });
    }
};


export const addToCart = async (req, res) => {
    try {
        const userLogged = new ObjectId(req.user.id);
        const { productId, productName, quantity } = req.body;

        // Verificar si el usuario ya tiene un carrito
        let userCart = await collection.findOne({ userId: userLogged });

        if (userCart) {
            // Verificar si el producto ya está en el carrito
            const productIndex = userCart.items.findIndex(item => item.productId === productId);

            if (productIndex > -1) {
                // Producto ya está en el carrito, no se añade de nuevo
                return
            } else {
                // Producto no está en el carrito, añadirlo
                await collection.updateOne(
                    { userId: userLogged },
                    { $push: { items: { productId, productName, quantity } } }
                );
            }
        } else {
            // Crear un nuevo carrito para el usuario
            const productCart = {
                userId: userLogged,
                items: [{ productId, productName, quantity }]
            };

            await collection.insertOne(productCart);
        }

        res.json({ message: 'Producto añadido al carrito' });

    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};


export const updateItemQuantity = async (req, res) => {
    try {
        const userLogged = new ObjectId(req.user.id);
        const productId = new ObjectId(req.params.productId);
        const { increment } = req.body; // Asegúrate de que increment esté en el cuerpo de la solicitud

        if (typeof increment !== 'boolean') {
            return res.status(400).json({ message: 'Invalid increment value' });
        }

        let cart = await collection.findOne({ userId: userLogged });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        
        const itemIndex = cart.items.findIndex(item => item.productId === productId.toString());
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
        
        const item = cart.items[itemIndex];
        if (increment) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 1) {
                item.quantity = 1
            }
        }

        await collection.updateOne(
            { userId: userLogged },
            { $set: { items: cart.items } }
        );

        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userLogged = new ObjectId(req.user.id);
        const productId = req.params.productId; // Obtener el productId de los parámetros

        // Encuentra el carrito del usuario
        const cart = await collection.findOne({ userId: userLogged });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Filtra los items para eliminar el que coincide con el productId
        const updatedItems = cart.items.filter(item => item.productId !== productId);
        
        // Actualiza el carrito y guarda los cambios
        cart.items = updatedItems;
        await collection.updateOne({ _id: cart._id }, { $set: { items: updatedItems } });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userLogged = new ObjectId(req.user.id);
        let cart = await collection.findOne({ userId: userLogged });

        if (cart) {
            // Actualiza el documento directamente en la colección
            await collection.updateOne(
                { userId: userLogged },
                { $set: { items: [] } }
            );
            return res.status(204).json(cart); // Código 204 indica "No Content"
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).json({ message: error.message });
    }
}
