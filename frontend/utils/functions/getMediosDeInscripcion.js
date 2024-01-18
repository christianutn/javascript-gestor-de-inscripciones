export const getMediosDeInscripcion = async () => {

    try {
        const response = await fetch('http://localhost:4000/api/mediosDeInscripcion', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });



        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener los medios de inscripción - Not Found');
        }
    } catch (error) {
        throw new Error(error);
    }
}