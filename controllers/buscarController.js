const { isValidCollection, searchUser } = require("../helpers/busquedas")




const buscar = async (req,res) => {

    const { coleccion , termino } = req.params

    if(!isValidCollection(coleccion) )
        return res.status(400).json({
            msg : `Coleccion no valida ${ coleccion }`
        })

        

    switch(coleccion){
        case 'users':
            const user =  await searchUser(termino, res)
            return res.json({
                results : (user) ? [user] : []
            })
        case 'categorias':

            
        case 'productos':

        
        default : return res.status(500).json({msg : 'Se le olvido hacer esta busqueda'})
    }

    return res.json(
        {
            msg:'controller - buscar',
            coleccion,
            termino
        }
    )
}


module.exports = { buscar }