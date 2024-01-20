import { Schema, model } from "mongoose";

// Define el esquema
const areaSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    ministerio: {
        type: Schema.Types.ObjectId,
        ref: 'ministerios',
        required: true
    }
});

areaSchema.pre(['findOne', 'findById', 'find'], function () {
    this.populate('ministerio');
});
// Define el modelo
export const areaModel = model('areas', areaSchema);
