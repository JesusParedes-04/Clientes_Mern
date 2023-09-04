import mongoose from 'mongoose';

const conectarDB = async () => {
    const connectionString = 'mongodb://127.0.0.1:27017/clientDB'

    try {

        await mongoose.connect(connectionString);
        console.log('conectado a la base de datos MongoDB')
    }
    catch (error) {
        console.log('Error al conectar a la base de datos:', error)
    }
}

export default conectarDB