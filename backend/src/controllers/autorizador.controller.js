import {autorizadorModel} from "../models/autorizador.models.js";


export const getAutorizadores = async (req, res) => {
    
    try {


        const query = {};

        const { nombre, apellido } = req.query;
        if (nombre) {
            query.nombre = { $regex: nombre, $options: 'i' };
        }
        if (apellido) {
            query.apellido = { $regex: apellido, $options: 'i' };
        }
        const autorizadores = await autorizadorModel.find(query).sort('apellido');
        
        if(autorizadores){
            res.status(200).json(autorizadores);
        }else{
            res.status(404).json({
                message: 'No se encontraron autorizadores'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los autorizadores',
            error: `Consulta de error: ${error}`
        });
    }
    
}

export const getAutorizadorById = async (req, res) => {
    try {
        const { id } = req.params;
        const autorizador = await autorizadorModel.findById(id);
        if (autorizador) {
            res.status(200).json(autorizador);
        } else {
            res.status(404).json({
                message: 'Autorizador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el autorizador',
            error: `Consulta de error: ${error}`
        });
    }
}

export const postAutorizador = async (req, res) => {
    try {
        const {nombre, apellido, descripcion} = req.body;
        const newAutorizador = await autorizadorModel.create({nombre, apellido, descripcion});
        

        if(newAutorizador){
            res.status(201).json(newAutorizador);
        }else{
            res.status(400).json({
                message: `No se pudo crear el autorizador con los siguientes datos: nombre: ${nombre}, apellido: ${apellido}, descripción: ${descripcion}`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el autorizador',
            error: `Consulta de error: ${error}`
        });
    }
}

export const deleteAutorizadorById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log("ID de autorizador: ", id);
        const deletedAutorizador = await autorizadorModel.findOneAndDelete(id);
        if(deletedAutorizador){
            res.status(200).json(deletedAutorizador);
        }else{
            res.status(404).json({
                message: 'Autorizador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el autorizador',
            error: `Consulta de error: ${error}`
        });
    }
}

export const updateAutorizadorById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, descripcion } = req.body;
        const updatedAutorizador = await autorizadorModel.findOneAndUpdate({ id }, { nombre, apellido, descripcion }, { new: true });
        if (updatedAutorizador) {
            res.status(200).json(updatedAutorizador);
        } else {
            res.status(404).json({
                message: 'Autorizador no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el autorizador',
            error: `Consulta de error: ${error}`
        });
    }
}