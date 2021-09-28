

const index = (req, res) => {
    res.json({
        msg : 'Index'
    })
}

const create = (req, res) => {
    res.json({
        msg : 'Create'
    })
}

const show = (req, res) => {
    res.json({
        msg : 'Consultar'
    })
}

const update = (req, res) => {
    res.json({
        msg : 'Update'
    })
}


const destroy = (req, res) => {
    res.json({
        msg : 'Delete'
    })
}

module.exports = { index, create, show, update, destroy }