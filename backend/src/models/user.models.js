import { Schema, model } from "mongoose";

const userSchema = new Schema({
    cuil: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{11}$/
    },
    nombre: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/u.test(value);
            },
            message: 'El nombre debe cumplir con las reglas de validación.'
        }
    },
    apellido: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/u.test(value);
            },
            message: 'El nombre debe cumplir con las reglas de validación.'
        }
    },
    correo: {
        type: String,
        required: true,
        // Validación de correo electrónico utilizando expresión regular
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    cel: {
        type: String,
        // Validación de número de celular utilizando expresión regular
        match: /^[0-9]{10}$/
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length >= 4;
            },
            message: 'La contraseña debe tener al menos 4 caracteres.'
        }},
    rol: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === 'administrador' || value === 'referente' || value === 'cronograma' || value === 'super';
            },
            message: 'El rol debe ser administrador, referente, cronograma ó super.'
        }
    } 
});

export const userModel = model('users', userSchema)