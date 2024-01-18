

export const getInscripciones = async () => {
    try {
        
        const response = await fetch('http://localhost:4000/api/inscripciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });

        if(response.status === 200){
            const data = await response.json();
            
            return data;
        }else{
            throw new Error('Error al obtener las inscripciones By Referentes - Not Found');
        }
        
    } catch (error) {
        throw new Error(`Error al obtener las inscripciones By Referentes: ${error}`);
    }





}