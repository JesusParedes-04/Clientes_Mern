import users from "../models/user.schema.js";
import generateJWT from "../helpers/jwt.js";
import generarId from "../helpers/tokenId.js";
import { emailRegistro, passwordForget } from "../helpers/emails.js";

export const userRegister = async (req, res) => {

    const { email } = req.body;
    const userExist = await users.findOne({ email })

    if (userExist) {
        const error = new Error("El usuario ya está registrado");
        return res.status(400).json({ msg: error.message })
    }

    try {
        const user = new users(req.body);
        user.token = generarId();
        await user.save()


        //Enviar mail de confirmacion
        emailRegistro({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json({ msg: 'Usuario Creado Correctamente' })

    } catch (error) {
        console.log(error)
    }

};



export const authenticate = async (req, res) => {

    const { email, password } = req.body;

    //Comprobar si el usuario existe

    const user = await users.findOne({ email });
    if (!user) {
        const error = new Error("User doesnt exist!");
        return res.status(404).json({ msg: error.message });
    }
    //Comprobar usuario confirmado

    if (!user.confirm) {
        const error = new Error("Your account doesnt be confirmed!");
        return res.status(404).json({ msg: error.message });
    }

    //Comprobar password

    if (await user.comprobarPassword(password)) {

        res.json({

            _id: user._id,
            nombre: user.name,
            email: user.email,
            token: generateJWT(user._id)

        })

    } else {
        const error = new Error("Password Incorrect!")
        return res.status(403).json({ msg: error.message })
    }
};

export const confirm = async (req, res) => {

    const { token } = req.params
    const userConfirm = await users.findOne({ token })
    if (!userConfirm) {
        const error = new Error("Not Valid Token");
        return res.status(403).json({ msg: error.message })
    } 

    try {
        userConfirm.confirm = true
        userConfirm.token = "";
        await userConfirm.save()
        res.json ({ msg: "User confirmed!" })
    } catch (error) {
        console.log(error)
    }

}

export const recoverPassword = async (req, res) => {
    const { email } = req.body

    const user = await users.findOne({ email });
    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generarId();
        await user.save()

        //enviar email

        passwordForget({

            email: user.email,
            name: user.name,
            token: user.token
        });

        res.json({

            msg: "Hemos enviado un Email con instrucciones"

        })
    } catch (error) {
        console.log(error)
    }

}

export const verifyToken = async (req, res) => {

    const { token } = req.params;
    const validToken = await users.findOne({ token });

    if (validToken) {

    } else {
        res.json({ msg: "Valid Token, User exist!" })
        const error = new Error("Not valid Token")
        return res.status(404).json({ msg: error.message })
    }

}


export const newPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body

    const user = await users.findOne({ token });

    if (user) {
        user.password = password;
        user.token = "";
        try {
            await user.save();
            res.json({ msg: "Password Modified!" });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Not valid Token")
        return res.status(404).json({ msg: error.message })
    }

};


export const profile = async (req, res) => {

    const { users } = req

    res.json(users)

};