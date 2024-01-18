export const getCodNombresMinisterios = (inscripciones) => {

    let ministerios = [];


    for (const inscripcion of inscripciones) {
        const nuevoMinisterio = [inscripcion.curso.ministerio.cod, inscripcion.curso.ministerio.nombre];

        const yaExiste = ministerios.some(ministerio => ministerio[0] === nuevoMinisterio[0]);

        if (!yaExiste) {
            ministerios.push(nuevoMinisterio);
        }
    }
    
    if (ministerios.length > 0) {
        
        return ministerios;
    } else {
        throw new Error('No se encontraron ministerios');
    }


}

