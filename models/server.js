const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

const auth = require('../routes/auth')
const users = require('../routes/users')
const categorias = require('../routes/categorias')




class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT

        this.paths = {
            auth : '/api/auth',
            user : '/api/usuarios',
            categorias : '/api/categorias'
        }
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
        
        this.app.use(this.paths.auth, auth)
        this.app.use(this.paths.user, users)
        this.app.use(this.paths.categorias, categorias)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Example app listening on port ${this.port}!`))
    }
}

module.exports = Server