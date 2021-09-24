const { Schema, model } = require('mongoose')

const userSchema = Schema({
    nombre : {
        type : String,
        required : [true, 'El nombre es obligatorio']
    },
    correo : {
        type : String,
        required : [ true , 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type : String,
        required: [true, 'La contraseña es obligatorio']
    },
    img : { type : String },
    rol : {
        type : String,
        required : true,
        default : 'USER_ROLE',
        enum : ['ADMIN_ROLE', 'USER_ROLE']
    },
    estatus : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }
})

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}


module.exports = model('User', userSchema)