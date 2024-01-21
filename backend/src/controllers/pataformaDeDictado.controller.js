import {plataformaDeDictadoModel} from "../models/plataformaDeDictado.models.js";

export const getPlataformaDeDictado = async (req, res) => {
    try {
        const plataformasDeDictados = await plataformaDeDictadoModel.find().sort('nombre');
        if(plataformasDeDictados){
            res.status(200).json(plataformasDeDictados);
        }else{
            res.status(404).json({
                message: 'No se encontraron plataformas de dictado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las plataformas de dictado',
            error: `Consulta de error: ${error}`
        })
    }
}

export const getPlataformaDeDictadoByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const plataformaDeDictado = await plataformaDeDictadoModel.findOne({cod})
        
        if(plataformaDeDictado){
            res.status(200).json(plataformaDeDictado);
        }else{
            res.status(404).json({
                message: 'No se encontraron plataformas de dictado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las plataformas de dictado',
            error: `Consulta de error: ${error}`
        })
    }
}

export const postPlataformaDeDictado = async (req, res) => {
    try {
        const {cod, nombre} = req.body

        const newPlataformaDeDictado = await plataformaDeDictadoModel.create({cod, nombre})
        
        if(newPlataformaDeDictado){
            res.status(201).json(newPlataformaDeDictado);
        }else{
            res.status(400).json({
                message: 'No se pudo crear la plataforma de dictado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la plataforma de dictado',
            error: `Consulta de error: ${error}`
        })
    }
}

export const updatePlataformaDeDictadoByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const {nombre} = req.body

        const plataformaDeDictado = await plataformaDeDictadoModel.findOneAndUpdate({cod}, {cod, nombre}, {new: true})

        if(plataformaDeDictado){
            res.status(200).json(plataformaDeDictado);
        }else{
            res.status(404).json({
                message: 'No se encontraron plataformas de dictado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las plataformas de dictado',
            error: `Consulta de error: ${error}`
        })
    }
}

export const deletePlataformaDeDictadoByCod = async (req, res) => {
    try {
        const {cod} = req.params
        const plataformaDeDictado = await plataformaDeDictadoModel.findOneAndDelete({cod})
        
        if(plataformaDeDictado){
            res.status(200).json(plataformaDeDictado);
        }else{
            res.status(404).json({
                message: 'No se encontraron plataformas de dictado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las plataformas de dictado',
            error: `Consulta de error: ${error}`
        })
    }
}