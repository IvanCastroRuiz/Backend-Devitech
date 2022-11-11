import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import fileupload from 'express-fileupload';

import conectarDB from './config/db.js';

import platosRoutes from './routes/platosRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

// Se le agrega toda la funcionalidad del servidor de express
const app = express();
app.use(express.json());

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './files'
}));

conectarDB();

// middlewares
// Se utiliza para realizar la comunicacion entre el servidor del frontend y el backend
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del Request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
};
app.use(cors(corsOptions));

// Gestion Usuarios
app.use('/api/platos', platosRoutes);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});