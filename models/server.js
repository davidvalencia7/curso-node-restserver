const express = require('express')
const cors = require('cors')

const users = require('../routes/users')
const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT
        this.usersPath = '/api/usuarios'

        //Conectar a Base de Datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
            //CORS
            this.app.use( cors() )

            // lectura y paeso del body
            this.app.use( express.json() )

            //Directorio Publico
            this.app.use( express.static('public'))
           
    }

    routes() {
        
        this.app.use(this.usersPath, users)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }
}

module.exports = Server