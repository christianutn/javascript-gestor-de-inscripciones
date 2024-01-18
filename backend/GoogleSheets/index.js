import { google } from 'googleapis';
import 'dotenv/config';
import {getDataRange} from './getDataRange.js'
import authorize from './getAuth.js';
import { appendRows } from './appendRows.js';




// La instancia de GoogleAuth que ya has configurado

const auth = authorize

const client = await auth.getClient();

const googleSheets = google.sheets({ version: 'v4', auth: client });


const fileNew = ["C-CSA", "Consumo de alcohol y otras sustancias en adolescentes: Recomendaciones para referentes afectivos", "5/2/2024","12/2/2024","13/2/2024","23/2/2024", "Ministerio de Salud","SECRETARIA DE PREVENCION Y ASISTENCIA DE LAS ADICCIONES", "Curso e-learning", "Portal Campus Córdoba", "500","10","Campus Córdoba", "DARIO GIGENA PARKER SECRETARIO DE ADICCIONES", "educacionsuperiorenadicciones@gmail.com","PAULA TAKAYA"]
console.log(fileNew.length)


const metaData = await appendRows(googleSheets, "General", "A3:P3", fileNew)
console.log(metaData);