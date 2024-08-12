import { z } from 'zod'

export const registerSchema = z.object({

    username: z.string({
        required_error: 'Username is required'
    })
    .min(6 , { message: "Username must be 6 or more characters long" })
    .max(25 , { message: "Username must be 25 or fewer characters long" })
    .toLowerCase(),

    email: z.string({
        required_error: 'Email is required'
    })
    .email({ message: 'Invalid email'})
    .toLowerCase(),

    password: z.string({
        required_error: 'Password is required'
    }).min(6 , { message: "Password must be 6 or more characters long" })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
    .email({ message: 'Invalid email'})
    .toLowerCase(),

    password: z.string({
        required_error: 'Password is required'
    })
    .min(6 , { message: "Password must be 6 or more characters long" })
})