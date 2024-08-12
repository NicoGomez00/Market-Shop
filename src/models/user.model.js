import mongoose from "mongoose";

// Definir un subesquema para los datos personales
const personalInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    secondName: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    cp: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
});

// Esquema principal de usuario
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    personalInfo: personalInfoSchema, // Incluir el subesquema como un campo
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
