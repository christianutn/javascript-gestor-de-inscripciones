import {Schema, model} from "mongoose";

const inscripcionSchema = new Schema({
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'cursos',
        required: true
    },
    fechaInicioCurso: {
        type: Date,
        required: true
    },
    fechaFinCurso: {
        type: Date,
        required: true
    },
    fechaInicioInscripcion: {
        type: Date,
        required: true
    },
    fechaFinInscripcion: {
        type: Date,
        required: true
    },
    cupo: {
        type: Number,
        required: true,
        validate: {
            validator: value => Number.isInteger(value) && value > 0,
            message: 'El cupo debe ser un entero mayor a cero'
        }
    },
    cantidadHoras: {
        type: Number,
        required: true
    },
    medioDeInscripcion: {
        type: Schema.Types.ObjectId,
        ref: 'mediosdeinscripciones',
        required: true
    },
    plataformaDeDictado: {
        type: Schema.Types.ObjectId,
        ref: 'plataformasdedictados',
        required: true
    },
    tipoDeCapacitacion: {
        type: Schema.Types.ObjectId,
        ref: 'tiposdecapacitaciones',
        required: true
    },
    observacion: {
        type: String
    },
    tutores: {
        type: [Schema.Types.ObjectId],
        ref: 'tutores',
        required: true
       
    },
    referente: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})


inscripcionSchema.index({curso: 1, fechaInicioCurso: 1}, {unique: true});


inscripcionSchema.pre(['findOne', 'findById', 'find'], function() {
    this.populate({
        path: 'curso',
        populate: [
            { path: 'area', populate: { path: 'ministerio' } },
            { path: 'autorizador' }
        ]
    })
    .populate('medioDeInscripcion')
    .populate('plataformaDeDictado')
    .populate('tipoDeCapacitacion')
    .populate('tutores')
    .populate('referente')
    
});
export const inscripcionModel = model('inscripciones', inscripcionSchema)