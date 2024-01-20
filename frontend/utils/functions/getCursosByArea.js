import { obtenerIdAreaByCod } from "./obtenerIdAreaByCod.js";

export const getCursosByArea = async (idArea) => {
    try {
            

            const response = await fetch(`http://localhost:4000/api/cursos?area=${idArea}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });
            
            
            if (response.status === 200) {
                const data = await response.json();
                console.log("GetCursosByArea - data: ", data)
                return data
                
            } else {
                throw new Error('Error al obtener los cursos By Area - Not Found');
            }
    } catch (error) {
        throw new Error(error);
    }
}
