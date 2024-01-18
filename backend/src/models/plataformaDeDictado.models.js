import { Schema, model } from "mongoose";

export const plataformaDeDictadoSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
});


export const plataformaDeDictadoModel = model('plataformasdedictados', plataformaDeDictadoSchema)