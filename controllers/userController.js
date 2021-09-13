

const index = (req, res) => {
const query = req.query

    res.json(
        {msg : 'get API  | Controlador',
        query
    })
}

const create =  (req, res) => {
    const body = req.body

    res.json({
        msg : 'Post API',
        body
    })
}

const update = (req, res) => {
    const id = req.params.id
    res.json({
        msg : 'Update API | Controller',
        id
    })
}

const patch = (req, res) => {
    res.json({msg : 'Patch API | Controller'})
}

const destroy = (req, res) => {
    res.json({msg : 'Delete API | Controller'})
   }



module.exports = { index, create, update, patch, destroy }