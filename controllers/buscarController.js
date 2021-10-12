


const buscar = (req,res) => {

    const { coleccion , termino } = req.params

    res.json(
        {
            msg:'controller - buscar',
            coleccion,
            termino
        }
    )
}


module.exports = { buscar }