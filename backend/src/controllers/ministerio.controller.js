import { ministerioModel } from "../models/ministerio.models.js";


export const getMinisterios = async (req, res) => {
    
    try {

        let query = {};

        const {cod, nombre} = req.query;
        if(cod) query.cod = cod
        if(nombre) query.nombre = nombre


        const ministerios = await ministerioModel.find(query).sort('nombre');
        
        if(ministerios && ministerios.length > 0){
            res.status(200).json(ministerios);
        }else{
            res.status(404).json({
                message: 'No se encontraron ministerios - Not Found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los ministerios',
        });
    }
    
}


export const getMinisterioById = async (req, res) => {
    
    try {
        const { id } = req.params;
        const ministerio = await ministerioModel.findById(id);
        
        if(ministerio){
            res.status(200).json(ministerio);
        }else{
            res.status(404).json({
                message: `El ministerio con cod: ${id} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el ministerio',
            error: `Consulta de error: ${error}`
        });
    }
}

export const updateMinisterioByCod = async (req, res) => {
    try {
        const {cod} = req.params;
        const {nombre} = req.body;
        const ministerio = await ministerioModel.findOneAndUpdate({cod}, {cod, nombre}, {new: true});
        if(ministerio){
            res.status(200).json(ministerio);
        }else{
            res.status(404).json({
                message: `El ministerio con cod: ${cod} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error al actualizar el ministerio con cod: ${cod}`,
            error: `Consulta de error: ${error}`
        });
    }}

    export const deleteMinisterioByCod = async (req, res) => {
        try {
            const {cod} = req.params;
            const ministerio = await ministerioModel.findOneAndDelete({cod});
            if(ministerio){
                res.status(200).json(ministerio);
            }else{
                res.status(404).json({
                    message: `El ministerio con cod: ${cod} no se encontró`
                });
            }
        } catch (error) {
            res.status(500).json({
                message: `Error al eliminar el ministerio con cod: ${cod}`,
                error: `Consulta de error: ${error}`
            });
        }
    }

    //Crear un nuevo ministerio
    export const postMinisterio = async (req, res) => {
        try {
            const {cod, nombre} = req.body;
            const newMinisterio = await ministerioModel.create({cod, nombre});
            res.status(201).json(newMinisterio);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear el ministerio',
                error: `Detalle de error: ${error}`
            });
        }
    }

