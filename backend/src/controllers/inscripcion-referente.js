import { inscripcionModel } from "../models/inscripcion.models.js";


export const getInscripcionesByTutor = async (req, res) => {
    try {
        
        

        const query = {}
        query.referente = req.user.user._id

        // Realizar la búsqueda utilizando el objeto de consulta
        const inscripciones = await inscripcionModel.find(query);

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
}