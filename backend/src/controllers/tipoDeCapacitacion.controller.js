import {tipoDeCapacitacionModel } from "../models/tipoDeCapacitacion.models.js";

export const getTipoDeCapacitacion = async (req, res) => {
    try {
        const tiposDeCapacitacion = await tipoDeCapacitacionModel.find().sort('nombre');
        
        if(tiposDeCapacitacion){
            res.status(200).json(tiposDeCapacitacion);
        }else{
            res.status(404).json({
                message: 'No se encontraron tipos de capacitación'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tipos de capacitación',
            error: `Consulta de error: ${error}`
        });
    }
}

export const getTipoDeCapacitacionByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const tipoDeCapacitacion = await tipoDeCapacitacionModel.findOne({cod})
        
        if(tipoDeCapacitacion){
            res.status(200).json(tipoDeCapacitacion);
        }else{
            res.status(404).json({
                message: 'No se encontraron tipos de capacitación'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tipos de capacitación',
            error: `Consulta de error: ${error}`
        });
    }
}

export const postTipoDeCapacitacion = async (req, res) => {
    try {
        const {cod, nombre} = req.body

        const newTipoDeCapacitacion = await tipoDeCapacitacionModel.create({cod, nombre})
        
        if(newTipoDeCapacitacion){
            res.status(201).json(newTipoDeCapacitacion);
        }else{
            res.status(400).json({
                message: `No se pudo crear el tipo de capacitación con los siguientes datos: cod: ${cod}, nombre: ${nombre}`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el tipo de capacitación',
            error: `Consulta de error: ${error}`
        });
    }
}

export const updateTipoDeCapacitacionByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const {nombre} = req.body
        const tipoDeCapacitacion = await tipoDeCapacitacionModel.findOneAndUpdate({cod}, {nombre}, {new: true})
        
        if(tipoDeCapacitacion){
            res.status(200).json(tipoDeCapacitacion);
        }else{
            res.status(404).json({
                message: 'No se encontraron tipos de capacitación'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tipos de capacitación',
            error: `Consulta de error: ${error}`
        });
    }
}

export const deleteMedioDeComunicacionByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const tipoDeCapacitacion = await tipoDeCapacitacionModel.findOneAndDelete({cod})
        
        if(tipoDeCapacitacion){
            res.status(200).json(tipoDeCapacitacion);
        }else{
            res.status(404).json({
                message: 'No se encontraron tipos de capacitación'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los tipos de capacitación',
            error: `Consulta de error: ${error}`
        });
    }
}