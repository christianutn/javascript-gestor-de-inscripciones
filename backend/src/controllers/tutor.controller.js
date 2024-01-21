import { tutorModel } from "../models/tutor.models.js";

export const getTutores = async (req, res) => {
    try {


        const query = {}

        const {cuil, apellido} = req.query
        if(cuil){
            query.cuil = {$regex: `${cuil}`,$options: "i"}
        }
        if(apellido){
            query.apellido = { $regex: `^${apellido}`, $options: 'i' };
        }
        const tutores = await tutorModel.find(query).sort('apellido');
        if(tutores){
            res.status(200).json(tutores);
        }else{
            res.status(404).json({
                message: 'No se encontraron tutores'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tutores',
            error: `Consulta de error: ${error}`
        })
    }
}

export const getTutorByCuil = async (req, res) => {
    try {
        const {cuil} = req.params

        const tutor = await tutorModel.findOne({cuil})
        
        if(tutor){
            res.status(200).json(tutor);
        }else{
            res.status(404).json({
                message: 'No se encontraron tutores'
            })
        }
       
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tutores',
            error: `Consulta de error: ${error}`
        })
    }
}

export const postTutor = async (req, res) => {
    try {
        const {cuil, nombre, apellido, correo, cel} = req.body

        const newTutor = await tutorModel.create({cuil, nombre, apellido, correo, cel})
        
        if(newTutor){
            res.status(201).json(newTutor);
        }else{
            res.status(400).json({
                message: `No se pudo crear el tutor`
            })
        }

    } catch (error) {
        res.status(500).json({
            message: `${error}`,
            error: `Consulta de error: ${error}`
        })
    }
}

export const updateTutorByCuilByCuil = async (req, res) => {
    try {
        const {cuil} = req.params
        const {nombre, apellido, correo, cel} = req.body
        const tutor = await tutorModel.findOneAndUpdate({cuil}, {cuil, nombre, apellido, correo, cel}, {new: true, runValidators: true})
        if(tutor){
            res.status(200).json(tutor);
        }else{
            res.status(404).json({
                message: 'No se encontraron tutores'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tutores',
            error: `Consulta de error: ${error}`
        })
    }
}

export const deleteTutorByCuil = async (req, res) => {
    try {
        const {cuil} = req.params
        const tutor = await tutorModel.findOneAndDelete({cuil})
        if(tutor){
            res.status(200).json(tutor);
        }else{
            res.status(404).json({
                message: 'No se encontraron tutores'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tutores',
            error: `Consulta de error: ${error}`
        })
    }
}