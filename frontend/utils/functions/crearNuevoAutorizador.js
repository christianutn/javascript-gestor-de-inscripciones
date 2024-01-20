export const crearNuevoAutorizador = async (nombre, apellido, descripcion) => {

    try {
        const response = await fetch('http://localhost:4000/api/autorizadores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                descripcion: descripcion
            })
        });

        const data = await response.json();
        if (response.status === 201) {
            return data;
        } else {
            
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
}