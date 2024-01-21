import { cursoModel } from "../models/curso.models.js";

export const getCursos = async (req, res) => {
    try {

        

        const { cod, area } = req.query;

        let query = {};

        if (cod) {
            query.cod = cod; // Usa query.cod como una clave para asignar el valor de cod
        }

        if(area){
            query.area = area;
        }

        const cursos = await cursoModel.find(query).sort('nombre');

        if (cursos.length > 0) {
            res.status(200).json(cursos);
        } else {
            res.status(404).json({
                message: 'No se encontraron cursos'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los cursos',
            error: `Consulta de error: ${error}`
        });
    }
};


export const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoModel.findById(id);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({
                message: `El curso con cod: ${id} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el curso',
            error: `Consulta de error: ${error}`
        });
    }
}


export const updateCursoByCod = async (req, res) => {
    try {
        const { cod } = req.params;
        const { nombre, autorizador, ministerio } = req.body;
        const updatedCurso = await cursoModel.findOneAndUpdate({ cod }, { cod, nombre, ministerio, autorizador }, { new: true });
        if (updatedCurso) {
            res.status(200).json(updatedCurso);
        } else {
            res.status(404).json({
                message: `El curso con cod: ${cod} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el curso',
            error: `Consulta de error: ${error}`
        });
    }
}


export const postCurso = async (req, res) => {
    try {
        const { cod, nombre, autorizador, ministerio, area } = req.body;
        const newCurso = await cursoModel.create({ cod, nombre, ministerio, autorizador, area })
        if (newCurso) {
            res.status(201).json(newCurso);
        } else {
            res.status(400).json({
                message: `No se pudo crear el curso con los siguientes datos: nombre: ${nombre}, autorizador: ${autorizador}, ministerio: ${ministerio}`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el curso',
            error: `Consulta de error: ${error}`
        });
    }
}

export const deleteCursoByCod = async (req, res) => {
    try {
        const { cod } = req.params;
        const deletedCurso = await cursoModel.findOneAndDelete({ cod });
        if (deletedCurso) {
            res.status(200).json(deletedCurso);
        } else {
            res.status(404).json({
                message: `El curso con el cod: ${cod} no se encontró`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al borrar el curso',
            error: `Consulta de error: ${error}`
        });
    }
}