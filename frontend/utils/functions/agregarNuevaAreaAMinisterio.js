
export const agregarNuevaAreaAMinisterio = async(codMinisterio, codNuevaArea) => {

    try {
        const response = await fetch(`http://localhost:4000/api/areas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                cod: codNuevaArea,
                nombre: codNuevaArea,
                ministerio: codMinisterio
            })
        });
        if(response.status === 201){
            return true;
        }else{
            throw new Error('El area ya existe');
        }
    } catch (error) {
        throw new Error(error);
    }
}