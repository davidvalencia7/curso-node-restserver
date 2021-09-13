const express = require('express')
const cors = require('cors')

const users = require('../routes/users')


class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT
        this.usersPath = '/api/usuarios'
        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
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