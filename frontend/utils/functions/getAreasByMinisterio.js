
export const getAreasByMinisterio = async (codMinisterio) => {
    try {

        console.log("GetAreasByMinisterio Cod seleccionado: ",codMinisterio)
        const response = await fetch(`http://localhost:4000/api/ministerios?cod=${codMinisterio}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });

        if (response.status === 200) {
            const data = await response.json();
           
            console.log("GetAreasByMinisterio - data: ", data[0].areas)
            return data[0].areas;

        } else {
            throw new Error('Error al obtener las areas By Ministerio - Not Found');
        }

    } catch (error) {
        throw new Error(`Error al obtener las areas By Ministerio: ${error}`);
    }




}