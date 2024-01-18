import { Schema, model } from "mongoose";

const medioDeInscripcionSchema = new Schema({
    cod:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    }
}); 

export const medioDeInscripcionModel = model('mediosdeinscripciones', medioDeInscripcionSchema)