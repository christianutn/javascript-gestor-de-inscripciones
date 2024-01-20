export const getAutorizadorByCurso = async (idCurso) => {
    console.log(`http://localhost:4000/api/cursos/${idCurso}`)
    try {
        const response = await fetch(`http://localhost:4000/api/cursos/${idCurso}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        
        if(response.status === 200) {
            const data = await response.json();
            console.log("getAutorizadorByCurso - data: ", data.autorizador)
            return data.autorizador
        } else {
            throw new Error('Error al obtener el autorizador - Not Found');
        }
    } catch (error) {
        throw new Error(error)
    }

}

