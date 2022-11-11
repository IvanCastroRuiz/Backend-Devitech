import express from 'express';

import { 
    prueba,
    deletePlatos, 
    getPlatos, 
    getPlato, 
    createPlatos, 
    updatePlatos
} from '../controllers/platoController.js';

const router = express.Router(); 

// Rutas Publicas
router.get('/prueba', prueba);

// Rutas Gestion Producto
router.get('/get', getPlatos);
router.get('/get/:id', getPlato);
router.post('/create', createPlatos);
router.put('/update/:id', updatePlatos);
router.delete('/delete/:id', deletePlatos);


export default router;