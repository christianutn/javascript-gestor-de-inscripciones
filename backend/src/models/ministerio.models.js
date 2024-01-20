import { Schema, model } from "mongoose";

const ministerioSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    }
});


export const ministerioModel = model('ministerios', ministerioSchema)