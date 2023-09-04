import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    surname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    token: {
        type: String,
    },

    confirm: {
        type: Boolean,
        default: false
    },

},

    {
        timestamps: true,

    }


)
userSchema.pre('save', async function (next) {

    //Si no modifica el password, no haga nada (isModified metodo de mongoose)- Hashea lo hasheado.
    if (!this.isModified("password")) {

        next()  
    }

    //Creando rondas de Hasheos
    const salt = await bcrypt.genSalt(10);
    //Aplicando el salt sobre el password
    this.password = await bcrypt.hash(this.password,salt);

});

userSchema.methods.comprobarPassword = async function 
    (passwordFormulario) {
    //Comparamos un string no hasheado con uno si hasheado y retorna un boolean
    return await bcrypt.compare(passwordFormulario, this.password)
};


const Users = mongoose.model('users', userSchema);

export default Users;