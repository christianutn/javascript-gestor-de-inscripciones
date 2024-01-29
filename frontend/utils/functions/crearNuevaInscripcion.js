export const crearNuevaInscripcion = async (inscripcion) => {
    try {



        const response = await fetch('http://localhost:4000/api/inscripciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                curso: inscripcion.curso,
                fechaInicioCurso: inscripcion.fechaInicioCurso,
                fechaFinCurso: inscripcion.fechaFinCurso,
                fechaInicioInscripcion: inscripcion.fechaInicioInscripcion,
                fechaFinInscripcion: inscripcion.fechaFinInscripcion,
                cupo: inscripcion.cupo,
                cantidadHoras: inscripcion.cantidadHoras,
                medioDeInscripcion: inscripcion.medioDeInscripcion,
                plataformaDeDictado: inscripcion.plataformaDeDictado,
                tipoDeCapacitacion: inscripcion.tipoDeCapacitacion,
                tutores: inscripcion.tutores
            })
        });

        const data = await response.json();
        if (response.status === 201) {
            return data;
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        throw new Error(error.message);
    }
}