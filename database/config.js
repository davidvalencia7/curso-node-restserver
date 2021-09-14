const mongoose = require('mongoose')

const dbConnection = async () => {


        await mongoose.connect( process.env.MONGODB_CNN, error => {
            
            if(error){
                console.log(error);
                throw new Error('Error a la hora de iniciar la base de datos')
            }
            
            console.log('Base de Datos is Ready');
        })
        
}




module.exports = { dbConnection }