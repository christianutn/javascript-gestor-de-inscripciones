import express from 'express';
import { mongoose } from 'mongoose';
import "dotenv/config";
import cookieParser from 'cookie-parser'
import router from './routes/index.routes.js';
import initializePassport from '../config/passport.js';
import cors from 'cors'

import { ministerioModel } from './models/ministerio.models.js';





const app = express();

const PORT = 4000;

//Configuración cors
const whiteList = ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4000']

// const corsOptions = {
//     origin: function (origin, callback) {
//         // Permitir cualquier origen
//         callback(null, true);
//     }
// };

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteList.includes(origin)) {
            // Permitir el origen si es parte de la whiteList o si no se proporciona un origen (puede ser una solicitud no CORS)
            callback(null, true);
        } else {
            // No permitir el origen si no está en la whiteList
            callback(new Error('Not allowed by CORS'));
        }
    }
};


//Middlaware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); //Importante: debe estar antes del middlaware de rutas app.use('/', router);
app.use('/', router);


initializePassport();




//Conexión a MongoDB
mongoose
    .connect(process.env.URL_CONNECTION_MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));



app.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);

});

app.get('/', (req, res) => {
    res.send('Hola mundo');
});






