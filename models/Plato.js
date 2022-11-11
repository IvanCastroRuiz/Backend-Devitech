import mongoose from 'mongoose';

const platoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        url: String,
        public_id: String,
    }
})

const Plato = mongoose.model('Platos', platoSchema);
export default Plato;