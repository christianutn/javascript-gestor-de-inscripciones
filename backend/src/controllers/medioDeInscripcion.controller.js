import { medioDeInscripcionModel } from "../models/medioDeInscripcion.models.js";

export const getMediosDeInscripcion = async (req, res) => {
    try {
        const mediosDeInscripcion = await medioDeInscripcionModel.find().sort('nombre');

        if (mediosDeInscripcion) {
            res.status(200).json(mediosDeInscripcion);
        } else {
            res.status(404).json({
                message: 'No se encontraron medios de inscripción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los medios de inscripción',
            error: `Consulta de error: ${error}`
        });
    }
}


export const getMedioDeInscripcionByCod = async (req, res) => {
    try {
        const { cod } = req.params;
        const medioDeInscripcion = await medioDeInscripcionModel.findOne({ cod });

        if (medioDeInscripcion) {
            res.status(200).json(medioDeInscripcion);
        } else {
            res.status(404).json({
                message: 'No se encontró el medio de inscripción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el medio de inscripción',
            error: `Consulta de error: ${error}`
        });
    }
}

export const postMedioDeInscripcion = async (req, res) => {
    try {
        const {cod, nombre} = req.body

        const newMedioDeInscripcion = await medioDeInscripcionModel.create({cod, nombre})
        
        if(newMedioDeInscripcion){
            res.status(201).json(newMedioDeInscripcion);
        }else{
            res.status(400).json({
                message: `No se pudo crear el medio de inscripción con los siguientes datos: cod: ${cod}, nombre: ${nombre}`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el medio de inscripción',
            error: `Consulta de error: ${error}`
        });
    }
}


export const updateMedioDeInscripcionByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const {nombre} = req.body
        const updatedMedioDeInscripcion = await medioDeInscripcionModel.findOneAndUpdate({cod}, {nombre}, {new: true})
        if(updatedMedioDeInscripcion){
            res.status(200).json(updatedMedioDeInscripcion)
        }else{
            res.status(404).json({
                message: 'No se encontró el medio de inscripción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el medio de inscripción',
            error: `Consulta de error: ${error}`
        });
    }
}

export const deleteMedioDeInscripcionByCod = async (req, res) => {
    try {
        const {cod} = req.params

        const medioDeInscripcion = await medioDeInscripcionModel.findOneAndDelete({cod})

        if(medioDeInscripcion){
            res.status(200).json(medioDeInscripcion)
        }else{
            res.status(404).json({
                message: 'No se encontró el medio de inscripción'
            });
        }


    } catch (error) {
        res.status(500).json({
            message: 'Error al borrar el medio de inscripción',
            error: `Consulta de error: ${error}`
        });
    }
}