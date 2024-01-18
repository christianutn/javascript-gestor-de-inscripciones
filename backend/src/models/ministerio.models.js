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
    },
    areas: {
        type: [Schema.Types.ObjectId],
        ref: 'areas',
        required: true,
        default: []
    }
});


ministerioSchema.pre(['findOne', 'findById', 'find'], function () {
    this.populate('areas');
});

export const ministerioModel = model('ministerios', ministerioSchema)