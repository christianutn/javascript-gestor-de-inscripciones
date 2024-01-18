export const obtenerIdAreaByCod = async (codArea) => {

    try {
        const response = await fetch(`http://localhost:4000/api/areas?cod=${codArea}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });
       
        if(response.status === 200){
            const data = await response.json();
            console.log("ObtenerIdAreaByCod - data: ", data[0]._id)
            return data[0]._id;
        } else {
            throw new Error('Error al obtener el id del area - Not Found');
        }
    } catch (error) {
        throw new Error(error);
    }
}