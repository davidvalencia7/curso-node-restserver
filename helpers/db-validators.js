const Role = require('../models/Role')
const User = require('../models/User')

const existRole = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol)
        throw new Error(`El rol ${ rol} No Existe `)
}

const existEmail = async (correo = '') => {
    // verificar si el correo existe
    const existeEmail = await User.findOne({correo})
    if(existeEmail)
        throw new Error(`El Correo ${ correo } ya Existe`)
}

module.exports = { existRole, existEmail}