import authorize from "../../GoogleSheets/getAuth.js"
import { appendRows } from "../../GoogleSheets/appendRows.js";
import { google } from 'googleapis';
import { generarNuevaFila } from "../../GoogleSheets/Funciones/generarNuevaFila.js";



export const appendRowsNew = async (req, res) => {
    try {
        const inscripcion = req.body
        
        //Genera nueva fila para agreagr a google sheets
        const rowNew = generarNuevaFila(inscripcion)

        
        //Obtiene autorización
        const auth = authorize
        const googleSheets = google.sheets({ version: 'v4', auth });

        const metaData = await appendRows(googleSheets, "Inscripciones", "C", "O", rowNew)
        if (!metaData) {
            throw new Error('Error al insertar la nueva fila: Fila vacía');
        }

        return res.status(200).json(metaData);
        
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las inscripciones',
            error: `Detalle de error: ${error}`
        });
    }
}