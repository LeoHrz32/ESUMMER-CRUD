// Importar la biblioteca mongoose
const mongoose = require('mongoose');

// Definir una función para establecer la conexión a la base de datos
const connectDB = async () => {
    try {
        // Intentar conectarse a la base de datos utilizando la URL de conexión almacenada en la variable de entorno MONGODB_CNN
        await mongoose.connect(process.env.MONGODB_CNN);
        // Si la conexión es exitosa, imprimir un mensaje de éxito en la consola
        console.log('Conexion exitosa a la base de datos');
    } catch (error) {
        // Si ocurre un error durante la conexión, imprimir el error en la consola y lanzar un nuevo error con un mensaje personalizado
        console.log('Error al conectarse con la base de datos: ', error);
        throw new Error('Error al conectarse con la base de datos');
    }
}

// Exportar la función dbConnection para que pueda ser utilizada por otros módulos
module.exports = {
    connectDB
}