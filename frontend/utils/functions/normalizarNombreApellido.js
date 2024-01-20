export const normalizarNombreApellido = (nombre) => {
    //Normalizar nombre significa garantizar la forma correcta en que adminite la bd el  ingreso de estos
    // Para que sean admitidos no debe ser un espacio en blanco el inicio o final de la cadena, 
    // Todo nombre debe comenzar con mayúscula, si el nombre es compuesto "ejemplo: Jorge Luis", este debe tener sólo un espacio entre medio y el siguiente nombre debe tener
    //su primer letra también en mayúscula. Las demas letras deben ser todas minúsculas.

    // Eliminar espacios
    nombre = nombre.trim();

    // Convertir todo a minúscula
    nombre = nombre.toLowerCase();

    console.log("Convertir todo a minúscula:", nombre);

    let resultado = "";

    // Recorrer caracter por caracter un string
    for (let i = 0; i < nombre.length; i++) {
        if (i === 0 || (nombre[i - 1] == " " && nombre[i] != " ")) {
            resultado += nombre[i].toUpperCase();
        } else if (nombre[i - 1] == " " && nombre[i] == " ") {
            // Saltar espacios duplicados
            continue;
        } else {
            resultado += nombre[i];
        }
    }

    console.log("DEF:", resultado);
    return resultado;
}


