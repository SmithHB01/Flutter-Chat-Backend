const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_Connection );

        console.log('BD Online');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Contacte al Admin');
        
    }
} 

module.exports = {
    dbConnection
}