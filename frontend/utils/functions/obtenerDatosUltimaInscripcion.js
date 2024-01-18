export const obtenerDatosUltimaInscripcion = async (inscripciones) => {

    try {
        let ultimaInscripcion = undefined;

        for (const inscripcion of inscripciones) {

            if (!ultimaInscripcion || inscripcion.fechaInicioCurso > ultimaInscripcion.fechaInicioCurso) {
                ultimaInscripcion = inscripcion;
            }

        }

        return ultimaInscripcion
    } catch (error) {
        throw new Error(error)
    }


}