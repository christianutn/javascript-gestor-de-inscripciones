import { Schema, model } from "mongoose";


const autorizadorSchema = new Schema({
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
        required:true,
        validate: {
            validator: function(value) {
                return /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/u.test(value);
            },
            message: 'El nombre debe cumplir con las reglas de validación.'
        }
    },
    descripcion: {
        type: String
    }
});




export const autorizadorModel = model('autorizadores', autorizadorSchema)