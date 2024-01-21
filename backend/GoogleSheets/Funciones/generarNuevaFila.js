import { generarStringTutores } from "./generarStringTutores.js";
import { formatearFecha } from "./formatearFecha.js";

export const generarNuevaFila = (inscripcion) => {
    try {
        const nombreMinisterio = inscripcion.curso.area.ministerio.nombre
        const codCurso = inscripcion.curso.cod;
        const nombreCurso = inscripcion.curso.nombre;
        const fechaInicioCursoForm = formatearFecha(inscripcion.fechaInicioCurso)
        const fechaFinCursoForm = formatearFecha(inscripcion.fechaFinCurso);
        const fechaInicioInscripcionForm = formatearFecha(inscripcion.fechaInicioInscripcion);
        const fechaFinInscripcionForm = formatearFecha(inscripcion.fechaFinCurso)
        const cupo = inscripcion.cupo;
        const cantidadHoras = inscripcion.cantidadHoras;
        const medioDeInscripcion = inscripcion.medioDeInscripcion.nombre;
        const plataformaDeDictado = inscripcion.plataformaDeDictado.nombre;
        const tipoDeCapacitacion = inscripcion.tipoDeCapacitacion.nombre;

        const stringTutores = generarStringTutores(inscripcion.tutores)

        const rowNew = [nombreMinisterio, codCurso, nombreCurso, fechaInicioCursoForm, fechaFinCursoForm, fechaInicioInscripcionForm, fechaFinInscripcionForm, cupo, cantidadHoras, medioDeInscripcion, plataformaDeDictado, tipoDeCapacitacion, stringTutores]
        console.log(rowNew)
        return rowNew
    } catch (error) {
        throw new Error(`Error al generar la nueva fila: ${error}`);
    }
}