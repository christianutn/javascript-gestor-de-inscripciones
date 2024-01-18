import { Schema, model } from "mongoose";

const cursoSchema = new Schema({
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
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: 'areas',
        required: true
    },
    autorizador: {
        type: Schema.Types.ObjectId,
        ref: 'autorizadores',
        required: true
    }
});


cursoSchema.pre(['findOne', 'findById', 'find'], function () {
    this.populate('ministerio');
    this.populate('autorizador');
    this.populate('area');
});


export const cursoModel = model('cursos', cursoSchema)