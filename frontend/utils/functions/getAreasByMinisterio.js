
export const getAreasByMinisterio = async (idMinisterio) => {
    try {

        console.log("Get Area By idMinisterio: ",idMinisterio)
        const response = await fetch(`http://localhost:4000/api/areas?ministerio=${idMinisterio}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            });

        if (response.status === 200) {
            const data = await response.json();
           
            console.log("GetAreasByMinisterio - data: ", data)
            return data;

        } else {
            throw new Error('Error al obtener las areas By Ministerio - Not Found');
        }

    } catch (error) {
        throw new Error(`Error al obtener las areas By Ministerio: ${error}`);
    }




}





