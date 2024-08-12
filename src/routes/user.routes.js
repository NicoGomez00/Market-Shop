import { Router } from "express";
import { login , register , addUserData , logout , verifyToken } from "../controllers/auth.controller.js";
import { loginSchema , registerSchema } from "../schema/auth.schema.js";
import { validatorSchema } from '../middlewares/validator.middlewares.js'
import { authRequired } from "../middlewares/validateToken.js";


const router = Router()

router.post('/register' , validatorSchema(registerSchema) , register)
router.post('/login' , validatorSchema(loginSchema) , login)
router.patch('/userAccount' , authRequired , addUserData)
router.post('/logout' , authRequired , logout)
router.get('/verify' , verifyToken)

export default router
