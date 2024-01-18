import { Schema, model } from "mongoose";

const areaSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        
    }
});

export const areaModel = model('areas', areaSchema)