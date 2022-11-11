import Plato from "../models/Plato.js";
import fs from "fs-extra";
import { 
        uploadImage,
        deleteImage   
 } from '../helper/cloudinary.js';

const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta gestionaremos todas las peticiones correspondiente al modelo de Platos Tipicos"
    })
};

const createPlatos = async (req, res) => {
    try {
        const { nombre, description, precio } = req.body;
        let image;
        
        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            
            // console.log(result);
        }
        // Error en la carga de la imagen
        const Newplato = new Plato({ nombre, description, precio, image });
        //const Newplato = new Plato({ nombre, description, precio});
        await Newplato.save();
        return res.json(Newplato)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
};

const getPlatos = async (req, res) => {
    try {
        const platos = await Plato.find();
        res.send(platos);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updatePlatos = async (req, res) => {

    const { id, nombre, description, precio } = req.body;

    try {
        const updatePlato = await Plato.findById(id);
        // console.log(updatePlato);

        updatePlato.nombre = nombre;
        updatePlato.description = description;
        updatePlato.precio = precio;

        if (req.files.image) {

            await deleteImage(updatePlato.image.public_id);

            const result = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            
            updatePlato.image = {
                url: result.secure_url,
                public_id: result.public_id,
            }; 

            await updatePlato.save();

            return res.status(204).json(updatePlato);
        }
    } catch (error) {
        console.log(error.message);  
    }
};

const deletePlatos = async (req, res) => {
    try {
        const platoRemoved = await Plato.findByIdAndDelete(req.params.id);

        if (!platoRemoved) {
            // const error = new Error("Token no valido");
            return res.sendStatus(404);
        } else {

            if (platoRemoved.image.public_id) {
                await deleteImage(platoRemoved.image.public_id);
            }
            return res.status(204).json({ msg: "Plato Eliminado correctamente" });    
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getPlato = async (req, res) => {
    try {
        const OnePlato = await Plato.findById(req.params.id);

        if (!OnePlato) {
            return res.sendStatus(404);
        } else {
            return res.json(OnePlato);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    prueba,
    createPlatos,
    getPlatos,
    updatePlatos,
    deletePlatos,
    getPlato
};