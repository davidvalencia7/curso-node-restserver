const { isValidCollection, searchUser, searchCategorias, searchProducts } = require("../helpers/busquedas")




const buscar = async (req,res) => {

    const { coleccion , termino } = req.params

    if(!isValidCollection(coleccion) )
        return res.status(400).json({
            msg : `Coleccion no valida ${ coleccion }`
        })

        

    switch(coleccion){
        case 'users':
            const user =  await searchUser(termino)
            return res.json({
                results : (user) ? [user] : []
            })
        case 'categorias':
            const categorias =  await searchCategorias(termino)
            return res.json({
                results : (categorias) ? [categorias] : []
            })
            
        case 'productos':
            const productos =  await searchProducts(termino)
            return res.json({
                results : (productos) ? [productos] : []
            })
        
        default : return res.status(500).json({msg : 'Se le olvido hacer esta busqueda'})
    }

}


module.exports = { buscar }