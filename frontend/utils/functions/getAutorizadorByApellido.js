export const getAutorizadorByApellido = async (apellido) => {
    try {
        const response = await fetch(`http://localhost:4000/api/autorizadores?apellido=${apellido}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        });

        const data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
}