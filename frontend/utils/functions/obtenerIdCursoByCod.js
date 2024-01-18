export const obtenerIdCursoByCod = async (codCurso) => {

    try {
        console.log("obtenerIdCursoByCod cod del curso: ", codCurso)
        const response = await fetch(`http://localhost:4000/api/cursos?cod=${codCurso}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });

        if(response.status === 200){
            const data = await response.json();
            return data[0]._id;
        } else {
            throw new Error('Error al obtener el id del curso - Not Found');
        }
    } catch (error) {
        throw new Error(error);
    }
}