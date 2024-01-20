export const crearNuevoTutor = async (cuil, nombre, apellido, correo, celular) => {
    try {
        const response = await fetch('http://localhost:4000/api/tutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                cuil: cuil,
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                cel: celular
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