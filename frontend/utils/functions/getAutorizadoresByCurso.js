export const getAutorizadorByCurso = async (codCurs) => {
    console.log(`http://localhost:4000/api/cursos?cod=${codCurs}`)
    try {
        const response = await fetch(`http://localhost:4000/api/cursos?cod=${codCurs}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });
        
        if(response.status === 200) {
            const data = await response.json();
            console.log("getAutorizadorByCurso - data: ", data)
            return data[0].autorizador
        } else {
            throw new Error('Error al obtener el autorizador - Not Found');
        }
    } catch (error) {
        throw new Error(error)
    }

}