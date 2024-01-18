import { Schema, model } from "mongoose";

const tipoDeCapacitacionSchema = new Schema({
    cod: {
        type: String,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
});

export const tipoDeCapacitacionModel = model('tiposdecapacitaciones', tipoDeCapacitacionSchema);