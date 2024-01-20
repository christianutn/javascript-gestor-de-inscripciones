export const crearNuevaArea = async (nombreNuevoArea, idMinisterio) =>{

    //Las areas se cream con cod y nombre iguales; luego podrán ser modificadas por usuarios con permisos mas altos

    try {
        const response = await fetch('http://localhost:4000/api/areas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                cod: nombreNuevoArea,
                nombre: nombreNuevoArea,
                ministerio: idMinisterio
            })
        });
        if(response.status === 201){
            const data = await response.json();
            return data;
        }else{
            throw new Error('El nombre de área ya existe');
        }
    } catch (error) {
        throw new Error(error);
    }
}