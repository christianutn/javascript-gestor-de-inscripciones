import { inscripcionModel } from "../models/inscripcion.models.js";



export const getInscripciones = async (req, res) => {
    try {
        
        
        const { idCurso, fechaInicio, idTutor } = req.query;

        // Construir el objeto de consulta basado en los parámetros proporcionados
        const query = {};

        const rol = req.user.user.rol;

        if (rol !== "super" && rol !== "cronograma" && rol !== "administrador"){
            query.referente = req.user.user._id;
        }

        if (idCurso) {
            query.curso = idCurso;
        }

        if (fechaInicio) {
            query.fechaInicioCurso = fechaInicio;
        }

        if (idTutor) {
            // Usar $in para buscar inscripciones con tutores que tengan el idTutor proporcionado
            query.tutores = { $in: [idTutor] };
        }

        // Realizar la búsqueda utilizando el objeto de consulta
        const inscripciones = await inscripcionModel.find(query)

        if (inscripciones && inscripciones.length > 0) {
            res.status(200).json(inscripciones);
        } else {
            res.status(404).json({
                message: 'No se encontraron inscripciones para los parámetros proporcionados.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las inscripciones',
            error: `Consulta de error: ${error}`
        });
    }
};


export const getInscripcionById = async (req, res) => {
    try {
        const inscripciones = await inscripcionModel.findById(req.params.id);
        if (inscripciones) {
            res.status(200).json(inscripciones);
        } else {
            res.status(404).json({
                message: 'No se encontraron inscripciones'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las inscripciones',
            error: `Consulta de error: ${error}`
        })
    }
}

export const postIncripcion = async (req, res) => {
    try {
        const referente = req.user.user._id
        req.body.referente = referente
        const inscripcion = await inscripcionModel.create(req.body);
        if (inscripcion) {
            res.status(201).json(inscripcion);
        } else {
            res.status(400).json({
                message: 'No se pudo crear la inscripción'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Error al crear la inscripción - ${error.message}`,
            error: `Consulta de error: ${error}`
        })
    }
}

export const deleteInscripcionById = async (req, res) => {
    try {
        const inscripciones = await inscripcionModel.findByIdAndDelete(req.params.id);
        if (inscripciones) {
            res.status(200).json(inscripciones);
        } else {
            res.status(404).json({
                message: 'No se encontraron inscripciones'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las inscripciones',
            error: `Consulta de error: ${error}`
        })
    }
}

export const updateInscripcionById = async (req, res) => {
    try {
        const inscripcion = await inscripcionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (inscripcion) {
            res.status(200).json(inscripcion);
        } else {
            res.status(404).json({
                message: 'No se encontraron la inscripción'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la inscripción',
            error: `Consulta de error: ${error}`
        })
    }
}


export const getUltimaInscripcion = async (req, res) => {

    try {


        
        const  inscripciones  = req.body;
        
        console.log("getUltimaInscripcion: ", inscripciones)
        let ultimaInscripcion = undefined;
        
        for ( const inscripcion of inscripciones ) {
            
            if (!ultimaInscripcion || inscripcion.fechaInicioCurso > ultimaInscripcion.fechaInicioCurso) {
                ultimaInscripcion = inscripcion;
            }

        }

        if (ultimaInscripcion) {
            res.status(200).json(ultimaInscripcion);
        } else {
            res.status(404).json({
                message: 'No se encontraron inscripciones'
            })
        }

    } catch (error) {
        throw new Error(`Error al obtener las inscripciones: ${error}`);
    }

}



