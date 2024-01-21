import { areaModel } from "../models/area.models.js";

export const getAreas = async (req, res) => {

    try {

        const { cod, nombre, ministerio } = req.query;

        const query = {};
        if (cod) {
            query.cod = cod;
        }
        if(nombre){
            query.nombre = {$regex: `${nombre}`,$options: "i"}
        }
        if(ministerio){
            query.ministerio = ministerio
        }

        const areas = await areaModel.find(query).sort('nombre');



        if (areas) {
            res.status(200).json(areas);
        } else {
            res.status(404).json({
                message: 'No se encontraron areas'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las areas',
            error: `Consulta de error: ${error}`
        });
    }

}

export const getAreaByCod = async (req, res) => {
    try {
        const { cod } = req.params;
        const area = await areaModel.findOne({ cod });

        if (area) {
            res.status(200).json(area);
        } else {
            res.status(404).json({
                message: `El area con cod: ${cod} no se encontró`
            });

        }
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener el area`,
            error: `Consulta de error: ${error}`
        });

    }
}


export const postArea = async (req, res) => {

    try {
        const { nombre, cod, ministerio } = req.body;
        const newArea = await areaModel.create({ cod, nombre, ministerio });

        if (newArea) {
            res.status(201).json(newArea);
        } else {
            res.status(400).json({
                message: `No se pudo crear el area con los siguientes datos: cod: ${cod}, nombre: ${nombre}, ministerio: ${ministerio}`
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el area',
            error: `Detalle de error: ${error}`
        });
    }
}


export const deleteAreaByCod = async (req, res) => {

    try {
        const { cod } = req.params

        const area = await areaModel.findOneAndDelete({ cod });

        if (area) {
            res.status(200).json(area);
        } else {
            res.status(404).json({
                message: `El area con cod: ${cod} no se encontró`
            });
        }
    } catch (error) {

        res.status(500).json({
            message: 'Error al eliminar el area',
            error: `Detalle de error: ${error}`
        });

    }
}

export const updateAreaByCod = async (req, res) => {
    try {
        const { cod } = req.params

        const { nombre } = req.body

        const area = await areaModel.findOneAndUpdate({ cod }, { cod, nombre }, { new: true });

        if (area) {
            res.status(200).json(area);
        } else {
            res.status(404).json({
                message: `El area con cod: ${cod} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el area',
            error: `Consulta de error: ${error}`
        });
    }
}