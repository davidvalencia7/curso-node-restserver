const Role = require('../models/Role')

const existRole = async (rol) => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol)
        throw new Error(`El rol ${ rol} No Existe `)
}

module.exports = { existRole}