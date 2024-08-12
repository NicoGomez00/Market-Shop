import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";
import db from '../database.js'
import { ObjectId } from "mongodb";

let collection;

(async () => {
    collection = await db.collection("users");
})();

export const register = async (req , res) => {
    const {username , email , password} = req.body
    try {
        let userFound = await collection.findOne({username})
        if(userFound) return res.status(401).json(['Username already exists'])

        let emailFound = await collection.findOne({email})
        if(emailFound) return res.status(401).json(['Email already exists'])

        const hashedPassword = await bcryptjs.hash(password , 8)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            personalInfo: {
                firstName: '',
                secondName: '',
                address: '',
                country: '',
                cp: '',
                phone: '',
            },
        });

        const userSaved = await collection.insertOne(newUser)
        const userId = userSaved.insertedId

        const token = await createAccessToken({id: userId})
        res.cookie('token' , token)


        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            personalInfo: userSaved.personalInfo
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const login = async (req , res) => {
    const {email , password} = req.body
    try {
        const userFound = await collection.findOne({email})
        if(!userFound) return res.status(400).json(["Email doesn't exist"])
        
        const passwordMatch = await bcryptjs.compare(password , userFound.password)
        if(!passwordMatch) return res.status(400).json(["Password Incorrect"])

        const token = await createAccessToken({id: userFound._id})
        res.cookie('token' , token)

        console.log(userFound)

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            personalInfo: userFound.personalInfo
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const addUserData = async (req , res) => {
    const { firstName, secondName, address, country, cp, phone } = req.body;
    const userLogged = new ObjectId(req.user.id);

    let user = await collection.findOne({ _id: userLogged });

    if (user) {
        // Actualiza las propiedades del documento existente utilizando $set en updateOne
        await collection.updateOne(
            { _id: userLogged },
            {
                $set: {
                    'personalInfo.firstName': firstName,
                    'personalInfo.secondName': secondName,
                    'personalInfo.address': address,
                    'personalInfo.country': country,
                    'personalInfo.cp': cp,
                    'personalInfo.phone': phone,
                },
            }
        );
    
        console.log('Usuario actualizado');
        res.json(user)
    } else {
        console.log('Usuario no encontrado');
    }
}

export const logout = async ( req , res) => {
    try {
        res.cookie('token' , '' , {
            expires: new Date(0)
        })
        return res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json(['Unauthorized']);
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log('Decoded token:', decoded);

        // Verificar que el ID decodificado sea válido
        if (!decoded.id || !ObjectId.isValid(decoded.id)) {
            return res.status(400).json(['Invalid user ID']);
        }

        const userFound = await collection.findOne({ _id: new ObjectId(decoded.id) });

        if (!userFound) return res.status(401).json(['Unauthorized']);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            personalInfo: userFound.personalInfo
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: error.message });
    }
};
