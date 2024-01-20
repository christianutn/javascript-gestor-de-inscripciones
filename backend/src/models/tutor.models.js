import { Schema, model } from "mongoose";

const tutorSchema = new Schema({
    cuil: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]{11}$/.test(value);
            },
            message: props => `${props.value} no es un CUIL válido. Debe tener 11 dígitos.`
        }
    },

    nombre: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/u.test(value);
            },
            message: 'El nombre debe cumplir con las reglas de validación.'
        }
    },
    apellido: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
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
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: props => `${props.value} no es un número de celular válido. Debe tener 10 dígitos.`
        }
    }

});

export const tutorModel = model('tutores', tutorSchema)